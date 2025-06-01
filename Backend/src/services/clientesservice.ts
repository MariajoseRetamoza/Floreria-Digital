import { db } from '../config/db';
import { Cliente } from '../models/cliente.model';

export const clientesService = {
  getAll: async (): Promise<Cliente[]> => {
    const [rows] = await db.query('SELECT * FROM clientes');
    return rows as Cliente[];
  },

  getById: async (id: number): Promise<Cliente | null> => {
    const [rows] = await db.query('SELECT * FROM clientes WHERE ID_cliente = ?', [id]);
    const result = rows as Cliente[];
    return result.length > 0 ? result[0] : null;
  },

  create: async (data: Omit<Cliente, 'ID_cliente'>): Promise<Cliente> => {
    const { nombre_completo, direccion, telefono } = data;
    const [result]: any = await db.query(
      'INSERT INTO clientes (nombre_completo, direccion, telefono) VALUES (?, ?, ?)',
      [nombre_completo, direccion, telefono]
    );
    return { ID_cliente: result.insertId, ...data };
  },

  update: async (id: number, data: Partial<Omit<Cliente, 'ID_cliente'>>): Promise<Cliente | null> => {
    const fields = Object.keys(data).map(field => `${field} = ?`).join(', ');
    const values = Object.values(data);
    await db.query(`UPDATE clientes SET ${fields} WHERE ID_cliente = ?`, [...values, id]);
    return clientesService.getById(id);
  },

  delete: async (id: number): Promise<boolean> => {
    await db.query('DELETE FROM clientes WHERE ID_cliente = ?', [id]);
    return true;
  }
};
