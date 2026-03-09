import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { LoginComponent } from './login.component';
import { provideRouter } from '@angular/router';

describe('LoginComponent', () => {
  let fixture: ComponentFixture<LoginComponent>;
  let component: LoginComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [provideRouter([])]
    }).compileComponents();
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render app-logo', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('app-logo')).toBeTruthy();
  });

  it('should render login-form', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('app-login-form')).toBeTruthy();
  });
});
