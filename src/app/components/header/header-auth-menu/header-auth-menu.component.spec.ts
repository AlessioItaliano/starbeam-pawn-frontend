import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderAuthMenuComponent } from './header-auth-menu.component';

describe('HeaderAuthMenuComponent', () => {
  let component: HeaderAuthMenuComponent;
  let fixture: ComponentFixture<HeaderAuthMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderAuthMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderAuthMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
