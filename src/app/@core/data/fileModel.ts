import { Observable } from "rxjs";
import { HeaderOption, ResponseData } from "./headerOptions";

export abstract class FileModel extends HeaderOption {

	/**
	 * Sube un archivo al servidor
	 * @param {File} file Archivo a subir
	 */
	abstract uploadFile$(file: File, matricula: string, name: string): Observable<ResponseData>;


}