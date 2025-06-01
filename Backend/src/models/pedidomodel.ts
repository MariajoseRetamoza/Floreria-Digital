export interface Pedido {
  folio: number;
  ID_Cliente: number;
  ID_Arreglo: number;
  descripcion: string;
  fecha_hora_pedido: Date;
  fecha_hora_entrega: Date;
  precio_sugerido: number;
  ID_personal: number;
  entregado: '1' | '2';
  pagado: '1' | '2';
}
