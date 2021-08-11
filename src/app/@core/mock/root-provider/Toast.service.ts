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

@Injectable({
  providedIn: 'root',
})
export class ToastService {

  private config: any = {
    status: 'success',
    destroyByClick: true,
    duration: 5000,
    hasIcon: true,
    position: NbGlobalPhysicalPosition.TOP_LEFT,
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