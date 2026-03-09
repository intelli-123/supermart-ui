import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginFormComponent } from './login-form.component';

describe('LoginFormComponent', () => {
  let fixture: ComponentFixture<LoginFormComponent>;
  let component: LoginFormComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [LoginFormComponent] }).compileComponents();
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an invalid form when empty', () => {
    expect(component.form.valid).toBeFalse();
  });

  it('should have a valid form with correct inputs', () => {
    component.form.setValue({ email: 'admin@supermart.com', password: 'secret' });
    expect(component.form.valid).toBeTrue();
  });

  it('should emit loginSubmit with credentials on valid submit', () => {
    const emitted: unknown[] = [];
    component.loginSubmit.subscribe((v: unknown) => emitted.push(v));
    component.form.setValue({ email: 'admin@supermart.com', password: 'secret' });
    component.onSubmit();
    expect(emitted.length).toBe(1);
    expect(emitted[0]).toEqual({ email: 'admin@supermart.com', password: 'secret' });
  });

  it('should not emit loginSubmit when form is invalid', () => {
    const emitted: unknown[] = [];
    component.loginSubmit.subscribe((v: unknown) => emitted.push(v));
    component.onSubmit();
    expect(emitted.length).toBe(0);
  });

  it('should toggle password visibility', () => {
    expect(component.showPassword).toBeFalse();
    component.togglePassword();
    expect(component.showPassword).toBeTrue();
    component.togglePassword();
    expect(component.showPassword).toBeFalse();
  });
});
