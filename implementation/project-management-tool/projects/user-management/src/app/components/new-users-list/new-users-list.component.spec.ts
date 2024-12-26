import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUsersListComponent } from './new-users-list.component';

describe('NewUsersListComponent', () => {
  let component: NewUsersListComponent;
  let fixture: ComponentFixture<NewUsersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewUsersListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewUsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
