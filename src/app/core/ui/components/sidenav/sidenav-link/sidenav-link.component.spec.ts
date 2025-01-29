import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavLinkComponent } from './sidenav-link.component';
import { ActivatedRoute } from '@angular/router';

describe('SidenavLinkComponent', () => {
  let component: SidenavLinkComponent;
  let fixture: ComponentFixture<SidenavLinkComponent>;

  beforeEach(async () => {
    const activatedRouteStub = {};
    await TestBed.configureTestingModule({
      imports: [SidenavLinkComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteStub }, // Provide the mock
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SidenavLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
