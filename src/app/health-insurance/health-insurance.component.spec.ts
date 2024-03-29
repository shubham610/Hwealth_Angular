import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthInsuranceComponent } from './health-insurance.component';

describe('HealthInsuranceComponent', () => {
  let component: HealthInsuranceComponent;
  let fixture: ComponentFixture<HealthInsuranceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HealthInsuranceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HealthInsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
