import { Component, OnDestroy, OnInit } from '@angular/core';
import { Form, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NbComponentShape, NbComponentStatus, NbTrigger, NbTriggerValues } from '@nebular/theme';
import { Subject } from 'rxjs';
import { fileType } from '../../../@theme/components/file-upload/fileType.validators';

@Component({
  selector: 'app-form-registro-documentacion',
  templateUrl: './form-registro-documentacion.component.html',
  styleUrls: ['./form-registro-documentacion.component.scss']
})
export class FormRegistroDocumentacionComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>(); // Unsuscribe suscripciones
  public loadingData: boolean = false;

  public form: FormGroup;
  public nbPopoverError: string = ''; // Msj con el error del input
  public nbPopoverTrigger: NbTriggerValues = NbTrigger.FOCUS; // Forma de disparar el msj
  public nbComponentShape: NbComponentShape = 'semi-round'; // Para inputs
  public valid: NbComponentStatus = 'primary';
  public invalid: NbComponentStatus = 'danger';

  //data
  public formato = [
    { text: '*.PNG', value: 'png' },
    { text: '*.JPG', value: 'jpg' },
  ];

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initForm() {
    this.form = this.formBuilder.group({
      perfil: new FormControl('', [Validators.required, fileType]),
      nombre: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100)
      ]),
      descripcion: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(300)
      ]),
      documentos: this.formBuilder.array([]),
    });

    this.addDocumento();
  }

  /**
   * @description Metodo get del array de controles para la catura de la ingormacion de un documento
   */
  get FormControlsdocumentos(): FormArray {
    return this.form.get('documentos') as FormArray;
  }

  /**
   * @description Agrega un grupo de controles al array de documentos
   */
  public addDocumento(): void {
    const documentos = this.formBuilder.group({
      foto_ejemplo: new FormControl('', [Validators.required, fileType]),
      nombre: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100)
      ]),
      formato: new FormControl('', [Validators.required]),
      peso_max: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[0-9]/),
        Validators.minLength(1),
        Validators.maxLength(10)
      ]),
      requerido: new FormControl(false, [Validators.required]),
    });

    this.FormControlsdocumentos.push(documentos);
  }

  /**
   * @description Elimina el elemento establecido, solo permite terer un control 
   * @param index Indice asignado al elemnto detro de formbuilder.array
   */
  public removeDocumento(index: number): void {
    this.FormControlsdocumentos.removeAt(index);
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
    console.log(this.form.value);
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

/**
  ruta_imagen file
  nombre      input text
  descripcion input area


  Array de controles dinamico
  nombre
  formato
  peso_max
  requerido
  foto_ejemplo
 */
