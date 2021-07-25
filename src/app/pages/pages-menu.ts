import { NbMenuItem } from "@nebular/theme";

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Pagina principal',
    icon: 'home-outline',
    link: '/pages/dashboard',
    home: true,
  }, {
    title: 'Unidades Académicas',
    icon: 'cube',
    link: '/pages/unidad-academica/tabla-unidad-academica',
  }, {
    title: 'Alumnos',
    icon: 'book',
    link: '/pages/alumno/tabla-alumnos',
  }, {
    title: 'Documentacón',
    icon: 'clipboard',
    link: '/pages/documentacion/tabla-documentacion',
  }, {
    title: 'Empleados',
    icon: 'people',
    link: '/pages/empleado/tabla-empleados',
  },
];