import { Component, ElementRef, HostListener, Input, OnInit, TemplateRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NbComponentStatus, NbTrigger } from '@nebular/theme';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: FileUploadComponent,
    multi: true
  }]
})
export class FileUploadComponent implements ControlValueAccessor {

  @Input() status: NbComponentStatus = 'primary'; // contorno del dropbox
  @Input() popoverError: string; // mensaje de error
  @Input() templateRef: TemplateRef<ElementRef>; // templeta para el popover de error
  @Input() name: string; // nombre, valor autentico para la asignacion de la preview img
  @Input() text: string; // texto a presentar al inico

  public popoverTrigger: NbTrigger = NbTrigger.HOVER;
  public hidden = true;
  public file: File | null = null;
  onChange: Function;

  @HostListener('change', ['$event.target.files']) emitFiles(event: FileList) {
    const file = event && event.item(0);
    this.onChange(file);
    this.file = file;

    const elem = document.getElementById(this.name);
    elem.setAttribute('src', URL.createObjectURL(file));
    this.hidden = false;
  }

  constructor(
    private host: ElementRef<HTMLInputElement>
  ) { }

  writeValue(value: null) {
    this.host.nativeElement.value = '';
    this.file = null;
  }

  registerOnChange(fn: Function) {
    this.onChange = fn;
  }

  registerOnTouched(fn: Function) {
  }
}
