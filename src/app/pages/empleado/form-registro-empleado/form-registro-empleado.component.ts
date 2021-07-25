import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NbComponentShape, NbComponentStatus, NbTrigger, NbTriggerValues } from '@nebular/theme';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Iunidadacademica, UnidadAcademicaModel } from '../../../@core/data/unidadAcademicaModel';
import { Erol } from '../../../@core/data/userModel';
import { fileType } from '../../../@theme/components/file-upload/fileType.validators';

@Component({
  selector: 'app-form-registro-empleado',
  templateUrl: './form-registro-empleado.component.html',
  styleUrls: ['./form-registro-empleado.component.scss']
})
export class FormRegistroEmpleadoComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>(); // Unsuscribe suscripciones
  public loadingData: boolean = false;

  public form: FormGroup;
  public nbPopoverError: string = ''; // Msj con el error del input
  public nbPopoverTrigger: NbTriggerValues = NbTrigger.FOCUS; // Forma de disparar el msj
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
  ) { }

  ngOnInit(): void {
    this.unidadService.getUnidadesAcademicas$()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => this.unidades_academicas = data);

    this.initForm();
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
      idunidad: new FormControl('', [Validators.required,]),
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
    return (!form.get(controlName).valid && form.get(controlName).dirty && form.get(controlName).touched) ?
      this.invalid :
      this.valid;
  }

  /**
   * @description Evento que se activa al enviar el formulario
   */
  public formSubmit() {
    console.log(this.form.controls);
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