import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubirSustentacionComponent } from './subir-sustentacion.component';

describe('SubirSustentacionComponent', () => {
  let component: SubirSustentacionComponent;
  let fixture: ComponentFixture<SubirSustentacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubirSustentacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubirSustentacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
