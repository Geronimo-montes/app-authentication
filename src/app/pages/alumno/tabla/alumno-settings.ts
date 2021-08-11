import { ESTATUS_SETTINGS, GENERAL_CONFIG, GENERO_SETTINGS, PERFIL_SETTINGS } from "../../../@theme/components/tabla/tabla-general-settings";

export const SETTINGS = {
  // mode: 'external',
  ...GENERAL_CONFIG,
  columns: {
    perfil: PERFIL_SETTINGS,
    matricula: { width: '10%', title: 'Matricula', type: 'text', filter: false, editable: false, },
    nombre: {
      width: '13%', title: 'Nombre', type: 'text', filter: false,
      valuePrepareFunction: ($valor: string): string => {
        return $valor;
      },
    },
    ape_1: {
      title: 'Primer Apellido', type: 'text', filter: false,
      valuePrepareFunction: ($valor: string): string => {
        return $valor;
      },
    },
    ape_2: {
      title: 'Segundo Apellido', type: 'text', filter: false,
      valuePrepareFunction: ($valor: string): string => {
        return $valor;
      },
    },
    genero: GENERO_SETTINGS,
    // telefono: { title: 'Telefono', type: 'text', filter: false, },
    email: { title: 'Email', type: 'text', filter: false, },
    estatus: ESTATUS_SETTINGS,
  },
};

export const FILTER = [
  // { field: 'perfil', search: '' },
  { field: 'matricula', search: '' },
  { field: 'nombre', search: '' },
  { field: 'telefono', search: '' },
  { field: 'email', search: '' },
];
