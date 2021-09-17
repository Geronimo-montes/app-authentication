import { ActivatedRoute, Router } from '@angular/router';
import { map, takeUntil } from 'rxjs/operators';
import { ResponseData } from '../../../@core/data/headerOptions';
import { fileType } from '../../../@theme/components/file-upload/fileType.validators';
import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  Iunidadacademica,
  UnidadAcademicaModel
} from '../../../@core/data/unidadAcademicaModel';
import {
  AlumnoModel,
  Egenero,
} from '../../../@core/data/alumnoModel';
import {
  EtypeMessage,
  ToastService
} from '../../../@core/mock/root-provider/Toast.service';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  NbComponentShape,
  NbComponentStatus,
  NbTrigger,
  NbTriggerValues
} from '@nebular/theme';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-form-registro-alumno',
  templateUrl: './form-registro-alumno.component.html',
  styleUrls: ['./form-registro-alumno.component.scss']
})
export class FormRegistroAlumnoComponent implements OnInit, OnDestroy {
  public title: string = ``;
  private destroy$: Subject<void> = new Subject<void>();
  public loadingData: boolean = false;

  private clave_unidad: string;

  public form: FormGroup;
  public nbPopoverError: string = ''; // Msj con el error del input
  public nbPopoverTrigger: NbTriggerValues = NbTrigger.FOCUS;
  public nbComponentShape: NbComponentShape = 'semi-round'; // estilo de los imputs
  public valid: NbComponentStatus = 'primary'; // color primario para campos validos
  public invalid: NbComponentStatus = 'danger'; // color para campos invalidos

  public selecGenero: any[] = [
    { value: Egenero.FEMENINO, text: 'Femenino' },
    { value: Egenero.MASCULINO, text: 'Masculino' },
  ];
  public unidades_academicas: Iunidadacademica[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private unidadService: UnidadAcademicaModel,
    private alumnoService: AlumnoModel,
    private toastService: ToastService,
    private activatedRouter: ActivatedRoute,
    private router: Router,
  ) { }

