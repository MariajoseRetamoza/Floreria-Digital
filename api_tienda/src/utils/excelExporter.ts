import ExcelJS from 'exceljs';
import { Response } from 'express';

export const exportToExcel = async (
  res: Response,
  data: any[],
  columns: { header: string; key: string }[],
  filename: string
) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Reporte');

  worksheet.columns = columns;
  worksheet.addRows(data);

  worksheet.eachRow((row, rowIndex) => {
    row.eachCell((cell, colIndex: number) => {
      cell.alignment = { vertical: 'middle', horizontal: 'center' };
    });
  });

  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
  await workbook.xlsx.write(res);
  res.end();
};
