import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
  <span class="created-by"><strong>@</strong>Derechos reservados</span>
  <div class="socials">
    <a href="#" target="_blank" class="ion ion-social-github"></a>
    <a href="#" target="_blank" class="ion ion-social-facebook"></a>
    <a href="#" target="_blank" class="ion ion-social-twitter"></a>
    <a href="#" target="_blank" class="ion ion-social-linkedin"></a>
  </div>`,
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
