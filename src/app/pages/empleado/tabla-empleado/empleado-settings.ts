import { DatePipe } from "@angular/common";
import { Iusuario } from "../../../@core/data/userModel";
import { ESTATUS_SETTINGS, GENERAL_CONFIG, PERFIL_SETTINGS, ROL_SETTINGS } from "../../../@theme/components/tabla/tabla-general-settings";

export const SETTINGS = {
  // mode: 'external',
  ...GENERAL_CONFIG,
  columns: {
    perfil: PERFIL_SETTINGS,
    idusuario: { title: 'No.', type: 'text', filter: false, editable: false, },
    nombre: { title: 'Nombre Completo', type: 'text', filter: false, },
    telefono: { title: 'Telefono', type: 'text', filter: false, },
    dataJefatura: {
      title: 'Asiganada a', type: 'text', filter: false,
      valuePrepareFunction: ($valor: Iusuario): string => {
        return ($valor === null) ?
          '' :
          `${$valor.nombre} ${$valor.ape_1} ${$valor.ape_2}`;
      }
    },
    // email: { title: 'Email', type: 'text', filter: false, },
    rol: ROL_SETTINGS,
    ultima_conexion: {
      title: 'Ultima conexión', type: 'text', filter: false, editable: false,
      valuePrepareFunction: ($valor: string): string => {
        return new DatePipe('en').transform($valor, 'short');
      }
    },
    estatus: ESTATUS_SETTINGS,
  },
};

export const FILTER = [
  { field: 'idusuario', search: '' },
  { field: 'nombre', search: '' },
  { field: 'telefono', search: '' },
  { field: 'idjefatura', search: '' },
  { field: 'email', search: '' },
  { field: 'ultima_conexion', search: '' },
];
