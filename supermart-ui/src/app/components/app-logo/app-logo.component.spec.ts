import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppLogoComponent } from './app-logo.component';

describe('AppLogoComponent', () => {
  let fixture: ComponentFixture<AppLogoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [AppLogoComponent] }).compileComponents();
    fixture = TestBed.createComponent(AppLogoComponent);
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should display the app name', () => {
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('.app-logo__name')?.textContent).toContain('Supermart IoT');
  });

  it('should display the subtitle', () => {
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('.app-logo__subtitle')?.textContent).toContain('Temperature Monitoring Platform');
  });
});
