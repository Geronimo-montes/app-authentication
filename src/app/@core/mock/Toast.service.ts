import { Injectable } from "@angular/core";
import { NbGlobalPhysicalPosition, NbToastrService } from "@nebular/theme";

@Injectable({
  providedIn: 'root',
})
export class ToastService {

  private _status = 'success';
  private _destroyByClick = true;
  private _duration = 5000;
  private _hasIcon = true;
  private _position = NbGlobalPhysicalPosition.TOP_LEFT;
  private _preventDuplicates = false;
  private config;

  constructor(
    private toastService: NbToastrService,
  ) {
    this.config = {
      status: this._status,
      destroyByClick: this._destroyByClick,
      duration: this._duration,
      hasIcon: this._hasIcon,
      position: this._position,
      preventDuplicates: this._preventDuplicates,
    }
  }

  public show(title: string, body: string, type: string = 'success') {
    this.config.status = type;
    this.toastService.show(body, title, this.config);
  }
}