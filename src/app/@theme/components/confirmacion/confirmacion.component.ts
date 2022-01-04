import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

export enum typeicon {
  QUESTION = 'question',
  DELETE = 'delete'
}

@Component({
  selector: 'ngx-confirmacion',
  template: `
  <nb-card status="primary">
    <nb-card-header>{{titulo}}</nb-card-header>

    <nb-card-body class="container text-center">
      <img [src]="icon" height="100" alt="">
      <p>
        {{cuerpo}}
      </p>
      <strong>¿Desea continuar?</strong>
    </nb-card-body>

    <nb-card-footer class="row justify-content-between">
      <button class="cancel ml-2" nbButton [size]="'medium'" status="danger"
        (click)="cancel()">{{btnCancel}}</button>

      <button nbButton [size]="'medium'" status="success" class="mr-2"
        (click)="confirmar()">{{btnConfirmar}}</button>
    </nb-card-footer>
  </nb-card>
  `,
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
    if (this.type === typeicon.QUESTION)
      return 'assets/question.png';
    if (this.type === typeicon.DELETE)
      return 'assets/delete.png';
  }

  cancel() {
    this.ref.close();
  }

  confirmar() {
    this.ref.close(true);
  }
}
