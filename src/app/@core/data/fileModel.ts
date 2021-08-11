import { Observable } from "rxjs";
import { HeaderOption } from "./headerOptions";

export abstract class FileModel extends HeaderOption {
	abstract getPerfil$(): Observable<any>;
}