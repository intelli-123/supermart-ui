import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopbarComponent } from './topbar.component';

describe('TopbarComponent', () => {
  let fixture: ComponentFixture<TopbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [TopbarComponent] }).compileComponents();
    fixture = TestBed.createComponent(TopbarComponent);
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should display the title', () => {
    fixture.componentRef.setInput('title', 'Dashboard');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.topbar__title')?.textContent?.trim()).toBe('Dashboard');
  });

  it('should show last-updated when provided', () => {
    fixture.componentRef.setInput('lastUpdated', '14:32:05');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.topbar__meta')).toBeTruthy();
  });

  it('should hide last-updated when empty', () => {
    fixture.componentRef.setInput('lastUpdated', '');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.topbar__meta')).toBeNull();
  });
});
