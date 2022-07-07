import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortUrlRedirectionComponent } from './short-url-redirection.component';

describe('ShortUrlRedirectionComponent', () => {
  let component: ShortUrlRedirectionComponent;
  let fixture: ComponentFixture<ShortUrlRedirectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShortUrlRedirectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShortUrlRedirectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
