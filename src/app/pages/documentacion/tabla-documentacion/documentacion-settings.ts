import { DatePipe } from "@angular/common";
import { repeat } from "rxjs/operators";
import { ESTATUS_SETTINGS, GENERAL_CONFIG, PERFIL_SETTINGS } from "../../../@theme/components/tabla/tabla-general-settings";

export const SETTINGS = {
  // mode: 'external',
  ...GENERAL_CONFIG,
  columns: {
    ruta_imagen: PERFIL_SETTINGS,
    idpaquete: {
      title: 'No.', type: 'text', filter: false, editable: false,
      valuePrepareFunction: ($valor: number): string => {
        return '0'.repeat(5 - $valor.toString().length) + $valor;
      }
    },
    nombre: { title: 'Nombre', type: 'text', filter: false, },
    descripcion: {
      title: 'Descripcion', type: 'text', filter: false,
      valuePrepareFunction: ($valor: string): string => {
        return $valor.slice(0, 20);
      }
    },
    numero_documentos: { title: 'Items', type: 'text', filter: false, editable: false, },
    fecha_creacion: {
      title: 'Fecha de creación', type: 'text', filter: false, editable: false,
      valuePrepareFunction: ($valor: string): string => {
        return new DatePipe('en').transform($valor, 'short');
      }
    },
    fecha_modificacion: {
      title: 'Fecha de modificación', type: 'text', filter: false, editable: false,
      valuePrepareFunction: ($valor: string): string => {
        return new DatePipe('en').transform($valor, 'short');
      }
    },
    estatus: ESTATUS_SETTINGS,
  },
};

export const FILTER = [
  { field: 'idpaquete', search: '' },
  { field: 'nombre', search: '' },
  { field: 'descripcion', search: '' },
  { field: 'numero_documentos', search: '' },
  { field: 'fecha_creacion', search: '' },
  { field: 'fecha_modificacion', search: '' },
]
