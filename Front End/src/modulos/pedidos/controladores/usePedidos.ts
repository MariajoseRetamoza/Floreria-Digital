import { ref } from "vue";
import type { Pedidos, PedidosAgregar } from "../interfaces/pedidos-interface";
import pedidosApi from "../api/pedidosAPI";

export const usePedidos = () => {
  const pedidos = ref<Pedidos[]>([]);
  const pedido = ref<Pedidos | null>(null); // para un solo pedido
  let mensaje = ref(0);

  const traePedidos = async () => {
    const respuesta = await pedidosApi.get<Pedidos[]>("/");
    pedidos.value = respuesta.data;
    console.log(pedidos.value);
  };

  const traePedidosPorFolio = async (folio: number) => {
    const respuesta = await pedidosApi.get<Pedidos[]>("/" + folio);
    console.log("Respuesta del backend por folio:", respuesta.data);
    pedido.value = Array.isArray(respuesta.data) ? respuesta.data[0] : null;
    console.log("Pedido seleccionado:", pedido.value);
    return pedido.value;
  };

  const agregarPedidos = async (pedido: PedidosAgregar) => {
    try {
      console.log("Datos a enviar:", pedido);
      const respuesta = await pedidosApi.post<{ affectedRows: number }>(
        "/",
        pedido
      );
      console.log("Respuesta del backend:", respuesta.data);
      if (respuesta.data.affectedRows > 0) {
        mensaje.value = 1;
      }
    } catch (error) {
      console.error("Error al agregar pedido:", error);
    }
  };

  const actualizarPedidos = async (pedido: Pedidos) => {
    const respuesta = await pedidosApi.put("/", pedido);
    if (respuesta.data.affectedRows >= 0) {
      mensaje.value = 1;
    }
  };

  const borrarPedidos = async (pedidos: Pedidos) => {
    const respuesta = await pedidosApi.delete("/", {
      data: { folio: pedidos.folio },
    });
    if (respuesta.data.fieldCount == 0) {
      mensaje.value = 1;
    }
  };

  return {
    pedidos,
    pedido,
    mensaje,
    traePedidos,
    agregarPedidos,
    traePedidosPorFolio,
    actualizarPedidos,
    borrarPedidos,
  };
};
