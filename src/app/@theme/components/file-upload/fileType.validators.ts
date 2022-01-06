import { FormControl, ValidationErrors, ValidatorFn } from "@angular/forms";

/**
 * @description Valida la extension de archivos. Acepta unicamente imagenes en formato (png, jpg).
 * @param control Validator que finciona con objetos de tipo FormControl
 * @returns ValidatorErrors | null
 */
export const fileType: ValidatorFn = (
  control: FormControl
): ValidationErrors | null => {
  const
    files = control.value,
    type: string[] = ['png', 'jpg'];

  var valid: boolean = true;

  if (Array.isArray(files)) {
    for (let i = 0; i < files.length; i++) {
      const extension = files[i].name.split('.')[1].toLowerCase();
      if (!type.includes(extension)) {
        console.log({ extension })
        valid = false;
        break;
      }
    }
    return (valid) ? null : { fileType: true };
  } else {
    return null;
  }
}