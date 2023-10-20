import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLibroComponent } from './addlibro.component';

describe('AddLibroComponent', () => {
  let component: AddLibroComponent;
  let fixture: ComponentFixture<AddLibroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLibroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddLibroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
