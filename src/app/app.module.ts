import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { ToastrModule } from 'ngx-toastr';

export var toastrOptions = {  
    positionClass: 'toast-top-right',
    timeOut: 2000,
    closeButton: true,
    progressBar: true,
    tapToDismiss: true
}

@NgModule({
  declarations: [
    AppComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(toastrOptions), 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
