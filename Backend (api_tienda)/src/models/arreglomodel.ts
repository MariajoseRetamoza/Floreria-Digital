export interface Arreglo {
  ID_arreglo: number;
  descripcion: string;
  tipo_arreglo: '1' | '2' | '3' | '4'; // 1=ramo, 2=centro, 3=corona, 4=mixto
  estatus: '1' | '2'; // 1=vigente, 2=no vigente
}
