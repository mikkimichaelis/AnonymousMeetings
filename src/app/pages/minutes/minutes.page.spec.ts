import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MinutesPage } from './minutes.page';

describe('MinutesPage', () => {
  let component: MinutesPage;
  let fixture: ComponentFixture<MinutesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinutesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MinutesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
