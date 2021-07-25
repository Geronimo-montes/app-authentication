import { Iunidadacademica } from "../data/unidadAcademicaModel";
import { Eestatus } from "../data/comonModel";

export const DATA: Iunidadacademica[] = [
  {
    idunidad: 1,
    nombre: 'Preparatoria UAS Los Mochis',
    clave: '1234567890',
    perfil: 'assets/unidades.png',
    direccion: 'Los Mochis, Sinaloa.',
    correo: 'prepauas@uas.edu.mx',
    telefono: '1212121212',
    estatus: Eestatus.ALTA,
  }, {
    idunidad: 2,
    nombre: 'Facultad de Ingenieria UAS',
    clave: '1111111111',
    perfil: 'assets/unidades.png',
    direccion: 'Los Mochis, Sinaloa.',
    correo: 'ingenieriauas@uas.edu.mx',
    telefono: '2323232323',
    estatus: Eestatus.ALTA,
  }, {
    idunidad: 3,
    nombre: 'Faculta de negocios UAS',
    clave: '2222222222',
    perfil: 'assets/unidades.png',
    direccion: 'Los Mochis, Sinaloa.',
    correo: 'negociosuas@uas.edu.mx',
    telefono: '1212121212',
    estatus: Eestatus.ALTA,
  }, {
    idunidad: 4,
    nombre: 'UAS Los Mochis',
    clave: '3333333333',
    perfil: 'assets/unidades.png',
    direccion: 'Los Mochis, Sinaloa.',
    correo: 'uas@uas.edu.mx',
    telefono: '1423142314',
    estatus: Eestatus.ALTA,
  }
];