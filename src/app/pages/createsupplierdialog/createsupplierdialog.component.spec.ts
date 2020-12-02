import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatesupplierdialogComponent } from './createsupplierdialog.component';

describe('CreatesupplierdialogComponent', () => {
  let component: CreatesupplierdialogComponent;
  let fixture: ComponentFixture<CreatesupplierdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatesupplierdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatesupplierdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
