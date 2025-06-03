  import { Cliente } from './clientemodel';
  export interface Personal {
  id: number; // Autoincrementable
  nombreCompleto: string;
  direccion: string;
  telefono: string;
  estatus: 1 | 2; // 1 = Vigente, 2 = Baja
}
export type ClienteNuevo = Omit<Cliente, 'ID_cliente'>;