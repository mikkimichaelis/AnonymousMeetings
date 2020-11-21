import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GroupTabPage } from './group-tab.page';

describe('GroupTabPage', () => {
  let component: GroupTabPage;
  let fixture: ComponentFixture<GroupTabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupTabPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GroupTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
