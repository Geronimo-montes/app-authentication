import { Directive, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';

export interface ICarruselContext {
  $implicit: any;
  controller: {
    next: () => void;
    prev: () => void;
  };
}

@Directive({
  selector: '[counter]'
})
export class CarruselDirective implements OnChanges {

  private context: ICarruselContext | null = null; // contiene el retorno de la directiva
  private start: number = 0; // elemento inicial para el slice

  @Input('counterFrom') documentos: any[] = []; //array de elementos
  @Input('counterAsCountElem') elementosVisibles: number = 1; // cantidad de elemetos a mostrar

  constructor(
    private container: ViewContainerRef,
    private template: TemplateRef<Object>,
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    // cadavez que el array de documentos cambie se renderiza el elemento nuevamente
    if (changes.documentos.previousValue !== changes.documentos.currentValue) {
      this.start = 0;
      this.container.clear();
      this.context = {
        $implicit: this.renderElements(),
        controller: {
          next: () => this.next(),
          prev: () => this.prev()
        }
      };
      this.container.createEmbeddedView(this.template, this.context);
    }
  }

  /**
   * @description Avanza un elemento en el array, si es el ultimo regresa al primero
   */
  public next() {
    this.start++;
    if (this.start + this.elementosVisibles > this.documentos.length)
      this.start = 0;

    this.context.$implicit = this.renderElements();
  }

  /**
   * @description Retrozede un elemento  en el array, si es el primero salta al ultimo
   */
  public prev() {
    this.start--;
    if (this.start < 0)
      this.start = this.documentos.length - this.elementosVisibles;

    this.context.$implicit = this.renderElements();
  }

  /**
   * @description Realiza un recorte en el array para mostrar la cantidad de elementos indicada a partir de un elemeto inicial
   * @returns Array<any>
   */
  private renderElements(): any[] {
    let elements: any[] = [];

    if (this.documentos.length > 0)
      elements = this.documentos
        .slice(this.start, this.start + this.elementosVisibles);

    return elements
  }
}
