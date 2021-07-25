import { DatePipe } from "@angular/common";
import { Eestatus } from "../../../@core/data/comonModel";
import { Ipackdocumentacion } from "../../../@core/data/documentoModel";
import { ESTATUS_SETTINGS } from "../../../@theme/components/tabla/tabla-settings-columns";

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
    ruta_imagen: {
      title: '', type: 'html', filter: false, editable: false,
      valuePrepareFunction: ($valor: string): string => {
        return `<img src="${$valor}" height="30" alt="">`;
      }
    },
    idpaquete: { title: 'No.', type: 'text', filter: false, editable: false, },
    nombre: { title: 'Nombre del paquete', type: 'text', filter: false, },
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
        return new DatePipe('en').transform($valor, 'medium');
      }
    },
    fecha_modificacion: {
      title: 'Fecha de modificación', type: 'text', filter: false, editable: false,
      valuePrepareFunction: ($valor: string): string => {
        return new DatePipe('en').transform($valor, 'medium');
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
