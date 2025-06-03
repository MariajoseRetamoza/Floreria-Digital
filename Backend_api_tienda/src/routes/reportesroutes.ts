import { Router } from 'express';
import {
  reporteClientes,
  reportePersonal,
  reportePedidosPorFechas,
  reportePedidosEntregados,
  reportePedidosPagados,
  reportePedidosPorPersonal,
  reporteArreglos
} from '../controllers/reportes.controller';

const router = Router();

// Reporte 1: Lista completa de clientes
router.get('/clientes', reporteClientes);

// Reporte 2: Lista de personal con estatus
router.get('/personal', reportePersonal);

// Reporte 3: Pedidos por rango de fechas (desde y hasta como query params)
router.get('/pedidos-fechas', reportePedidosPorFechas);

// Reporte 4: Pedidos entregados o no entregados (estado como query param)
router.get('/pedidos-entregados', reportePedidosEntregados);

// Reporte 5: Pedidos pagados o no pagados (estado como query param), incluye suma total
router.get('/pedidos-pagados', reportePedidosPagados);

// Reporte 6: Pedidos hechos por persona (idPersonal como param)
router.get('/pedidos-personal/:idPersonal', reportePedidosPorPersonal);

// Reporte 7: Arreglos florales (todos o filtrados por tipo)
router.get('/arreglos', reporteArreglos);

export default router;
