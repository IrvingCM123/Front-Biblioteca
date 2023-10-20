import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialprestamoComponent } from './historialprestamo.component';

describe('HistorialprestamoComponent', () => {
  let component: HistorialprestamoComponent;
  let fixture: ComponentFixture<HistorialprestamoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorialprestamoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorialprestamoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
