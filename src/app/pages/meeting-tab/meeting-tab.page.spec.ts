import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MeetingTabPage } from './meeting-tab.page';

describe('MeetingTabPage', () => {
  let component: MeetingTabPage;
  let fixture: ComponentFixture<MeetingTabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetingTabPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MeetingTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
