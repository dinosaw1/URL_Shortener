import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, Validators } from '@angular/forms';

import { CreateShortURLService } from '../services/create-short-url.service';

@Component({
  selector: 'app-create-short-url',
  templateUrl: './create-short-url.component.html',
  styleUrls: ['./create-short-url.component.scss']
})
export class CreateShortURLComponent implements OnInit {
  shortURL = "";
  inputErrorMsg = "Invalid URL. Please enter valid URL (E.g. https://www.google.com)";
  
  urlRegEx = /((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?).*/
  urlFormControl= new FormControl('', [ Validators.pattern(this.urlRegEx)])

  constructor(
    private createShortURLService: CreateShortURLService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  public onUrlFocusOut(event: any) {
    event.target.value = this.addProtocolIfNone(event.target.value);
  }

  private addProtocolIfNone(url: string) {
    const protocolRegEx = /(https?:\/\/)/i;
    let match = protocolRegEx.test(url);
    if (url && this.urlFormControl.valid && !match) {
      return"https://" + url;
    }
    else{
      return url;
    }
  }

  public createShortURL() {
    if (this.urlFormControl.value && this.urlFormControl.value.length > 0) {
      let longUrl = this.addProtocolIfNone(this.urlFormControl.value);
      this.createShortURLService.createShortURL(longUrl).subscribe({
        next: (response) => this.shortURL = window.location.origin + "/" + response.shortURL,
        error: (e) => {
          this.shortURL = "";
          this.snackBar.open(e.error.message, '', { duration: 3000 });
        }
      });
    }
  }

  public markTouched() {
    this.urlFormControl.markAsTouched();
    this.urlFormControl.updateValueAndValidity();
  }
}
