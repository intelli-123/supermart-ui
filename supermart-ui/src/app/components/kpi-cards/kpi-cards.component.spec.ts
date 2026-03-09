import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KpiCardsComponent } from './kpi-cards.component';

describe('KpiCardsComponent', () => {
  let fixture: ComponentFixture<KpiCardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [KpiCardsComponent] }).compileComponents();
    fixture = TestBed.createComponent(KpiCardsComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render 5 kpi cards', () => {
    const cards = fixture.nativeElement.querySelectorAll('app-kpi-card');
    expect(cards.length).toBe(5);
  });
});
