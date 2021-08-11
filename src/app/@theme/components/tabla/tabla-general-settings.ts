import { Egenero } from "../../../@core/data/alumnoModel";
import { Eestatus } from "../../../@core/data/comonModel";
import { Erol } from "../../../@core/data/userModel";

export const GENERAL_CONFIG = {
  mode: 'external',
  hideSubHeader: false,
  noDataMessage: 'Tabla sin registros...',
  actions: {
    columnTitle: 'Acciones',
    position: 'right',
    add: false,
    custom: null,
  },
  edit: null,
  delete: null,
  pager: {
    perPage: 8,
  },
};

/**
 * @description Configuracion para la columna de imagen de perfil de elemento, para el componente ng2-smart-table. Configuraciones:
 * title
 * type
 * filter
 * editable
 * valuePrepareFunction
 */
export const PERFIL_SETTINGS = {
  title: '',
  type: 'html',
  filter: false,
  editable: false,
  valuePrepareFunction: ($valor: string): string => {
    return `<img src="${$valor}" height="30" alt="">`;
  }
};

/**
 * @description Configuraciones para la columno estatus del componente ng2-smart-table. Se indican las sighientes configuraciones:
 * class
 * title
 * type
 * filter
 * editor
 */
export const ESTATUS_SETTINGS = {
  title: 'Estado',
  type: 'html',
  filter: {
    type: 'list',
    config: {
      selectText: 'Todos',
      list: [
        { value: 'a', title: 'Alta' },
        { value: 'b', title: 'Baja' },
      ],
    },
  },
  editable: false,
  editor: {
    type: 'list',
    config: {
      list: [
        { value: 'a', title: 'Alta' },
        { value: 'b', title: 'Baja' },
      ],
    },
  },
  valuePrepareFunction: ($valor: string): string => {
    let icon = '', estatus = '';
    if ($valor === Eestatus.ALTA) {
      icon = 'assets/alta.png';
      estatus = 'ALTA';
    } else {
      icon = 'assets/baja.png';
      estatus = 'BAJA';
    }
    return `<span class="aling-items-center"><img class="mr-1" src="${icon}" height="25" alt="">${estatus}</span>`;
  }
};

/**
 * @description Configuraciones para la columno rol del componente ng2-smart-table. Se indican las sighientes configuraciones:
 * class
 * title
 * type
 * filter
 * editor
 */
export const ROL_SETTINGS = {
  title: 'Rol',
  type: 'text',
  filter: {
    type: 'list',
    config: {
      selectText: 'Todos',
      list: [
        { value: 'auxiliar', title: 'Auxiliar' },
        { value: 'jefatura', title: 'Jefatura' },
        { value: 'director', title: 'Director' },
      ],
    },
  },
  editor: {
    type: 'list',
    config: {
      list: [
        { value: 'auxiliar', title: 'Auxiliar' },
        { value: 'jefatura', title: 'Jefatura' },
        { value: 'director', title: 'Director' },
      ],
    },
  },
  valuePrepareFunction: ($valor: string): string => {
    return ($valor === Erol.AUXILIAR) ? 'AUXILIAR' : ($valor === Erol.JEFATURA) ? 'JEFATURA' : 'DIRECTOR';
  }
};

/**
 * @description Configuraciones para la columno genero del componente ng2-smart-table. Se indican las sighientes configuraciones:
 * class
 * title
 * type
 * filter
 * editor
 */
export const GENERO_SETTINGS = {
  title: 'Genero',
  type: 'html',
  filter: {
    type: 'list',
    config: {
      selectText: 'Ambos',
      list: [
        { value: 'm', title: 'Hombre' },
        { value: 'f', title: 'Mujer' },
      ],
    },
  },
  editor: {
    type: 'list',
    config: {
      list: [
        { value: 'm', title: 'Hombre' },
        { value: 'f', title: 'Mujer' },
      ],
    },
  },
  valuePrepareFunction: ($valor: string): string => {
    let icon = '', genero = '';
    if ($valor === Egenero.FEMENINO) {
      icon = 'assets/femenino.png';
      genero = 'Mujer';
    } else {
      icon = 'assets/masculino.png';
      genero = 'Hombre';
    }
    return `<span class="m-auto"><img class="mr-1" src="${icon}" height="30" alt="">${genero}</span>`;
  }
};

export const EDIT_CONTROL = {
  editButtonContent: `<img   src="assets/edit.png" height="35">`,
  saveButtonContent: '<img   src="assets/save.png" height="35" alt="">',
  cancelButtonContent: '<img   src="assets/cancel.png" height="35" alt="">',
  confirmSave: true,
};

export const DELETE_CONTROL = {
  deleteButtonContent: `<img   src="assets/add-remove.png" height="35">`,
  saveButtonContent: '<img   src="assets/save.png" height="35" alt="">',
  cancelButtonContent: '<img   src="assets/cancel.png" height="35" alt="">',
  confirmDelete: true,
};

export const VIEW_CONTROL = [{
  name: 'Visualizar',
  title: `<img   src="assets/view.png" height="35">`,
}];