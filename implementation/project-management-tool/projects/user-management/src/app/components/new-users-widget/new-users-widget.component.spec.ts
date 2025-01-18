import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUsersWidgetComponent } from './new-users-widget.component';

describe('NewUsersWidgetComponent', () => {
  let component: NewUsersWidgetComponent;
  let fixture: ComponentFixture<NewUsersWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewUsersWidgetComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NewUsersWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
