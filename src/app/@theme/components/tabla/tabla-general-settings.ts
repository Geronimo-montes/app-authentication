import { Eestatus, ERol } from "../../../@core/data/user.model";

export const GENERAL_CONFIG = {
  // mode: 'external',
  hideSubHeader: true,
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
      icon = 'assets/table-alta.ico';
      estatus = 'ALTA';
    } else {
      icon = 'assets/table-baja.ico';
      estatus = 'BAJA';
    }
    return `<span class="row aling-items-center"><img class="mr-2" src="${icon}" height="25" alt="">${estatus}</span>`;
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
  title: 'Role',
  type: 'text',
  filter: {
    type: 'list',
    config: {
      selectText: 'Todos',
      list: [
        { value: ERol.ADMIN, title: 'Admin' },
        { value: ERol.USER, title: 'User' },
      ],
    },
  },
  editor: {
    type: 'list',
    config: {
      list: [
        { value: ERol.ADMIN, title: 'Admin' },
        { value: ERol.USER, title: 'User' },
      ],
    },
  },
  valuePrepareFunction: ($valor: string): string => {
    return ($valor === ERol.ADMIN)
      ? 'Admin'
      : 'User';
  }
};

export const EDIT_CONTROL = {
  editButtonContent: `<img src="assets/table-edit.ico" height="28">`,
  saveButtonContent: '<img src="assets/table-save.ico" height="28">',
  cancelButtonContent: '<img src="assets/table-cancel.ico" height="28">',
  confirmSave: true,
};

export const DELETE_CONTROL = {
  deleteButtonContent: `<img src="assets/table-add-remove.ico" height="28">`,
  saveButtonContent: '<img src="assets/table-save.ico" height="28">',
  cancelButtonContent: '<img src="assets/table-cancel.ico" height="28">',
  confirmDelete: true,
};

export const VIEW_CONTROL = [{
  name: 'Visualizar',
  title: `<img src="assets/table-view.ico" height="28">`,
}];