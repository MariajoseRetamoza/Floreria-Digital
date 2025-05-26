// typesPedidos.ts

export interface Pedido {
  folio: number;
  ID_Cliente: number;
  ID_Arreglo: number;
  descripcion?: string;
  fecha_hora_pedido?: string; // Formato ISO: "YYYY-MM-DDTHH:MM:SS"
  fecha_hora_entrega?: string;
  precio_sugerido?: number;
  ID_personal: number;
  entregado?: number; // 0 o 1
  pagado?: number; // 0 o 1
}

export type PedidoNuevo = Omit<Pedido, "folio">;
