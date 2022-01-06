import { Router } from '@angular/router';
// 
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
// 
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormControl } from '@angular/forms';
// 
import { NbTrigger } from '@nebular/theme';
import { NbDialogRef } from '@nebular/theme';
import { NbTriggerValues } from '@nebular/theme';
import { NbComponentShape } from '@nebular/theme';
import { NbComponentStatus } from '@nebular/theme';
// 
import { Subject } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { takeUntil } from 'rxjs/operators';
// 
import { ToastService } from '../../../@core/utils';
import { ERol } from '../../../@core/data/user.model';
import { UserModel } from '../../../@core/data/user.model';
import { FaceIdModel } from '../../../@core/data/faceId.model';
import { UserCredentialsModel } from '../../../@core/data/userCredentials.model';
// 
import { fileType } from '../../../@theme/components/file-upload/fileType.validators';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  private destroy$: Subject<void> = new Subject<void>();
  public loadingData: boolean = false;

  public form: FormGroup;
  public nbPopoverError: string = ''; // Msj con el error del input
  public nbPopoverTrigger: NbTriggerValues = NbTrigger.FOCUS; // Forma de disparar el msj
  public nbComponentShape: NbComponentShape = 'semi-round'; // Para inputs
  public valid: NbComponentStatus = 'primary';
  public invalid: NbComponentStatus = 'danger';

  constructor(
    protected ref: NbDialogRef<FormComponent>,
    private fromBuilder: FormBuilder,
    // 
    private userService: UserModel,
    private credentialsService: UserCredentialsModel,
    private faceIdService: FaceIdModel,
    // 
    private toastService: ToastService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  /**
   * 
   */
  private initForm() {
    this.form = this.fromBuilder.group({
      files: new FormControl('',
        [Validators.required, fileType,]
      ),
      name: new FormControl('',
        [Validators.required, Validators.minLength(5), Validators.maxLength(60),]
      ),
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
        Validators.minLength(8),
        Validators.maxLength(30)
      ]),
    })
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
        ? `Campo obligatorio.`
        : (control.errors.minlength)
          ? `Lonjitud mínima de ${control.errors.minlength.requiredLength} caracteres.`
          : (control.errors.maxlength)
            ? `Lonjitud máxima de ${control.errors.maxlength.requiredLength} caracteres.`
            : (control.errors.pattern && controlName === 'email')
              ? `EL formato no corresponde a un correo válido.`
              : (control.errors.pattern && controlName === 'password')
                ? `Mínimo 8 caracteres con sibomolos, mayúsculas, minúsculas y numeros.`
                : (control.errors.pattern && (controlName === 'nombre'))
                  ? `Este campo solo acepta letras.`
                  : (control.errors.fileType)
                    ? `Extension no valida. Solo imagenes en formato PNG`
                    : '';
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
    this.loadingData = !this.loadingData;
    const { files, name, email, password } = this.form.value

    this.userService.add$(name, ERol.USER).toPromise()
      .then((data) =>
        this.credentialsService.add$(data._id, email, password).toPromise())
      .then((data) => {
        console.log({ data });
        return this.faceIdService.add$(data._id, files).toPromise()
      })
      .then((data) => {
        this.toastService.success(
          'Registro de usuario',
          'El registro se completo de manera exitosa',
        )
        this.router.navigateByUrl('/pages/users/tabla');
        this.loadingData = false;
      })
      .catch((err) => {
        console.log({ err });
        this.loadingData = false;
      });
  }
  /**
   * Close de window
   */
  close() {
    this.ref.close(false);
  }
}
