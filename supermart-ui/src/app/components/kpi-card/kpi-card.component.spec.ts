import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KpiCardComponent } from './kpi-card.component';

describe('KpiCardComponent', () => {
  let fixture: ComponentFixture<KpiCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [KpiCardComponent] }).compileComponents();
    fixture = TestBed.createComponent(KpiCardComponent);
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should display value and label', () => {
    fixture.componentRef.setInput('value', '3,000');
    fixture.componentRef.setInput('label', 'Active Locations');
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('.kpi-card__value')?.textContent?.trim()).toBe('3,000');
    expect(el.querySelector('.kpi-card__label')?.textContent?.trim()).toBe('Active Locations');
  });

  it('should apply accent color via style binding', () => {
    fixture.componentRef.setInput('accentColor', '#10b981');
    fixture.detectChanges();
    const card: HTMLElement = fixture.nativeElement.querySelector('.kpi-card');
    expect(card?.style.borderLeftColor).toBeTruthy();
  });
});
