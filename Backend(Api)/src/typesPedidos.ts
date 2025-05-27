// typesPedidos.ts

export interface Pedido {
  folio: number;
  ID_Cliente: number;
  ID_Arreglo: number;
  descripcion?: string;
  fecha_hora_pedido?: string;
  fecha_hora_entrega?: string;
  precio_sugerido?: number;
  ID_personal: number;
  entregado?: number;
  pagado?: number;
}

export type PedidoNuevo = Omit<Pedido, "folio">;
