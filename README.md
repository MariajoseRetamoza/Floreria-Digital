
# Florería Digital - Backend (api_tienda)

Backend desarrollado en **Node.js + Express + TypeScript + MySQL** para el sistema "Florería Digital".

---

## Tecnologías
- Node.js
- Express
- TypeScript
- MySQL (mediante `mysql2/promise`)
- Validaciones con Zod
- Exportación a Excel con ExcelJS
- Docker & Docker Compose

---

## Instalación
1️- Clonar repositorio:
```
git clone https://github.com/tu-repo/floreria-digital.git
cd floreria-digital/Backend
```
2️- Instalar dependencias:
```
npm install
```
3️- Configurar variables de entorno (archivo `.env`):
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=secret
DB_NAME=floreria_digital
PORT=3000
```
4️- Compilar TypeScript:
```
npm run build
```
5️- Iniciar servidor:
```
npm start
```

---

##  Docker & Docker Compose
Para levantar base de datos y backend:
```
docker-compose up
```

---

##  Rutas y Ejemplos

###  Personal
- `GET /api/personal`
- `POST /api/personal`
- `PUT /api/personal/:id`
- `DELETE /api/personal/:id`

###  Clientes
- `GET /api/clientes`
- `POST /api/clientes`
- `PUT /api/clientes/:id`
- `DELETE /api/clientes/:id`

###  Pedidos
- `GET /api/pedidos`
- `POST /api/pedidos` (valida que ID_Cliente, ID_Arreglo e ID_Personal existan)
- `PUT /api/pedidos/:folio` (valida relaciones si se actualizan)
- `DELETE /api/pedidos/:folio`

###  Arreglos
- `GET /api/arreglos`
- `POST /api/arreglos`
- `PUT /api/arreglos/:id`
- `DELETE /api/arreglos/:id`

###  Reportes (con exportación Excel)
- `GET /api/reportes/clientes?export=excel`
- `GET /api/reportes/pedidos-fechas?desde=YYYY-MM-DD&hasta=YYYY-MM-DD&export=excel`
- `GET /api/reportes/pedidos-entregados?estado=1&export=excel`
- `GET /api/reportes/pedidos-pagados?estado=1&export=excel`
- `GET /api/reportes/pedidos-personal/:idPersonal?export=excel`
- `GET /api/reportes/arreglos?tipo=1&export=excel`

---

## Base de Datos
- Script en `routes/Basededatos.txt`.
- Tablas: `personal`, `clientes`, `pedidos`, `Arreglos_Florales`.
- Relaciones validadas en backend antes de insertar/modificar pedidos.

---

## Validaciones y Seguridad
-Validaciones Zod en cada módulo.
-Validación de existencia de IDs en pedidos.
-Middleware global de errores (`errorHandler`) para capturar y devolver JSON.

```ts
// src/middlewares/errorHandler.ts
export const errorHandler = (err, req, res, next) => {
  console.error('Error detectado:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Error interno del servidor',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};
```

---

## Exportación a Excel (reportescontroller.ts)
```ts
if (req.query.export === 'excel') {
  const columns = [
    { header: 'Campo1', key: 'campo1' },
    ...
  ];
  return await exportToExcel(res, datos, columns, 'NombreReporte.xlsx');
}
```
Implementado para todos los reportes.

---

## Notas
- Backend completamente funcional según el proyecto.
- Falta el **frontend (cliente_tienda)**.
- (Opcional) Pruebas automáticas y documentación detallada.
- Se puede proteger rutas con JWT emitidos por Firebase.

---

## 👥 Autor
Proyecto desarrollado por Mariajose Retamoza Salazar
