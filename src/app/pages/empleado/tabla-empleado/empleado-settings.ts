import { DatePipe } from "@angular/common";
import { ESTATUS_SETTINGS, ROL_SETTINGS } from "../../../@theme/components/tabla/tabla-settings-columns";

export const SETTINGS = {
  // mode: 'external',
  hideSubHeader: false,
  noDataMessage: 'No existen productos registrados...',
  actions: {
    columnTitle: 'Acciones',
    position: 'right',
    add: false,
  },
  edit: {
    editButtonContent: '<img src="assets/edit.png" height="30" alt="">',
    saveButtonContent: '<img src="assets/save.png" height="30" alt="">',
    cancelButtonContent: '<img src="assets/cancel.png" height="30" alt="">',
    confirmSave: true,
  },
  delete: {
    deleteButtonContent: '<img src="assets/delete.png" height="30" alt="">',
    saveButtonContent: '<img src="assets/save.png" height="30" alt="">',
    cancelButtonContent: '<img src="assets/cancel.png" height="30" alt="">',
    confirmDelete: true,
  },
  pager: {
    perPage: 8,
  },
  columns: {
    perfil: {
      title: '', type: 'html', filter: false, editable: false,
      valuePrepareFunction: ($valor: string): string => {
        return `<img src="${$valor}" height="30" alt="">`;
      }
    },
    idusuario: { class: 'col-md-1', title: 'No.Usuario', type: 'text', filter: false, editable: false, },
    nombre: { title: 'Nombre Completo', type: 'text', filter: false, },
    telefono: { title: 'Telefono', type: 'text', filter: false, },
    idjefatura: {
      title: 'Asiganada a', type: 'text', filter: false,
      valuePrepareFunction: ($valor: string): string => {
        return ($valor === null) ? '' : $valor;
      }
    },
    email: { title: 'Email', type: 'text', filter: false, },
    rol: ROL_SETTINGS,
    ultima_conexion: {
      title: 'Ultima conexión', type: 'text', filter: false, editable: false,
      valuePrepareFunction: ($valor: string): string => {
        return new DatePipe('en').transform($valor, 'medium');
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
