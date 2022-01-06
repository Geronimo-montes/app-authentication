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
  public success(title: string, body: string) {
    this.config.status = EtypeMessage.SUCCESS;
    this.toastService.show(body, title, this.config);
  }
  public danger(title: string, body: string) {
    this.config.status = EtypeMessage.DANGER;
    this.toastService.show(body, title, this.config);
  }
  public warning(title: string, body: string) {
    this.config.status = EtypeMessage.WARNING;
    this.toastService.show(body, title, this.config);
  }
  public info(title: string, body: string) {
    this.config.status = EtypeMessage.INFO;
    this.toastService.show(body, title, this.config);
  }
  public primary(title: string, body: string) {
    this.config.status = EtypeMessage.PRIMARY;
    this.toastService.show(body, title, this.config);
  }
}