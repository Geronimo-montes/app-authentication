import { DatePipe } from "@angular/common";
import { repeat } from "rxjs/operators";
import { ESTATUS_SETTINGS, GENERAL_CONFIG, PERFIL_SETTINGS, ROL_SETTINGS } from "../../../@theme/components/tabla/tabla-general-settings";

export const SETTINGS = {
  // mode: 'external',
  ...GENERAL_CONFIG,
  columns:
  {
    // _id : hidden
    perfil: PERFIL_SETTINGS,
    name: { title: 'Nombre', type: 'text', filter: true, editable: false },
    role: { title: 'Role', type: 'text', filter: true, editable: false },
    // FaceId: { title: 'Face ID', type: 'text', filter: false, editable: false },
    // role: ROL_SETTINGS,
    create_date: {
      title: 'Create', type: 'text', filter: true, editable: false,
      valuePrepareFunction: ($v) =>
        new DatePipe('es-*').transform($v, 'MMMM d, y, hh:mm a')
    },
    update_date: {
      title: 'Update', type: 'text', filter: true, editable: false,
      valuePrepareFunction: ($v) =>
        new DatePipe('es-*').transform($v, 'MMMM d, y, hh:mm a')
    },
    estatus: ESTATUS_SETTINGS,
  }
};

export const FILTER = [
  { field: 'name', search: '' },
  { field: 'role', search: '' },
  { field: 'fecha_creacion', search: '' },
  { field: 'fecha_modificacion', search: '' },
]
/**
 */
