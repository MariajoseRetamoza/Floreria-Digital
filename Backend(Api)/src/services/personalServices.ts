import mySql from "mysql2/promise";
import { personalSchema } from "../schema/personal.schema";
import { Personal, PersonalNuevo } from "../typesPersonal";

// Creamos el pool de conexiones
const conexion = mySql.createPool({
  host: "localhost",
  user: "admin", //
  password: "admin1234",
  database: "PW2024",
  port: 3306,
  multipleStatements: false,
});

// Función que se usa en las rutas
export const obtienePersonal = async () => {
  try {
    const [results] = await conexion.query("SELECT * FROM personal");
    return results;
  } catch (err) {
    return { error: "no se puede obtener el personal" };
  }
};

//encuentra personal

export const encuentraPersonal = async (id: number) => {
  try {
    const identificador = { id: id };
    const validacion = personalSchema.safeParse(identificador);
    if (!validacion.success) {
      return { error: validacion.error };
    }
    const [results] = await conexion.query(
      "SELECT * FROM personal WHERE id = ?",
      id
    );
    return results;
  } catch (err) {
    return { error: "no se puede encontrar el personal" };
  }
};

export const encuentraPersonalTelefono = async (telefono: string) => {
  try {
    const tel = { telefono: telefono };
    const validacion = personalSchema.safeParse(tel);
    if (!validacion.success) {
      return { error: validacion.error };
    }
    const [results] = await conexion.query(
      "SELECT * FROM personal WHERE telefono = ? AND id = ?",
      telefono
    );
    return results;
  } catch (err) {
    return { error: "no se puede encontrar el personal" };
  }
};

export const agregaPersonal = async (nuevo: PersonalNuevo) => {
  try {
    const validacion = personalSchema.safeParse(nuevo);
    if (!validacion.success) {
      return { error: validacion.error };
    }
    const [results] = await conexion.query(
      "INSERT INTO personal (nombre, direccion, telefono, estatus) VALUES (?, ?, ?, ?)",
      [nuevo.nombre, nuevo.direccion, nuevo.telefono, nuevo.estatus]
    );
    return results;
  } catch (err) {
    return { error: "no se puede agregar el personal" };
  }
};

export const modificarPersonal = async (modificado: Personal) => {
  try {
    // const validacion = personalSchema.safeParse(modificado);
    // if (!validacion.success) {
    //   return { error: validacion.error };
    // }
    const [results] = await conexion.query(
      "UPDATE personal Set nombre = ?, direccion = ?, telefono = ?, estatus = ? WHERE id = ?",
      [
        modificado.nombre,
        modificado.direccion,
        modificado.telefono,
        modificado.estatus,
        modificado.id,
      ]
    );
    return results;
  } catch (err) {
    return { error: "no se puede modificar el personal" };
  }
};

export const eliminaPersonal = async (id: number) => {
  try {
    const [results] = await conexion.query(
      "DELETE FROM personal WHERE id = ?",
      [id]
    );
    return results;
  } catch (err) {
    return { error: "no se puede eliminar el personal" };
  }
};

/////////////////////////////////////////
// PRUEBA TEMPORAL DE CONEXIÓN (puedes borrar luego)
const probarConexion = async () => {
  try {
    const [rows] = await conexion.query("SELECT NOW() AS hora_actual");
    console.log("Conexión exitosa. Hora desde MySQL:", rows);
  } catch (error) {
    console.error(" Falló la conexión a MySQL:", error);
  }
};

probarConexion(); // Ejecuta la prueba
///////////////////////////////////////////
