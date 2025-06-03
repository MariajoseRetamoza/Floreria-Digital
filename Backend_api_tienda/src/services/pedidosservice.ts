import { db } from '../config/db';
import { Pedido } from '../models/pedido.model';

export const pedidosService = {
  getAll: async (): Promise<Pedido[]> => {
    const [rows] = await db.query('SELECT * FROM pedidos');
    return rows as Pedido[];
  },

  getByFolio: async (folio: number): Promise<Pedido | null> => {
    const [rows] = await db.query('SELECT * FROM pedidos WHERE folio = ?', [folio]);
    const result = rows as Pedido[];
    return result.length > 0 ? result[0] : null;
  },

  create: async (data: Omit<Pedido, 'folio'>): Promise<Pedido> => {
    // Validar existencia de relaciones
    const [[cliente]] = await db.query('SELECT ID_cliente FROM clientes WHERE ID_cliente = ?', [data.ID_Cliente]);
    if (!cliente) throw { status: 400, message: 'Cliente no existe' };

    const [[arreglo]] = await db.query('SELECT ID_arreglo FROM Arreglos_Florales WHERE ID_arreglo = ?', [data.ID_Arreglo]);
    if (!arreglo) throw { status: 400, message: 'Arreglo no existe' };

    const [[personal]] = await db.query('SELECT id FROM personal WHERE id = ?', [data.ID_personal]);
    if (!personal) throw { status: 400, message: 'Personal no existe' };

    const [result]: any = await db.query(
      'INSERT INTO pedidos (ID_Cliente, ID_Arreglo, descripcion, fecha_hora_pedido, fecha_hora_entrega, precio_sugerido, ID_personal, entregado, pagado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [data.ID_Cliente, data.ID_Arreglo, data.descripcion, data.fecha_hora_pedido, data.fecha_hora_entrega, data.precio_sugerido, data.ID_personal, data.entregado, data.pagado]
    );
    return { folio: result.insertId, ...data };
  },

  update: async (folio: number, data: Partial<Omit<Pedido, 'folio'>>): Promise<Pedido | null> => {
    // Validar existencia de relaciones si están en los datos
    if (data.ID_Cliente) {
      const [[cliente]] = await db.query('SELECT ID_cliente FROM clientes WHERE ID_cliente = ?', [data.ID_Cliente]);
      if (!cliente) throw { status: 400, message: 'Cliente no existe' };
    }
    if (data.ID_Arreglo) {
      const [[arreglo]] = await db.query('SELECT ID_arreglo FROM Arreglos_Florales WHERE ID_arreglo = ?', [data.ID_Arreglo]);
      if (!arreglo) throw { status: 400, message: 'Arreglo no existe' };
    }
    if (data.ID_personal) {
      const [[personal]] = await db.query('SELECT id FROM personal WHERE id = ?', [data.ID_personal]);
      if (!personal) throw { status: 400, message: 'Personal no existe' };
    }

    const fields = Object.keys(data).map(field => `${field} = ?`).join(', ');
    const values = Object.values(data);
    await db.query(`UPDATE pedidos SET ${fields} WHERE folio = ?`, [...values, folio]);
    return pedidosService.getByFolio(folio);
  },

  delete: async (folio: number): Promise<boolean> => {
    await db.query('DELETE FROM pedidos WHERE folio = ?', [folio]);
    return true;
  }
};
