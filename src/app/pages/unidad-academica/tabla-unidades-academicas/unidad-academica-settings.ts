import { Eestatus } from "../../../@core/data/comonModel";
import { Iunidadacademica } from "../../../@core/data/unidadAcademicaModel";
import { ESTATUS_SETTINGS } from "../../../@theme/components/tabla/tabla-settings-columns";

export const SETTINGS = {
  // mode: 'external',
  hideSubHeader: false,
  noDataMessage: 'No existen productos registrados...',
  actions: {
    columnTitle: 'Acciones',
    class: 'col-md-1',
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
    idunidad: { class: 'col-md-1', title: 'No. Unidad', type: 'text', filter: false, editable: false },
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
