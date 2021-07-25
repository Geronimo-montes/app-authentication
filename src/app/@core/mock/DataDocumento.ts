import { Eestatus } from "../data/comonModel";
import { Eformato, Erequerido, Ipackdocumentacion } from "../data/documentoModel";

export const DATA: Ipackdocumentacion[] = [
  {
    idpaquete: 1,
    ruta_imagen: 'assets/doc/inscripcion.png',
    nombre: 'Inscripción',
    descripcion: 'Paquete de documentos necesarios para la inscripción.',
    numero_documentos: 3,
    detalleDocumento: [
      {
        iddocumento: 1,
        nombre: 'Comprobante de estudios',
        formato: Eformato.PDF,
        peso_max: 2,
        requerido: Erequerido.REQUERIDO,
        foto_ejemplo: '',
        estatus: Eestatus.ALTA,
      }, {
        iddocumento: 2,
        nombre: 'Acte de nacimiento',
        formato: Eformato.PNG,
        peso_max: 2,
        requerido: Erequerido.REQUERIDO,
        foto_ejemplo: '',
        estatus: Eestatus.ALTA,
      }, {
        iddocumento: 3,
        nombre: 'Permiso firmado tutor',
        formato: Eformato.PNG,
        peso_max: 2,
        requerido: Erequerido.REQUERIDO,
        foto_ejemplo: '',
        estatus: Eestatus.ALTA,
      }
    ],
    fecha_creacion: new Date(),
    fecha_modificacion: new Date(),
    estatus: Eestatus.ALTA,
  }, {
    idpaquete: 2,
    ruta_imagen: 'assets/edit.png',
    nombre: 'Solicitud',
    descripcion: 'Paquete de documentos necesarios para la inscripción.',
    numero_documentos: 5,
    detalleDocumento: [
      {
        iddocumento: 1,
        nombre: 'Comprobante de estudios',
        formato: Eformato.PDF,
        peso_max: 2,
        requerido: Erequerido.REQUERIDO,
        foto_ejemplo: '',
        estatus: Eestatus.ALTA,
      }, {
        iddocumento: 2,
        nombre: 'Acte de nacimiento',
        formato: Eformato.PNG,
        peso_max: 2,
        requerido: Erequerido.REQUERIDO,
        foto_ejemplo: '',
        estatus: Eestatus.ALTA,
      }, {
        iddocumento: 3,
        nombre: 'Permiso firmado tutor',
        formato: Eformato.PNG,
        peso_max: 2,
        requerido: Erequerido.REQUERIDO,
        foto_ejemplo: '',
        estatus: Eestatus.ALTA,
      }, {
        iddocumento: 4,
        nombre: 'Permiso firmado tutor',
        formato: Eformato.PNG,
        peso_max: 2,
        requerido: Erequerido.REQUERIDO,
        foto_ejemplo: '',
        estatus: Eestatus.ALTA,
      }, {
        iddocumento: 5,
        nombre: 'Documento 4',
        formato: Eformato.PNG,
        peso_max: 2,
        requerido: Erequerido.REQUERIDO,
        foto_ejemplo: '',
        estatus: Eestatus.ALTA,
      }
    ],
    fecha_creacion: new Date(),
    fecha_modificacion: new Date(),
    estatus: Eestatus.ALTA,
  }
];
