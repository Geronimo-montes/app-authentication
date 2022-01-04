import { Injectable } from "@angular/core";
import {
  NbGlobalPhysicalPosition,
  NbToastrService
} from "@nebular/theme";

export enum EtypeMessage {
  SUCCESS = 'success',
  WARNING = 'warning',
  INFO = 'info',
  PRIMARY = 'primary',
  DANGER = 'danger'
};

@Injectable()
export class ToastService {

  private config: any = {
    status: 'success',
    destroyByClick: true,
    duration: 10000,
    hasIcon: true,
    position: NbGlobalPhysicalPosition.BOTTOM_RIGHT,
    preventDuplicates: false,
  };

  constructor(
    private toastService: NbToastrService,
  ) { }

  public show(title: string, body: string, type: EtypeMessage = EtypeMessage.SUCCESS) {
    this.config.status = type;
    this.toastService.show(body, title, this.config);
  }
}