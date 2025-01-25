import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TasksChartWidgetComponent } from './tasks-chart-widget.component';

describe('TasksChartWidgetComponent', () => {
  let component: TasksChartWidgetComponent;
  let fixture: ComponentFixture<TasksChartWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasksChartWidgetComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TasksChartWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
