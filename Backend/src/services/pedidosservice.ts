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
    const {
      ID_Cliente,
      ID_Arreglo,
      descripcion,
      fecha_hora_pedido,
      fecha_hora_entrega,
      precio_sugerido,
      ID_personal,
      entregado,
      pagado
    } = data;

    const [result]: any = await db.query(
      'INSERT INTO pedidos (ID_Cliente, ID_Arreglo, descripcion, fecha_hora_pedido, fecha_hora_entrega, precio_sugerido, ID_personal, entregado, pagado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [ID_Cliente, ID_Arreglo, descripcion, fecha_hora_pedido, fecha_hora_entrega, precio_sugerido, ID_personal, entregado, pagado]
    );
    return { folio: result.insertId, ...data };
  },

  update: async (folio: number, data: Partial<Omit<Pedido, 'folio'>>): Promise<Pedido | null> => {
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
