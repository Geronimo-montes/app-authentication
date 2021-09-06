import { NbMenuItem } from "@nebular/theme";

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Pagina principal',
    icon: 'home-outline',
    link: '/pages/dashboard',
    home: true,
  }, {
    title: 'Catalagos',
    icon: 'clipboard-outline',
    expanded: true,
    children: [],
  }, {
    title: 'Formularios',
    icon: 'folder-add-outline',
    expanded: false,
    children: [],
  }, {
    title: 'Reportes',
    icon: 'bar-chart',
    link: '/pages/reportes',
  }
];

export const CONTROLS = [
  {
    title: 'Unidades',
    icon: 'cube-outline',
    link: '/pages/unidad-academica/tabla-unidad-academica',
  }, {
    title: 'Empleados',
    icon: 'people',
    link: '/pages/empleado/tabla-empleados',
  }, {
    title: 'Alumnos',
    icon: 'book',
    link: '/pages/alumno/tabla-alumnos',
  }, {
    title: 'Documentacón',
    icon: 'clipboard',
    link: '/pages/documentacion/tabla-documentacion',
  }
];

export const FORMS = [
  {
    title: 'Unidad',
    icon: 'plus-circle-outline',
    link: '/pages/unidad-academica/registro-unidad-academica',
  }, {
    title: 'Empleado',
    icon: 'plus-circle-outline',
    link: '/pages/empleado/registro-empleado',
  }, {
    title: 'Alumno',
    icon: 'plus-circle-outline',
    link: '/pages/alumno/registro-alumno',
  }, {
    title: 'Documentacón',
    icon: 'plus-circle-outline',
    link: '/pages/documentacion/registro-documentacion',
  },
]