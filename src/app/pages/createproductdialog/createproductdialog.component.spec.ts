import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateproductdialogComponent } from './createproductdialog.component';

describe('CreateproductdialogComponent', () => {
  let component: CreateproductdialogComponent;
  let fixture: ComponentFixture<CreateproductdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateproductdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateproductdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
