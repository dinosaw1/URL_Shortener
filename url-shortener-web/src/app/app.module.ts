import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateShortURLComponent } from './CreateShortURL/component/create-short-url.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShortUrlRedirectionComponent } from './ShortUrlRedirection/component/short-url-redirection.component';



@NgModule({
  declarations: [
    AppComponent,
    CreateShortURLComponent,
    ShortUrlRedirectionComponent
  ],
  imports: [
    MatButtonModule,
    MatInputModule,
    MatSnackBarModule,
    MatFormFieldModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule, 
    BrowserAnimationsModule
  ],
  providers: [
    {provide: Window, useValue: window}],
  bootstrap: [AppComponent]
})
export class AppModule { }