  async ngOnInit(): Promise<void> {
    this.loadingData = true;

    this.unidades_academicas =
      await this.unidadService.getUnidadesAcademicas$().toPromise();

    this.clave_unidad = this.activatedRouter.snapshot.params.claveunidad;

    if (this.clave_unidad) {
      const unidad = this.unidades_academicas
        .find((data) => data.clave === this.clave_unidad);

      this.title =
        `Unidad Academica: ${unidad.nombre}`;
    }

    this.initForm();
    this.loadingData = false;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * construye los controles del formulario reactivo, ademas agrega validadores
   */
  private initForm() {
    this.form = this.formBuilder.group({
      perfil: new FormControl('', [
        Validators.required,
        fileType
      ]),
      matricula: new FormControl('',
        {
          validators: [
            Validators.required,
            Validators.pattern(/^[0-9]{10,10}$/),
          ],
          asyncValidators: [
            this.validatorMatricula(this.alumnoService)
          ],
        }),
      clave: new FormControl(
        {
          value: (this.clave_unidad) ? this.clave_unidad : '',
          disabled: (this.clave_unidad) ? true : false,
        },
        [
          Validators.required
        ]),
      nombre: new FormControl('',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Záéóúí ]+$/),
          Validators.minLength(3),
          Validators.maxLength(100)
        ]),
      ape_1: new FormControl('',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Záéóúí ]+$/),
          Validators.minLength(3),
          Validators.maxLength(100)
        ]),
      ape_2: new FormControl('',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Záéóúí  ]+$/),
          Validators.minLength(3),
          Validators.maxLength(100)
        ]),
      genero: new FormControl('', [Validators.required]),
      direccion: new FormControl('',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100)
        ]),
      telefono: new FormControl('',
        [
          Validators.required,
          Validators.pattern(/^[0-9]{10,20}$/),
        ]),
      email: new FormControl('',
        [
          Validators.required,
          Validators.pattern(/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/),
          Validators.minLength(5),
          Validators.maxLength(100)
        ]),
    });
  }

  /**
   * Validad si la matricula esta registrada en la BD. 
   * @param api 
   * @returns {AsyncValidatorFn} Objeto de la estructura { invalidMatricula: resultado } | null
   */
  validatorMatricula(api: any): AsyncValidatorFn {
    return (control: AbstractControl) => {
      return this.alumnoService.validarMatricula$(control.value)
        .pipe(map((response) => (response) ? { invalidMatricula: response } : null));
    }
  }

  /**
   * @description Obtiene el mensaje de error con respecto a la validacion violada
   * @param controlName
   * @returns
   */
  public getError(controlName: string, form: FormGroup): string {
    // para lanzar el validador necesitamos levantar las bandreas dirty y touched
    form.get(controlName).markAsDirty();
    form.get(controlName).markAsTouched();
    const control = form.get(controlName);

    if (control.touched && control.errors != null)
      return (control.errors.required)
        ? `Campo obligatorio.` :
        (control.errors.pattern && controlName === 'email')
          ? `EL formato no corresponde a un correo válido.` :
          (control.errors.pattern && controlName === 'telefono')
            ? `Introdusca solo numeros, minimo 10 digitos y maximo 20 digitos` :
            (control.errors.pattern && controlName === 'matricula')
              ? `Introdusca unicamente 10 digitos. Ejemplo: 1234567890` :
              (control.errors.pattern && (controlName === 'nombre' || controlName === 'ape_1' || controlName === 'ape_2'))
                ? `Este campo solo acepta letras.` :
                (control.errors.minlength)
                  ? `La lonjitud mínima para el campo es ${control.errors.minlength.requiredLength}.` :
                  (control.errors.maxlength)
                    ? `La lonjitud máxima para el campo es ${control.errors.maxlength.requiredLength}.` :
                    (control.errors.invalidMatricula)
                      ? `La matricula proporcionada ya esta registrada.` : '';
    return '';
  }

  /**
   * @description Valida si la informacion del input y retorna un estatus.
   * @param controlName 
   * @param form 
   * @returns <NbComponentStatus>
   */
  public validatorInput(controlName: string, form: FormGroup): NbComponentStatus {
    return (!form.get(controlName).valid
      && form.get(controlName).dirty
      && form.get(controlName).touched) ?
      this.invalid :
      this.valid;
  }

  /**
   * @description Evento que se activa al enviar el formulario
   */
  public formSubmit() {
    this.loadingData = true;
    // TITULO DE LA NOTIFICACION
    const title = 'Registro de alumno';
    // PARA OBTENER EL VALOR EL CONTROL TIENE QUE ESTAR HABILITADO
    this.form.get('clave').enable();

    // CREAMOS UN FORM DATA PARA SUBIR LA DATA Y LA IMAGEN
    const data: FormData = new FormData();
    data.append('perfil', this.form.get('perfil').value);
    data.append('matricula', this.form.get('matricula').value);
    data.append('clave', this.form.get('clave').value);
    data.append('nombre', this.form.get('nombre').value);
    data.append('ape_1', this.form.get('ape_1').value);
    data.append('ape_2', this.form.get('ape_2').value);
    data.append('genero', this.form.get('genero').value);
    data.append('direccion', this.form.get('direccion').value);
    data.append('telefono', this.form.get('telefono').value);
    data.append('email', this.form.get('email').value);

    this.alumnoService.newAlumno$(data)
      .pipe(takeUntil(this.destroy$))
      .subscribe((respons: ResponseData) => {
        this.toastService.show(
          title,
          respons.message,
          (respons.response) ? EtypeMessage.SUCCESS : EtypeMessage.DANGER
        );

        if (respons.response)
          this.router.navigateByUrl(
            `/pages/alumno/tabla-alumnos/${this.form.get('clave').value}`)

        this.loadingData = false;
      });
  }
}
