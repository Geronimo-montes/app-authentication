import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NbComponentShape, NbComponentStatus, NbTrigger, NbTriggerValues } from '@nebular/theme';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AlumnoModel, Egenero, Ialumno } from '../../../@core/data/alumnoModel';
import { Eestatus } from '../../../@core/data/comonModel';
import { ResponseData } from '../../../@core/data/headerOptions';
import { Iunidadacademica, UnidadAcademicaModel } from '../../../@core/data/unidadAcademicaModel';
import { ToastService } from '../../../@core/mock/Toast.service';
import { fileType } from '../../../@theme/components/file-upload/fileType.validators';

@Component({
  selector: 'app-form-registro-alumno',
  templateUrl: './form-registro-alumno.component.html',
  styleUrls: ['./form-registro-alumno.component.scss']
})
export class FormRegistroAlumnoComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>(); // Unsuscribe suscripciones
  public loadingData: boolean = false;

  public form: FormGroup;
  public nbPopoverError: string = ''; // Msj con el error del input
  public nbPopoverTrigger: NbTriggerValues = NbTrigger.FOCUS; // Forma de disparar el msj
  public nbComponentShape: NbComponentShape = 'semi-round';
  public valid: NbComponentStatus = 'primary';
  public invalid: NbComponentStatus = 'danger';

  //DATA 
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
  ) { }

  ngOnInit(): void {
    this.loadingData = true;
    this.unidadService.getUnidadesAcademicas$()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.unidades_academicas = data;
        this.loadingData = false;
      });

    this.initForm();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initForm() {
    this.form = this.formBuilder.group({
      perfil: new FormControl('', [Validators.required, fileType]),
      matricula: new FormControl('',
        [
          Validators.required,
          Validators.pattern(/^[0-9]{10,10}$/),
        ]),
      idunidad: new FormControl('', [Validators.required]),
      nombre: new FormControl('',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z ]+$/),
          Validators.minLength(5),
          Validators.maxLength(100)
        ]),
      ape_1: new FormControl('',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z ]+$/),
          Validators.minLength(5),
          Validators.maxLength(100)
        ]),
      ape_2: new FormControl('',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z  ]+$/),
          Validators.minLength(5),
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
    const data: Ialumno = {
      perfil: this.form.get('perfil').value,
      matricula: this.form.get('matricula').value,
      idunidad: this.form.get('idunidad').value,
      nombre: this.form.get('nombre').value,
      ape_1: this.form.get('ape_1').value,
      ape_2: this.form.get('ape_2').value,
      genero: this.form.get('genero').value,
      direccion: this.form.get('direccion').value,
      telefono: this.form.get('telefono').value,
      email: this.form.get('email').value,
      estatus: Eestatus.ALTA,
    }


    this.alumnoService.registrarAlumno$(data)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: ResponseData) => {
        console.log(data);
        this.toastService.show(
          'Registro de alumno',
          data.message,
          (data.response) ? 'success' : 'warning')
      });
  }
}
