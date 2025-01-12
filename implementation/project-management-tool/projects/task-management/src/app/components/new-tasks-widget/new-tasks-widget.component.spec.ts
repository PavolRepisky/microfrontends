import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewTasksWidgetComponent } from './new-tasks-widget.component';

describe('NewTasksWidgetComponent', () => {
  let component: NewTasksWidgetComponent;
  let fixture: ComponentFixture<NewTasksWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewTasksWidgetComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NewTasksWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
