import ExcelJS from 'exceljs';
import { Response } from 'express';

export const exportToExcel = async (res: Response, data: any[], columns: { header: string, key: string }[], filename: string) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Reporte');

  // Definir columnas
  worksheet.columns = columns;

  // Añadir datos
  data.forEach(item => {
    worksheet.addRow(item);
  });

  // Formato automático (ancho)
  worksheet.columns.forEach(column => {
    let maxLength = 10;
    column.eachCell({ includeEmpty: true }, cell => {
      maxLength = Math.max(maxLength, (cell.value?.toString()?.length ?? 0));
    });
    column.width = maxLength + 2;
  });

  // Enviar archivo como descarga
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
  await workbook.xlsx.write(res);
  res.end();
};
