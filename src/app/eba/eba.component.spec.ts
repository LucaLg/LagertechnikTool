import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EbaComponent } from './eba.component';

describe('EbaComponent', () => {
  let component: EbaComponent;
  let fixture: ComponentFixture<EbaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EbaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EbaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
