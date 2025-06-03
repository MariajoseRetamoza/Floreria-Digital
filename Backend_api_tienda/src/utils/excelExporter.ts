import ExcelJS from 'exceljs';

export const exportToExcel = (data: any[], filename: string) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Data');

  worksheet.columns = Object.keys(data[0]).map(key => ({
    header: key,
    key: key,
    width: 20
  }));

  data.forEach((row, rowIndex) => {
    worksheet.addRow(row);
    worksheet.columns?.forEach((column: Partial<ExcelJS.Column>, colIndex) => {
      const cell = worksheet.getRow(rowIndex + 1).getCell(colIndex + 1);
      cell.alignment = { vertical: 'middle', horizontal: 'center' };
    });
  });

  return workbook.xlsx.writeFile(filename);
};
