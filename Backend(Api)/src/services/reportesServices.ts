import mySql from 'mysql2/promise';

const conexion = mySql.createPool({
    host: 'localhost',
    user: 'admin',
    password: 'admin1234',
    database: 'PW2024',
    port: 3306,
});

export const reporteClientes = async () => {
    const [rows] = await conexion.query('SELECT * FROM clientes');
    return rows;
};

export const reportePersonal = async () => {
    const [rows] = await conexion.query('SELECT * FROM personal');
    return rows;
};

export const pedidosPorFechas = async (inicio: string, fin: string) => {
    const [rows] = await conexion.query('SELECT * FROM pedidos WHERE fecha_hora_pedido BETWEEN ? AND ?', [inicio, fin]);
    return rows;
};

export const pedidosEntregados = async (entregado: number) => {
    const [rows] = await conexion.query('SELECT * FROM pedidos WHERE entregado = ?', [entregado]);
    return rows;
};

export const pedidosPagados = async (pagado: number) => {
    const [rows] = await conexion.query('SELECT * FROM pedidos WHERE pagado = ?', [pagado]);
    if (pagado === 1) {
        const [[total]] = await conexion.query('SELECT SUM(precio_sugerido) as total_pagado FROM pedidos WHERE pagado = 1');
        return { pedidos: rows, total_pagado: total.total_pagado };
    }
    return rows;
};

export const pedidosPorPersonal = async (id: number) => {
    const [rows] = await conexion.query('SELECT * FROM pedidos WHERE ID_personal = ?', [id]);
    return rows;
};

export const arreglosPorTipo = async (tipo?: number) => {
    if (tipo) {
        const [rows] = await conexion.query('SELECT * FROM arreglos WHERE tipo = ?', [tipo]);
        return rows;
    }
    const [rows] = await conexion.query('SELECT * FROM arreglos');
    return rows;
};
