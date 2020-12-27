import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MessagesTabPage } from './messages-tab.page';

describe('HomeTabPage', () => {
  let component: MessagesTabPage;
  let fixture: ComponentFixture<MessagesTabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessagesTabPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MessagesTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
