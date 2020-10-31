import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateselldialogComponent } from './createselldialog.component';

describe('CreateselldialogComponent', () => {
  let component: CreateselldialogComponent;
  let fixture: ComponentFixture<CreateselldialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateselldialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateselldialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
