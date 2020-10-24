import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditproductdialogComponent } from './editproductdialog.component';

describe('EditproductdialogComponent', () => {
  let component: EditproductdialogComponent;
  let fixture: ComponentFixture<EditproductdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditproductdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditproductdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
