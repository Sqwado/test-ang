import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserAnimationsModule, // Obligatoire pour ngx-toastr
    ToastrModule.forRoot({
      timeOut: 3000, // Temps d'affichage
      positionClass: 'toast-bottom-right', // Position du toast
      preventDuplicates: true, // Evite les doublons
    }),
  ]
})
export class MainModule { }
