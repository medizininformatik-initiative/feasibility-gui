import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToggleSearchComponent } from './toggle-search.component';

describe('ToggleSearchComponent', () => {
  let component: ToggleSearchComponent;
  let fixture: ComponentFixture<ToggleSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToggleSearchComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ToggleSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
