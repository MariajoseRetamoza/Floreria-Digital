// pedidosServices.ts

import mySql from "mysql2/promise";
import { pedidosSchema } from "../schema/pedidos.schema";
import { Pedido, PedidoNuevo } from "../typesPedidos";

// Creamos el pool de conexiones
const conexion = mySql.createPool({
  host: "localhost",
  user: "admin",
  password: "admin1234",
  database: "PW2024",
  port: 3306,
  multipleStatements: false,
});

// Obtener todos los pedidos
export const obtienePedidos = async () => {
  try {
    const [results] = await conexion.query("SELECT * FROM pedidos");
    return results;
  } catch (err) {
    return { error: "No se pueden obtener los pedidos" };
  }
};

// Buscar pedido por folio
export const encuentraPedido = async (folio: number) => {
  try {
    const validacion = pedidosSchema.safeParse({ folio });
    if (!validacion.success) {
      return { error: validacion.error };
    }
    const [results] = await conexion.query(
      "SELECT * FROM pedidos WHERE folio = ?",
      [folio]
    );
    return results;
  } catch (err) {
    return { error: "No se puede encontrar el pedido" };
  }
};

// Agregar un nuevo pedido
export const agregaPedido = async (nuevo: PedidoNuevo) => {
  try {
    const validacion = pedidosSchema.safeParse(nuevo);
    if (!validacion.success) {
      return { error: validacion.error };
    }

    const [results] = await conexion.query(
      `INSERT INTO pedidos 
      (ID_Cliente, ID_Arreglo, descripcion, fecha_hora_pedido, fecha_hora_entrega, precio_sugerido, ID_personal, entregado, pagado) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        nuevo.ID_Cliente,
        nuevo.ID_Arreglo,
        nuevo.descripcion || null,
        nuevo.fecha_hora_pedido || null,
        nuevo.fecha_hora_entrega || null,
        nuevo.precio_sugerido || null,
        nuevo.ID_personal,
        nuevo.entregado || 0,
        nuevo.pagado || 0,
      ]
    );

    return results;
  } catch (err) {
    return { error: "No se puede agregar el pedido" };
  }
};

// Modificar pedido existente
export const modificarPedido = async (modificado: Pedido) => {
  try {
    // Validación opcional
    // const validacion = pedidosSchema.safeParse(modificado);
    // if (!validacion.success) {
    //   return { error: validacion.error };
    // }

    const [results] = await conexion.query(
      `UPDATE pedidos 
       SET ID_Cliente = ?, ID_Arreglo = ?, descripcion = ?, fecha_hora_pedido = ?, fecha_hora_entrega = ?, precio_sugerido = ?, ID_personal = ?, entregado = ?, pagado = ?
       WHERE folio = ?`,
      [
        modificado.ID_Cliente,
        modificado.ID_Arreglo,
        modificado.descripcion || null,
        modificado.fecha_hora_pedido || null,
        modificado.fecha_hora_entrega || null,
        modificado.precio_sugerido || null,
        modificado.ID_personal,
        modificado.entregado || 0,
        modificado.pagado || 0,
        modificado.folio,
      ]
    );

    return results;
  } catch (err) {
    return { error: "No se puede modificar el pedido" };
  }
};

// Eliminar pedido por folio
export const eliminaPedido = async (folio: number) => {
  try {
    const [results] = await conexion.query(
      "DELETE FROM pedidos WHERE folio = ?",
      [folio]
    );
    return results;
  } catch (err) {
    return { error: "No se puede eliminar el pedido" };
  }
};

// Prueba de conexión
const probarConexion = async () => {
  try {
    const [rows] = await conexion.query("SELECT NOW() AS hora_actual");
    console.log("Conexión exitosa. Hora desde MySQL:", rows);
  } catch (error) {
    console.error("Falló la conexión a MySQL:", error);
  }
};

probarConexion();
