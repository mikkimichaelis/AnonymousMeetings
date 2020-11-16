import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomeGroupPage } from './home-group.page';

describe('HomeGroupPage', () => {
  let component: HomeGroupPage;
  let fixture: ComponentFixture<HomeGroupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeGroupPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeGroupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
