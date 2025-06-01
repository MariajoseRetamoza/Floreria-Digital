import { Request, Response } from 'express';
import { reportesService } from '../services/reportes.service';
import { exportToExcel } from '../utils/excelExporter';

// Reporte 1: Clientes
export const reporteClientes = async (req: Request, res: Response) => {
  try {
    const clientes = await reportesService.getReporteClientes();

    // Si ?export=excel, exportar a Excel
    if (req.query.export === 'excel') {
      const columns = [
        { header: 'ID Cliente', key: 'ID_cliente' },
        { header: 'Nombre Completo', key: 'nombre_completo' },
        { header: 'Dirección', key: 'direccion' },
        { header: 'Teléfono', key: 'telefono' }
      ];
      return await exportToExcel(res, clientes, columns, 'Reporte_Clientes.xlsx');
    }

    // Si no, devolver JSON
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener reporte de clientes' });
  }
};

// Reporte 2: Personal
export const reportePersonal = async (_req: Request, res: Response) => {
  try {
    const personal = await reportesService.getReportePersonal();
    res.json(personal);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener reporte de personal' });
  }
};

// Reporte 3: Pedidos por rango de fechas
export const reportePedidosPorFechas = async (req: Request, res: Response) => {
  try {
    const { desde, hasta } = req.query;
    const pedidos = await reportesService.getReportePedidosPorFechas(desde as string, hasta as string);
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener reporte de pedidos por fechas' });
  }
};

// Reporte 4: Pedidos entregados/no entregados
export const reportePedidosEntregados = async (req: Request, res: Response) => {
  try {
    const { estado } = req.query; // 1=Sí, 2=No
    const pedidos = await reportesService.getReportePedidosEntregados(estado as string);
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener reporte de pedidos entregados' });
  }
};

// Reporte 5: Pedidos pagados/no pagados con suma
export const reportePedidosPagados = async (req: Request, res: Response) => {
  try {
    const { estado } = req.query; // 1=Sí, 2=No
    const { pedidos, total } = await reportesService.getReportePedidosPagados(estado as string);
    res.json({ pedidos, total });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener reporte de pedidos pagados' });
  }
};

// Reporte 6: Pedidos por personal
export const reportePedidosPorPersonal = async (req: Request, res: Response) => {
  try {
    const { idPersonal } = req.params;
    const pedidos = await reportesService.getReportePedidosPorPersonal(parseInt(idPersonal));
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener reporte de pedidos por persona' });
  }
};

// Reporte 7: Arreglos florales
export const reporteArreglos = async (req: Request, res: Response) => {
  try {
    const { tipo } = req.query; // Si se pasa ?tipo=1 devuelve solo esos
    const arreglos = await reportesService.getReporteArreglos(tipo as string);
    res.json(arreglos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener reporte de arreglos' });
  }
};
