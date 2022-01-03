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
    credentials: { title: 'Email', type: 'text', filter: true, editable: false },
    // FaceId: { title: 'Face ID', type: 'text', filter: false, editable: false },
    role: ROL_SETTINGS,
    create: {
      title: 'Create', type: 'text', filter: true, editable: false,
      valuePrepareFunction: ($v) => new DatePipe('en').transform($v, 'short'),
    },
    update: {
      title: 'Update', type: 'text', filter: true, editable: false,
      valuePrepareFunction: ($v) => new DatePipe('en').transform($v, 'short'),
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