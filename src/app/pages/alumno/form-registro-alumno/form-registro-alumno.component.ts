import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
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

  private destroy$: Subject<void> = new Subject<void>();

  private idunidad: number;

  public loadingData: boolean = false;

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

    this.idunidad = Number(this.activatedRouter.snapshot.params.idunidad);

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
      idunidad: new FormControl(
        {
          value: (this.idunidad) ? this.idunidad : '',
          disabled: (this.idunidad) ? true : false,
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
    return (!form.get(controlName).valid && form.get(controlName).dirty && form.get(controlName).touched) ?
      this.invalid :
      this.valid;
  }

  /**
   * @description Evento que se activa al enviar el formulario
   */
  public async formSubmit() {
    // this.loadingData = true;
    // Titulo de la notificacion
    const title = 'Registro de alumno';
    // Habilitamos el campo para poder obtener su valor
    this.form.get('idunidad').enable();
    // Iniciamos la peticion
    const responseNew: ResponseData =
      await this.alumnoService.newAlumno$(this.form.value).toPromise();

    if (responseNew)
      if (responseNew.response) {
        const
          perfil = this.form.get('perfil').value,
          matricula = this.form.get('matricula').value;
        // Update perfil de alumno
        const response: ResponseData = await this.alumnoService
          .uploadFile$(perfil, matricula).toPromise();

        if (response.response) {
          this.toastService.show(title, responseNew.message, EtypeMessage.SUCCESS);

          this.router.navigateByUrl(
            `/pages/alumno/tabla-alumnos/${this.form.get('idunidad').value}`)
        } else {
          this.toastService.show(title, responseNew.message, EtypeMessage.DANGER);
        }
      } else {
        this.toastService.show(title, responseNew.message, EtypeMessage.DANGER);
      }

    this.loadingData = false;
  }
}
