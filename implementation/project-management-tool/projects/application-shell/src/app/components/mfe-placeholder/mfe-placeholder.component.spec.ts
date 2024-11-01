import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MfePlaceholderComponent } from './mfe-placeholder.component';

describe('MfePlaceholderComponent', () => {
  let component: MfePlaceholderComponent;
  let fixture: ComponentFixture<MfePlaceholderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MfePlaceholderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MfePlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
