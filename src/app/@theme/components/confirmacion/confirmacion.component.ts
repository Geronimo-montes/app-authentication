import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

export enum typeicon {
  QUESTION = 'question',
  DELETE = 'delete'
}

@Component({
  selector: 'ngx-confirmacion',
  templateUrl: './confirmacion.component.html',
  styleUrls: ['./confirmacion.component.scss']
})
export class ConfirmacionComponent implements OnInit {

  @Input() titulo: string;
  @Input() cuerpo: string;
  @Input() type: typeicon = typeicon.QUESTION;
  @Input() btnCancel: string = 'Cancelar';
  @Input() btnConfirmar: string = 'Confirmar';

  constructor(
    protected ref: NbDialogRef<ConfirmacionComponent>
  ) { }

  ngOnInit(): void {
  }

  get icon(): string {
    let icon = '';
    switch (this.type) {
      case typeicon.QUESTION:
        icon = 'assets/question.png';
        break;
      case typeicon.DELETE:
        icon = 'assets/delete.png';
        break;
      default:
        break;
    }

    return icon;
  }

  cancel() {
    this.ref.close();
  }

  confirmar() {
    this.ref.close(true);
  }
}
