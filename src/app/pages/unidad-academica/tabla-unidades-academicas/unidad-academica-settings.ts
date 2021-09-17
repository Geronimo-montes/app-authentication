import { ESTATUS_SETTINGS, GENERAL_CONFIG, PERFIL_SETTINGS } from "../../../@theme/components/tabla/tabla-general-settings";

export const SETTINGS = {
  // mode: 'external',
  ...GENERAL_CONFIG,
  columns: {
    perfil: PERFIL_SETTINGS,
    clave: { title: 'Clave', type: 'text', filter: false, editable: false },
    nombre: { title: 'Nombre', type: 'text', filter: false, },
    direccion: { title: 'Direccción', type: 'text', filter: false, },
    correo: { title: 'Email', type: 'text', filter: false, },
    telefono: { title: 'Telefono', type: 'text', filter: false, },
    estatus: ESTATUS_SETTINGS,
  },
};

export const FILTER = [
  { field: 'idunidad', search: '' },
  { field: 'clave', search: '' },
  { field: 'nombre', search: '' },
  { field: 'direccion', search: '' },
  { field: 'correo', search: '' },
  { field: 'telefono', search: '' },
]
