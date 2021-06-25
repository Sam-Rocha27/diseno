import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarLComponent } from './navbar-l.component';

describe('NavbarLComponent', () => {
  let component: NavbarLComponent;
  let fixture: ComponentFixture<NavbarLComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarLComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
