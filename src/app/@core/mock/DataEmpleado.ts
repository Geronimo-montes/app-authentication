import { Eestatus } from "../data/comonModel";
import { Erol, Iauxiliar, Ijefatura } from "../data/userModel";

export const DATA: Ijefatura[] | Iauxiliar[] = [
  {
    idusuario: 1,
    perfil: 'assets/alumnos.png',
    email: 'empleado_1@email.com',
    password: '1234567890',
    rol: Erol.AUXILIAR,
    token: '',
    ultima_conexion: new Date(),
    idunidad: 1,
    nombre: 'Empleado_1',
    ape_1: 'Empleado_1',
    ape_2: 'Empleado_1',
    telefono: '1234567890',
    idjefatura: 1,
    estatus: Eestatus.ALTA,
  }, {
    idusuario: 2,
    perfil: 'assets/alumnos.png',
    email: 'empleado_2@email.com',
    password: '12121210',
    rol: Erol.JEFATURA,
    token: '',
    ultima_conexion: new Date(),
    idunidad: 1,
    nombre: 'Empleado_2',
    ape_1: 'Empleado_2',
    ape_2: 'Empleado_2',
    telefono: '1234567890',
    estatus: Eestatus.ALTA,
  },
];
