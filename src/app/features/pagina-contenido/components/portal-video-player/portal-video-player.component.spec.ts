import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalVideoPlayerComponent } from './portal-video-player.component';

describe('PortalVideoPlayerComponent', () => {
  let component: PortalVideoPlayerComponent;
  let fixture: ComponentFixture<PortalVideoPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortalVideoPlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalVideoPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
