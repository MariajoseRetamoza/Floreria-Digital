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
  //   const traePersonalPorId = async (id: number) => {
  //     const respuesta = await personalApi.get<Personal[]>("/" + id);
  //     personal.value = respuesta.data;
  //     return respuesta.data;
  //   };

  //   const agregarPersonal = async (personal: PersonalAgregar) => {
  //     const respuesta = await personalApi.post<{ affectedRows: number }>(
  //       "/",
  //       personal
  //     );
  //     if (respuesta.data.affectedRows > 0) {
  //       mensaje.value = 1;
  //     }
  //   };

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
    // // agregarPersonal,
    // // traePersonalPorId,
    // // actualizarPersonal,
    // // borrarPersonal,
  };
};
