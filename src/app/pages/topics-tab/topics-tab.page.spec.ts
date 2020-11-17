import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TopicsTabPage } from './topics-tab.page';

describe('TopicsTabPage', () => {
  let component: TopicsTabPage;
  let fixture: ComponentFixture<TopicsTabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicsTabPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TopicsTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
