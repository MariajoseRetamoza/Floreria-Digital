import pool from '../database';
import { ResultSetHeader } from 'mysql2';

export const obtieneArreglos = async () => {
  const [rows] = await pool.query('SELECT * FROM Arreglos_Florales');
  return rows;
};

export const encuentraArreglo = async (id: number) => {
  const [rows] = await pool.query('SELECT * FROM Arreglos_Florales WHERE ID_arreglo = ?', [id]);
  return rows[0];
};

export const agregaArreglo = async (arreglo: any) => {
  const [result] = await pool.query<ResultSetHeader>(
    'INSERT INTO Arreglos_Florales (descripcion, tipo_arreglo, estatus) VALUES (?, ?, ?)',
    [arreglo.descripcion, arreglo.tipo_arreglo, arreglo.estatus]
  );
  return { id: result.insertId, ...arreglo };
};

export const modificarArreglo = async (arreglo: any) => {
  const [result] = await pool.query(
    'UPDATE Arreglos_Florales SET descripcion = ?, tipo_arreglo = ?, estatus = ? WHERE ID_arreglo = ?',
    [arreglo.descripcion, arreglo.tipo_arreglo, arreglo.estatus, arreglo.ID_arreglo]
  );
  return { id: arreglo.ID_arreglo, ...arreglo };
};

export const eliminaArreglo = async (id: number) => {
  await pool.query('DELETE FROM Arreglos_Florales WHERE ID_arreglo = ?', [id]);
  return { id };
};
