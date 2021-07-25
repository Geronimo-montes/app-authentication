import { Egenero, Ialumno, IdocumentoEntregado } from "../data/alumnoModel"
import { Eestatus } from "../data/comonModel";

export const DATA: Ialumno[] = [
  {
    matricula: '1710600008',
    idunidad: 1,
    perfil: 'assets/user_250x250.png',
    nombre: 'Juan',
    ape_1: 'Verdugo',
    ape_2: 'Cortez',
    genero: Egenero.MASCULINO,
    direccion: 'Direccion alumno',
    telefono: '1020304050',
    email: 'juan@email.com',
    estatus: Eestatus.ALTA
  }, {
    matricula: '1710600009',
    idunidad: 1,
    perfil: 'assets/user_250x250.png',
    nombre: 'Julia',
    ape_1: 'Manchego',
    ape_2: 'Noche Buena',
    genero: Egenero.FEMENINO,
    direccion: 'Direccion alumno',
    telefono: '1020304050',
    email: 'julia@email.com',
    estatus: Eestatus.ALTA
  }, {
    matricula: '1710600010',
    idunidad: 1,
    perfil: 'assets/user_250x250.png',
    nombre: 'Héctor',
    ape_1: 'Héctor',
    ape_2: 'Héctor',
    genero: Egenero.MASCULINO,
    direccion: 'Direccion alumno',
    telefono: '1020304050',
    email: 'hector@email.com',
    estatus: Eestatus.ALTA
  }, {
    matricula: '1710600011',
    idunidad: 1,
    perfil: 'assets/user_250x250.png',
    nombre: 'Andres',
    ape_1: 'Andres',
    ape_2: 'Andres',
    genero: Egenero.MASCULINO,
    direccion: 'Direccion alumno',
    telefono: '1020304050',
    email: 'andres@email.com',
    estatus: Eestatus.ALTA
  }, {
    matricula: '1710600012',
    idunidad: 2,
    perfil: 'assets/user_250x250.png',
    nombre: 'Juanita',
    ape_1: 'Juanita',
    ape_2: 'Juanita',
    genero: Egenero.FEMENINO,
    direccion: 'Direccion alumno',
    telefono: '1020304050',
    email: 'juanita@email.com',
    estatus: Eestatus.ALTA
  }
];

export const DATA_DOCS_ENTREGAODS: IdocumentoEntregado[] = [
  {
    matricula: '1710600008',
    idpaquete: 1,
    iddocumento: 1,
    nombre: 'asdfsadfasd',
    fecha_entrega: new Date(),
  },
  {
    matricula: '1710600008',
    idpaquete: 1,
    iddocumento: 2,
    nombre: 'asdfsadf',
    fecha_entrega: new Date(),
  }
];
