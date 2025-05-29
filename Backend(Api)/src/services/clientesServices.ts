import mySql from "mysql2/promise";
import { clientesSchema } from "../schema/clientesSchema";
import { Cliente, ClienteNuevo } from "../typesClientes";

// Creamos el pool de conexiones
const conexion = mySql.createPool({
  host: "localhost",
  user: "admin",
  password: "admin1234",
  database: "PW2024",
  port: 3306,
  multipleStatements: false,
});

// Obtener todos los clientes
export const obtieneClientes = async () => {
  try {
    const [results] = await conexion.query("SELECT * FROM clientes");
    return results;
  } catch (err) {
    return { error: "No se pueden obtener los clientes" };
  }
};

// Obtener todos los clientes por id
export const obtieneClientePorId = async (ID_cliente: number) => {
  try {
    const [rows] = await conexion.query(
      "SELECT * FROM clientes WHERE id_cliente = ? LIMIT 1",
      [ID_cliente]
    );
    return (rows as any[])[0] || null;
  } catch (error) {
    console.error("Error en obtieneClientePorId:", error);
    throw error;
  }
};

// Alta de un nuevo cliente
export const agregaCliente = async (nuevo: ClienteNuevo) => {
  try {
    const validacion = clientesSchema.safeParse(nuevo);
    if (!validacion.success) {
      return { error: validacion.error };
    }

    const [results] = await conexion.query(
      `INSERT INTO clientes(
        Nombre_completo,
        Dirección,
        Telefono) 
        VALUES (?, ?, ?)`,
      [nuevo.Nombre_completo, nuevo.Direccion, nuevo.Telefono]
    );

    return results;
  } catch (err) {
    return { error: "No se puede dar de alta a el cliente" };
  }
};

// Modificar cliente existente
export const modificarCliente = async (modificado: Cliente) => {
  try {
    const [results] = await conexion.query(
      `UPDATE cliente SET
       Nombre_completo = ?, Direccion = ?, telefono = ?
       WHERE ID_Cliente = ?`,
      [
        modificado.Nombre_completo,
        modificado.Direccion,
        modificado.Telefono,
        modificado.ID_Cliente,
      ]
    );

    return results;
  } catch (err) {
    return { error: "No se puede modificar el cliente" };
  }
};

// Eliminar cliente por id
export const eliminaCliente = async (ID_Cliente: number) => {
  try {
    const [results] = await conexion.query(
      "DELETE FROM clientes WHERE folio = ?",
      [ID_Cliente]
    );
    return results;
  } catch (err) {
    return { error: "No se puede eliminar el cliente" };
  }
};
