import { Egenero } from "../../../@core/data/alumnoModel";
import { Eestatus } from "../../../@core/data/comonModel";
import { Erol } from "../../../@core/data/userModel";

/**
 * @description Configuraciones para la columno estatus del componente ng2-smart-table. Se indican las sighientes configuraciones:
 * class
 * title
 * type
 * filter
 * editor
 */
export const ESTATUS_SETTINGS = {
  class: 'col-md-1',
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
      icon = 'assets/add.png';
      estatus = 'ALTA';
    } else {
      icon = 'assets/cancel.png';
      estatus = 'BAJA';
    }
    return `<span><img src="${icon}" height="30" alt="">  ${estatus}</span>`;
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
  title: 'Sexo',
  type: 'html',
  filter: {
    type: 'list',
    config: {
      selectText: 'Ambos',
      list: [
        { value: 'm', title: 'Masculino' },
        { value: 'f', title: 'Femenino' },
      ],
    },
  },
  editor: {
    type: 'list',
    config: {
      list: [
        { value: 'm', title: 'Masculino' },
        { value: 'f', title: 'Femenino' },
      ],
    },
  },
  valuePrepareFunction: ($valor: string): string => {
    let icon = '', estatus = '';
    if ($valor === Egenero.FEMENINO) {
      icon = 'assets/femenino.png';
      estatus = 'FEMENINO';
    } else {
      icon = 'assets/masculino.png';
      estatus = 'MASCULINO';
    }
    return `<span><img src="${icon}" height="30" alt="">  ${estatus}</span>`;
  }
};