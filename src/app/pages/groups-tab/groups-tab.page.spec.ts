import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GroupsTabPage } from './groups-tab.page';

describe('GroupsTabPage', () => {
  let component: GroupsTabPage;
  let fixture: ComponentFixture<GroupsTabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupsTabPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GroupsTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
