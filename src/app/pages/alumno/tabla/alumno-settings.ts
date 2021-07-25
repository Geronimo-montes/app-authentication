import { Egenero, Ialumno } from "../../../@core/data/alumnoModel";
import { Eestatus } from "../../../@core/data/comonModel";
import { ESTATUS_SETTINGS, GENERO_SETTINGS } from "../../../@theme/components/tabla/tabla-settings-columns";

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
      title: '',
      type: 'html',
      filter: false,
      editable: false,
      valuePrepareFunction: ($valor: string): string => {
        return `<img src="${$valor}" height="30" alt="">`;
      }
    },
    matricula: { class: 'col-md-1', title: 'Matricula', type: 'text', filter: false, editable: false, },
    nombre: {
      title: 'Nombre Completo', type: 'text', filter: false,
      valuePrepareFunction: ($valor: string): string => {
        return $valor;
      },
    },
    genero: GENERO_SETTINGS,
    telefono: { title: 'Telefono', type: 'text', filter: false, },
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
