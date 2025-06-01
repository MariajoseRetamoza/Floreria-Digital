import { db } from '../config/db';

export const reportesService = {
  // Reporte 1: Lista de clientes
  getReporteClientes: async () => {
    const [rows] = await db.query('SELECT * FROM clientes');
    return rows;
  },

  // Reporte 2: Lista de personal
  getReportePersonal: async () => {
    const [rows] = await db.query('SELECT * FROM personal');
    return rows;
  },

  // Reporte 3: Pedidos entre fechas
  getReportePedidosPorFechas: async (desde: string, hasta: string) => {
    const [rows] = await db.query(
      'SELECT * FROM pedidos WHERE fecha_hora_pedido BETWEEN ? AND ?',
      [desde, hasta]
    );
    return rows;
  },

  // Reporte 4: Pedidos entregados/no entregados
  getReportePedidosEntregados: async (estado: string) => {
    const [rows] = await db.query(
      'SELECT * FROM pedidos WHERE entregado = ?',
      [estado]
    );
    return rows;
  },

  // Reporte 5: Pedidos pagados/no pagados con suma total
  getReportePedidosPagados: async (estado: string) => {
    const [rows]: any = await db.query(
      'SELECT * FROM pedidos WHERE pagado = ?',
      [estado]
    );
    const [suma]: any = await db.query(
      'SELECT SUM(precio_sugerido) as total FROM pedidos WHERE pagado = ?',
      [estado]
    );
    return { pedidos: rows, total: suma[0].total };
  },

  // Reporte 6: Pedidos por persona
  getReportePedidosPorPersonal: async (idPersonal: number) => {
    const [rows] = await db.query(
      'SELECT * FROM pedidos WHERE ID_personal = ?',
      [idPersonal]
    );
    return rows;
  },

  // Reporte 7: Arreglos florales
  getReporteArreglos: async (tipo: string) => {
    if (tipo) {
      const [rows] = await db.query(
        'SELECT * FROM Arreglos_Florales WHERE tipo_arreglo = ?',
        [tipo]
      );
      return rows;
    } else {
      const [rows] = await db.query('SELECT * FROM Arreglos_Florales');
      return rows;
    }
  }
};
