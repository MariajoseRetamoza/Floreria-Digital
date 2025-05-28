import axios from "axios";
const pedidosApi = axios.create({
  baseURL: "http://localhost:3002/api/pedidos",
});

export default pedidosApi;
