import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PreStageComponent } from './pre-stage.component';

describe('StageComponent', () => {
  let component: PreStageComponent;
  let fixture: ComponentFixture<PreStageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PreStageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PreStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
