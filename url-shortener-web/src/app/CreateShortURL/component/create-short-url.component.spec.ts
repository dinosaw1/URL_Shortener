import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of,throwError } from 'rxjs';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule  } from '@angular/forms';

import { CreateShortURLComponent } from './create-short-url.component';
import { CreateShortURLService } from '../services/create-short-url.service';

class MockCreateShortURLService {
  mockResponse = {
    "shortURL": "qamPx"
  };

  createShortURL(longURL: String): Observable<any> {
    return of(this.mockResponse);
  }
}

describe('CreateShortURLComponent', () => {
  let component: CreateShortURLComponent;
  let fixture: ComponentFixture<CreateShortURLComponent>;
  let createShortURLService: CreateShortURLService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateShortURLComponent],
      imports: [
        MatSnackBarModule,
        ReactiveFormsModule
      ],
      providers: [
        {
          provide: CreateShortURLService,
          useClass: MockCreateShortURLService,
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CreateShortURLComponent);
    component = fixture.componentInstance;
    createShortURLService = TestBed.inject(CreateShortURLService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add https when focusout', () => {
    const event = { target: { value: "www.google.com" } };
    component.onUrlFocusOut(event);
    expect(event.target.value).toEqual("https://www.google.com");
  });

  it('should not add https when focusout', () => {
    const event = { target: { value: "https://www.google.com" } };
    component.onUrlFocusOut(event);
    expect(event.target.value).toEqual("https://www.google.com");
  });

  it('should call service and return shortURL', () => {
    component.urlFormControl.setValue("https://www.google.com");
    component.createShortURL();
    expect(component.shortURL).toEqual(window.location.origin + "/qamPx" );
  });

  it('should show error on service error', () => {
    spyOn(createShortURLService, 'createShortURL').and.returnValue(throwError('Error'));
    component.urlFormControl.setValue("https://www.google.com");
    component.createShortURL();
    expect(component.shortURL).toEqual("");
  });

  it('should call markAsTouched and updateValueAndValidity', () => {
    const markAsTouchedSpy = spyOn(component.urlFormControl, 'markAsTouched');
    const updateValueAndValiditySpy = spyOn(component.urlFormControl, 'updateValueAndValidity');
    component.markTouched();

    expect(markAsTouchedSpy).toHaveBeenCalled();
    expect(updateValueAndValiditySpy).toHaveBeenCalled();
  });
});
