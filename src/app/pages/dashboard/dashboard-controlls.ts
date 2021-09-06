import { Icontrolls } from "./dashboard.component";

export const CONTROLLS: Icontrolls[] = [
  {
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

export const CONTROL_REGISTROS: Icontrolls[] = [
  {
    objeto: 'registro-unidad',
    nombre: 'Registrar Unidad',
    icono: 'assets/add-unidades.png',
    class: 'status-primary',
    link: '/pages/unidad-academica/registro-unidad-academica',
  }, {
    objeto: 'registro-alumno',
    nombre: 'Registrar Alumno',
    icono: 'assets/add-alumno.png',
    class: 'status-warning',
    link: '/pages/alumno/registro-alumno',
  }, {
    objeto: 'registro-documento',
    nombre: 'Registrar Documentación',
    icono: 'assets/add-document.png',
    class: 'status-danger',
    link: '/pages/documentacion/registro-documentacion',
  }, {
    objeto: 'registro-empleado',
    nombre: 'Registrar Empleado',
    icono: 'assets/add-empleado.png',
    class: 'status-info',
    link: '/pages/empleado/registro-empleado',
  },
];
