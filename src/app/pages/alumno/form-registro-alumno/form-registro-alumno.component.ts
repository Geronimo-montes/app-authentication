import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { ResponseData } from '../../../@core/data/headerOptions';
import { fileType } from '../../../@theme/components/file-upload/fileType.validators';
import {
  EtypeMessage,
  ToastService
} from '../../../@core/mock/root-provider/Toast.service';
import {
  Component,
  OnInit
} from '@angular/core';
import {
  Iunidadacademica,
  UnidadAcademicaModel
} from '../../../@core/data/unidadAcademicaModel';
import {
  AlumnoModel,
  Egenero,
  Ialumno
} from '../../../@core/data/alumnoModel';
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
import { FileModel } from '../../../@core/data/fileModel';

@Component({
  selector: 'app-form-registro-alumno',
  templateUrl: './form-registro-alumno.component.html',
  styleUrls: ['./form-registro-alumno.component.scss']
})
export class FormRegistroAlumnoComponent implements OnInit {

  public loadingData: boolean = false;

  public editMode: boolean = false; // cambia el comportamiento del evento submit

  public form: FormGroup;
  public nbPopoverError: string = ''; // Msj con el error del input
  public nbPopoverTrigger: NbTriggerValues = NbTrigger.FOCUS; // Forma de disparar el msj
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
    private fileService: FileModel,
    private toastService: ToastService,
    private router: ActivatedRoute,
  ) { }

  async ngOnInit(): Promise<void> {
    this.initForm();
    this.loadingData = true;

    // datos para el combobox de unidades academicas
    this.unidades_academicas =
      await this.unidadService.getUnidadesAcademicas$().toPromise();

    // obtenemos el parametro de la url
    const matricula = this.router.snapshot.params.matricula;

    // si esta definido activamos el modo edicion y obtenemos la data del alumno
    if (matricula) {
      this.editMode = true;
      let alumno = await this.alumnoService.getAlumnoByMatricula$(matricula).toPromise();
      // let perfil = await this.fileService.getPerfil$().toPromise();
      // console.log({ perfil });

      this.setValuesForm(alumno);
    }


    this.loadingData = false;
  }

  /**
   * construye los controles del formulario reactivo, ademas agrega validadores
   */
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

  private setValuesForm(data: Ialumno) {
    this.form.setValue({
      perfil: '',
      matricula: data.matricula,
      idunidad: data.idunidad,
      nombre: data.nombre,
      ape_1: data.ape_1,
      ape_2: data.ape_2,
      genero: data.genero,
      direccion: data.direccion,
      telefono: data.telefono,
      email: data.email,
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
    this.loadingData = true;
    this.alumnoService.newAlumno$(this.form.value)
      .pipe(take(1))
      .subscribe((res: ResponseData) => {
        const
          title = 'Registro de alumno',
          body = res.message,
          type = (res.response) ? EtypeMessage.SUCCESS : EtypeMessage.DANGER;
        this.toastService.show(title, body, type);
        this.loadingData = false;
        // this.router.navigateByUrl('/pages/alumno/tabla-alumnos');
      })
  }
}
