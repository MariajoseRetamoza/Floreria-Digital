import { Request, Response } from 'express';
import { reportesService } from '../services/reportes.service';
import { exportToExcel } from '../utils/excelExporter';

// Reporte 1: Clientes
export const reporteClientes = async (req: Request, res: Response) => {
  try {
    const clientes = await reportesService.getReporteClientes();
    if (req.query.export === 'excel') {
      const columns = [
        { header: 'ID Cliente', key: 'ID_cliente' },
        { header: 'Nombre Completo', key: 'nombre_completo' },
        { header: 'Dirección', key: 'direccion' },
        { header: 'Teléfono', key: 'telefono' }
      ];
      return await exportToExcel(res, clientes, columns, 'Reporte_Clientes.xlsx');
    }
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener reporte de clientes' });
  }
};

// Reporte 2: Personal
export const reportePersonal = async (req: Request, res: Response) => {
  try {
    const personal = await reportesService.getReportePersonal();
    if (req.query.export === 'excel') {
      const columns = [
        { header: 'ID', key: 'id' },
        { header: 'Nombre', key: 'nombre' },
        { header: 'Dirección', key: 'direccion' },
        { header: 'Teléfono', key: 'telefono' },
        { header: 'Estatus', key: 'estatus' }
      ];
      return await exportToExcel(res, personal, columns, 'Reporte_Personal.xlsx');
    }
    res.json(personal);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener reporte de personal' });
  }
};

// Reporte 3: Pedidos por fechas
export const reportePedidosPorFechas = async (req: Request, res: Response) => {
  try {
    const { desde, hasta } = req.query;
    const pedidos = await reportesService.getReportePedidosPorFechas(desde as string, hasta as string);
    if (req.query.export === 'excel') {
      const columns = [
        { header: 'Folio', key: 'folio' },
        { header: 'ID Cliente', key: 'ID_Cliente' },
        { header: 'ID Arreglo', key: 'ID_Arreglo' },
        { header: 'Descripción', key: 'descripcion' },
        { header: 'Fecha Pedido', key: 'fecha_hora_pedido' },
        { header: 'Fecha Entrega', key: 'fecha_hora_entrega' },
        { header: 'Precio Sugerido', key: 'precio_sugerido' },
        { header: 'ID Personal', key: 'ID_personal' },
        { header: 'Entregado', key: 'entregado' },
        { header: 'Pagado', key: 'pagado' }
      ];
      return await exportToExcel(res, pedidos, columns, 'Reporte_Pedidos_Fechas.xlsx');
    }
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener reporte de pedidos por fechas' });
  }
};

// Reporte 4: Pedidos entregados
export const reportePedidosEntregados = async (req: Request, res: Response) => {
  try {
    const { estado } = req.query;
    const pedidos = await reportesService.getReportePedidosEntregados(estado as string);
    if (req.query.export === 'excel') {
      const columns = [
        { header: 'Folio', key: 'folio' },
        { header: 'ID Cliente', key: 'ID_Cliente' },
        { header: 'ID Arreglo', key: 'ID_Arreglo' },
        { header: 'Descripción', key: 'descripcion' },
        { header: 'Fecha Pedido', key: 'fecha_hora_pedido' },
        { header: 'Fecha Entrega', key: 'fecha_hora_entrega' },
        { header: 'Precio Sugerido', key: 'precio_sugerido' },
        { header: 'ID Personal', key: 'ID_personal' },
        { header: 'Entregado', key: 'entregado' },
        { header: 'Pagado', key: 'pagado' }
      ];
      return await exportToExcel(res, pedidos, columns, 'Reporte_Pedidos_Entregados.xlsx');
    }
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener reporte de pedidos entregados' });
  }
};

// Reporte 5: Pedidos pagados
export const reportePedidosPagados = async (req: Request, res: Response) => {
  try {
    const { estado } = req.query;
    const { pedidos, total } = await reportesService.getReportePedidosPagados(estado as string);
    if (req.query.export === 'excel') {
      const columns = [
        { header: 'Folio', key: 'folio' },
        { header: 'ID Cliente', key: 'ID_Cliente' },
        { header: 'ID Arreglo', key: 'ID_Arreglo' },
        { header: 'Descripción', key: 'descripcion' },
        { header: 'Fecha Pedido', key: 'fecha_hora_pedido' },
        { header: 'Fecha Entrega', key: 'fecha_hora_entrega' },
        { header: 'Precio Sugerido', key: 'precio_sugerido' },
        { header: 'ID Personal', key: 'ID_personal' },
        { header: 'Entregado', key: 'entregado' },
        { header: 'Pagado', key: 'pagado' }
      ];
      return await exportToExcel(res, pedidos, columns, 'Reporte_Pedidos_Pagados.xlsx');
    }
    res.json({ pedidos, total });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener reporte de pedidos pagados' });
  }
};

// Reporte 6: Pedidos por persona
export const reportePedidosPorPersonal = async (req: Request, res: Response) => {
  try {
    const { idPersonal } = req.params;
    const pedidos = await reportesService.getReportePedidosPorPersonal(parseInt(idPersonal));
    if (req.query.export === 'excel') {
      const columns = [
        { header: 'Folio', key: 'folio' },
        { header: 'ID Cliente', key: 'ID_Cliente' },
        { header: 'ID Arreglo', key: 'ID_Arreglo' },
        { header: 'Descripción', key: 'descripcion' },
        { header: 'Fecha Pedido', key: 'fecha_hora_pedido' },
        { header: 'Fecha Entrega', key: 'fecha_hora_entrega' },
        { header: 'Precio Sugerido', key: 'precio_sugerido' },
        { header: 'Entregado', key: 'entregado' },
        { header: 'Pagado', key: 'pagado' }
      ];
      return await exportToExcel(res, pedidos, columns, `Reporte_Pedidos_Personal_${idPersonal}.xlsx`);
    }
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener reporte de pedidos por persona' });
  }
};

// Reporte 7: Arreglos florales
export const reporteArreglos = async (req: Request, res: Response) => {
  try {
    const { tipo } = req.query;
    const arreglos = await reportesService.getReporteArreglos(tipo as string);
    if (req.query.export === 'excel') {
      const columns = [
        { header: 'ID Arreglo', key: 'ID_arreglo' },
        { header: 'Descripción', key: 'descripcion' },
        { header: 'Tipo', key: 'tipo_arreglo' },
        { header: 'Estatus', key: 'estatus' }
      ];
      return await exportToExcel(res, arreglos, columns, 'Reporte_Arreglos.xlsx');
    }
    res.json(arreglos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener reporte de arreglos' });
  }
};
