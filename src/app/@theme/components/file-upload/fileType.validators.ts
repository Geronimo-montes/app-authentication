import { FormControl, ValidationErrors, ValidatorFn } from "@angular/forms";

/**
 * @description Valida la extension de archivos. Acepta unicamente imagenes en formato (png, jpg).
 * @param control Validator que finciona con objetos de tipo FormControl
 * @returns ValidatorErrors | null
 */
export const fileType: ValidatorFn = (
  control: FormControl
): ValidationErrors | null => {
  const file = control.value;
  const type: string[] = ['png', 'jpg'];

  if (file) {
    const extension = file.name.split('.')[1].toLowerCase();
    return (type.indexOf(extension.toLowerCase()) === -1) ? { fileType: true } : null;
  } else {
    return null;
  }
}