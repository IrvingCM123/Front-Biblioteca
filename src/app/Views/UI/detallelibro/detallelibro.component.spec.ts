import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallelibroComponent } from './detallelibro.component';

describe('DetallelibroComponent', () => {
  let component: DetallelibroComponent;
  let fixture: ComponentFixture<DetallelibroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallelibroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetallelibroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
