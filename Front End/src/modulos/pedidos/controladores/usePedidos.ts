import { ref } from "vue";
import type { Pedidos, PedidosAgregar } from "../interfaces/pedidos-interface";
import pedidosApi from "../api/pedidosAPI";

export const usePedidos = () => {
  const pedidos = ref<Pedidos[]>([]);
  let mensaje = ref(0);

  const traePedidos = async () => {
    const respuesta = await pedidosApi.get<Pedidos[]>("/");
    pedidos.value = respuesta.data;
    console.log(pedidos.value);
  };
  const traePedidosPorFolio = async (folio: number) => {
    const respuesta = await pedidosApi.get<Pedidos[]>("/" + folio);
    pedidos.value = respuesta.data;
    return respuesta.data;
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

  //   const actualizarPersonal = async (personal: Personal) => {
  //     const respuesta = await personalApi.put("/", personal);
  //     if (respuesta.data.affectedRows >= 0) {
  //       mensaje.value = 1;
  //     }
  //   };

  //   const borrarPersonal = async (personal: Personal) => {
  //     const respuesta = await personalApi.delete("/", {
  //       data: { id: personal.id },
  //     });
  //     if (respuesta.data.fieldCount == 0) {
  //       mensaje.value = 1;
  //     }
  //   };
  return {
    pedidos,
    mensaje,
    traePedidos,
    agregarPedidos,
    traePedidosPorFolio,
    // // actualizarPersonal,
    // // borrarPersonal,
  };
};
