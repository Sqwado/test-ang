import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgbModule, // Obligatoire pour ng-bootstrap
    BrowserAnimationsModule, // Obligatoire pour ngx-toastr
    ToastrModule.forRoot({
      timeOut: 3000, // Temps d'affichage
      positionClass: 'toast-bottom-right', // Position du toast
      preventDuplicates: true, // Evite les doublons
    }),
  ]
})
export class MainModule { }
