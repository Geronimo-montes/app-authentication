import { NbMenuItem } from "@nebular/theme";

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Pagina principal',
    icon: 'home-outline',
    link: '/pages/dashboard',
    home: true,
  }, {
    title: 'Usuarios',
    icon: 'people-outline',
    link: '/pages/user/tabla',
  }, {
    title: 'Agregar Usuario',
    icon: 'person-add-outline',
    link: '/pages/user/registro',
  }, {
    title: 'Autenticación',
    icon: 'at-outline',
    expanded: true,
    children: [],
  }
];
