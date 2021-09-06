import { Router } from '@angular/router';
import { ResponseData } from '../../../@core/data/headerOptions';
import { UnidadAcademicaModel } from '../../../@core/data/unidadAcademicaModel';
import { fileType } from '../../../@theme/components/file-upload/fileType.validators';
import {
  take,
  takeUntil
} from 'rxjs/operators';
import {
  EtypeMessage,
  ToastService
} from '../../../@core/mock/root-provider/Toast.service';
import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import {
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
import { async, Subject } from 'rxjs';

@Component({
  selector: 'app-form-registro-unidad',
  templateUrl: './form-registro-unidad.component.html',
  styleUrls: ['./form-registro-unidad.component.scss']
})
export class FormRegistroUnidadComponent implements OnInit, OnDestroy {


  private destroy$: Subject<void> = new Subject<void>();

  public loadingData: boolean = false;

  public form: FormGroup;
  public nbPopoverError: string = ''; // Msj con el error del input
  public nbPopoverTrigger: NbTriggerValues = NbTrigger.FOCUS;
  public nbComponentShape: NbComponentShape = 'semi-round'; // estilo de los imputs
  public valid: NbComponentStatus = 'primary'; // color primario para campos validos
  public invalid: NbComponentStatus = 'danger'; // color para campos invalidos

  constructor(
    private formBuilder: FormBuilder,
    private unidadService: UnidadAcademicaModel,
    private toastService: ToastService,
    private router: Router,
  ) { }

  async ngOnInit(): Promise<void> {
    this.initForm();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Contruye los controles del formulario reactivo, así como agrega elementos de validacion
   */
  private initForm() {
    this.form = this.formBuilder.group({
      perfil: new FormControl('', [Validators.required, fileType]),
      clave: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20)
      ]),
      nombre: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9 ]+$/),
        Validators.minLength(5),
        Validators.maxLength(100)
      ]),
      direccion: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(60)
      ]),
      correo: new FormControl('', [
        Validators.required,
        Validators.pattern(/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/),
        Validators.minLength(5),
        Validators.maxLength(60)
      ]),
      telefono: new FormControl('', [
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
        (control.errors.pattern && controlName === 'email')
          ? `EL formato no corresponde a un correo válido.` :
          (control.errors.pattern && controlName === 'telefono')
            ? `Introdusca solo numeros, minimo 10 digitos y maximo 20 digitos` :
            (control.errors.pattern && (controlName === 'nombre'))
              ? `Este campo solo acepta letras y numeros.` :
              (control.errors.minlength)
                ? `La lonjitud mínima para el campo es ${control.errors.minlength.requiredLength}.` :
                (control.errors.maxlength)
                  ? `La lonjitud máxima para el campo es ${control.errors.maxlength.requiredLength}.` : '';
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
  public formSubmit() {
    this.loadingData = true;
    this.unidadService.newUnidadAcademica(this.form.value)
      .pipe(take(1), takeUntil(this.destroy$))
      .subscribe((res: ResponseData) => {
        const
          title = 'Registro de unidad académica',
          body = res.message,
          type = (res.response) ? EtypeMessage.SUCCESS : EtypeMessage.DANGER;

        this.toastService.show(title, body, type);
        this.loadingData = false;
        this.router.navigateByUrl('/pages/unidad-academica/tabla-unidad-academica');
      });
  }
}
