import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccelerometerDataComponent } from './accelerometer-data.component';

describe('AccelerometerDataComponent', () => {
  let component: AccelerometerDataComponent;
  let fixture: ComponentFixture<AccelerometerDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccelerometerDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccelerometerDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
