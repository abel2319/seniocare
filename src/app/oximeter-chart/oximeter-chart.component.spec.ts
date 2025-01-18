import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OximeterChartComponent } from './oximeter-chart.component';

describe('OximeterChartComponent', () => {
  let component: OximeterChartComponent;
  let fixture: ComponentFixture<OximeterChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OximeterChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OximeterChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
