import mySql from 'mysql2/promise';

const conexion = mySql.createPool({
    host: 'localhost',
    user: 'admin',
    password: 'admin1234',
    database: 'PW2024',
    port: 3306,
});

// Reporte 1: Lista completa de clientes
export const reporteClientes = async () => {
    const [rows] = await conexion.query('SELECT * FROM clientes');
    return rows;
};

// Reporte 2: Lista de personal con estatus
export const reportePersonal = async () => {
    const [rows] = await conexion.query('SELECT * FROM personal');
    return rows;
};

// Reporte 3: Pedidos por rango de fechas
export const pedidosPorFechas = async (inicio: string, fin: string) => {
    const [rows] = await conexion.query('SELECT * FROM pedidos WHERE fecha_hora_pedido BETWEEN ? AND ?', [inicio, fin]);
    return rows;
};

// Reporte 4: Pedidos entregados o no entregados
export const pedidosEntregados = async (entregado: number) => {
    const [rows] = await conexion.query('SELECT * FROM pedidos WHERE entregado = ?', [entregado]);
    return rows;
};

// Reporte 5: Pedidos pagados o no pagados (con total si son pagados)
export const pedidosPagados = async (pagado: number) => {
    const [rows] = await conexion.query('SELECT * FROM pedidos WHERE pagado = ?', [pagado]);
    if (pagado === 1) {
        const [[total]] = await conexion.query('SELECT SUM(precio_sugerido) as total_pagado FROM pedidos WHERE pagado = 1');
        return { pedidos: rows, total_pagado: total.total_pagado };
    }
    return rows;
};

// Reporte 6: Pedidos por persona (ID del personal)
export const pedidosPorPersonal = async (id: number) => {
    const [rows] = await conexion.query('SELECT * FROM pedidos WHERE ID_personal = ?', [id]);
    return rows;
};

// Reporte 7: Lista de arreglos florales (todos o por tipo)
export const arreglosPorTipo = async (tipo?: number) => {
    if (tipo) {
        const [rows] = await conexion.query('SELECT * FROM arreglos WHERE tipo = ?', [tipo]);
        return rows;
    }
    const [rows] = await conexion.query('SELECT * FROM arreglos');
    return rows;
};
