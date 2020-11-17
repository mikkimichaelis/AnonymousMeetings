import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MeetingInfoPage } from './meeting-info.page';

describe('MeetingInfoPage', () => {
  let component: MeetingInfoPage;
  let fixture: ComponentFixture<MeetingInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetingInfoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MeetingInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
