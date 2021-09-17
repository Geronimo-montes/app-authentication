import { EmpleadoModel } from '../../../@core/data/empleadoModel';
import { ResponseData } from '../../../@core/data/headerOptions';
import { Erol } from '../../../@core/data/userModel';
import { fileType } from '../../../@theme/components/file-upload/fileType.validators';
import { Subject } from 'rxjs';
import {
  take,
  takeUntil,
} from 'rxjs/operators';
import {
  ActivatedRoute,
  Router,
} from '@angular/router';
import {
  EtypeMessage,
  ToastService,
} from '../../../@core/mock/root-provider/Toast.service';
import {
  Iunidadacademica,
  UnidadAcademicaModel,
} from '../../../@core/data/unidadAcademicaModel';
import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  NbComponentShape,
  NbComponentStatus,
  NbTrigger,
  NbTriggerValues,
} from '@nebular/theme';

@Component({
  selector: 'app-form-registro-empleado',
  templateUrl: './form-registro-empleado.component.html',
  styleUrls: ['./form-registro-empleado.component.scss']
})
export class FormRegistroEmpleadoComponent implements OnInit, OnDestroy {
  public title: string = ``;
  private destroy$: Subject<void> = new Subject<void>(); // Unsuscribe suscripciones
  public loadingData: boolean = false;

  private clave_unidad: string;

  public form: FormGroup;
  public nbPopoverError: string = ''; // Msj con el error del input
  public nbPopoverTrigger: NbTriggerValues = NbTrigger.FOCUS;
  public nbComponentShape: NbComponentShape = 'semi-round';
  public valid: NbComponentStatus = 'primary';
  public invalid: NbComponentStatus = 'danger';

  // DATA
  public roles: any[] = [
    { value: Erol.DIRECTOR, text: 'Director' },
    { value: Erol.JEFATURA, text: 'Jefatura' },
    { value: Erol.AUXILIAR, text: 'Auxiliar' },
  ];
  public unidades_academicas: Iunidadacademica[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private unidadService: UnidadAcademicaModel,
    private empleadoService: EmpleadoModel,
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

      this.title = `Unidad Academica ${unidad.nombre}`;
    }

    this.initForm();
    this.loadingData = false;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initForm() {
    this.form = this.formBuilder.group({
      perfil: new FormControl('', [Validators.required, fileType]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/),
        Validators.minLength(5),
        Validators.maxLength(100)
      ]),
      password: new FormControl('', [
        Validators.required,
        //  8 letras, con al menos un símbolo, letras mayúsculas y minúsculas y un número
        Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,30}$/),
        Validators.minLength(5),
        Validators.maxLength(100)
      ]),
      rol: new FormControl('', [Validators.required,]),
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
          Validators.pattern(/^[a-zA-Z]+$/),
          Validators.minLength(5),
          Validators.maxLength(60)
        ]),
      ape_1: new FormControl('',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z]+$/),
          Validators.minLength(5),
          Validators.maxLength(60)
        ]),
      ape_2: new FormControl('',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z]+$/),
          Validators.minLength(5),
          Validators.maxLength(60)
        ]),
      telefono: new FormControl('',
        [
          Validators.required,
          Validators.pattern(/^[0-9]{10,20}$/),
        ]),
    });
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
        (control.errors.minlength)
          ? `La lonjitud mínima para el campo es ${control.errors.minlength.requiredLength}.` :
          (control.errors.maxlength)
            ? `La lonjitud máxima para el campo es ${control.errors.maxlength.requiredLength}.` :
            (control.errors.pattern && controlName === 'email')
              ? `EL formato no corresponde a un correo válido.` :
              (control.errors.pattern && controlName === 'password')
                ? `Mínimo 8 caracteres con sibomolos, mayúsculas, minúsculas y numeros.` :
                (control.errors.pattern && controlName === 'telefono')
                  ? `Introdusca solo numeros, minimo 10 digitos y maximo 20 digitos` :
                  (control.errors.pattern && (controlName === 'nombre' || controlName === 'ape_1' || controlName === 'ape_2'))
                    ? `Este campo solo acepta letras.` :
                    (control.errors.fileType)
                      ? `Extension no valida. Solo imagenes en formato PNG` :
                      '';
    return '';
  }

  /**
   * @description Valida si la informacion del input y retorna un estatus.
   * @param controlName 
   * @param form 
   * @returns <NbComponentStatus>
   */
  public validatorInput(controlName: string, form: FormGroup): NbComponentStatus {
    return (
      !form.get(controlName).valid
      && form.get(controlName).dirty
      && form.get(controlName).touched
    ) ? this.invalid : this.valid;
  }

  /**
   * @description Evento que se activa al enviar el formulario
   */
  public formSubmit() {
    this.loadingData = true;

    this.empleadoService.newEmpleado$(this.form.value)
      .pipe(take(1), takeUntil(this.destroy$))
      .subscribe((res: ResponseData) => {
        const
          title = 'Registro de empleado',
          body = res.message,
          type = (res.response) ? EtypeMessage.SUCCESS : EtypeMessage.DANGER;

        this.toastService.show(title, body, type);
        this.loadingData = false;
        this.router.navigateByUrl('/pages/empleado/tabla-empleado');
      });
  }

  /**
   * @description Despues de seleccionar la imagen se realiza inmediatamento la peticion de actualizacion de la imagen
   * @param fileInput
   * @returns
   */
  public fileEvnet(fileInput: Event) {
    const file = (<HTMLInputElement>fileInput.target).files[0];
    if (!(file.type === 'image/png' || file.type === 'image/jpeg')) return;
    const data = new FormData();
    data.append('img', file);

    console.log({ data }, 'Img Cargada');
  }
}
