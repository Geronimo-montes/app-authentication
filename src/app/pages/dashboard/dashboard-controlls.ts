import { Icontrolls } from "./dashboard.component";

export const CONTROLLS: Icontrolls[] = [
  {
    objeto: 'perfil',
    nombre: 'Perfil de usuario',
    icono: 'assets/user.png',
    class: 'status-primary',
    link: '/pages/profile',
  }, {
    objeto: 'unidad',
    nombre: 'Unidades Académicas',
    icono: 'assets/unidades.png',
    class: 'status-primary',
    link: '/pages/unidad-academica',
  }, {
    objeto: 'alumno',
    nombre: 'Alumnos',
    icono: 'assets/alumnos.png',
    class: 'status-info',
    link: '/pages/alumno/tabla-alumnos',
  }, {
    objeto: 'documento',
    nombre: 'Documentación',
    icono: 'assets/documentos.png',
    class: 'status-warning',
    link: '/pages/documentacion',
  }, {
    objeto: 'reporte',
    nombre: 'Reportes',
    icono: 'assets/reportes.png',
    class: 'status-success',
    link: '/pages/reportes',
  }, {
    objeto: 'empleado',
    nombre: 'Gestión de empleados',
    icono: 'assets/empleados.png',
    class: 'status-danger',
    link: '/pages/empleado',
  },
];
