import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SecretaryTabPage } from './secretary-tab.page';

describe('SecretaryTabPage', () => {
  let component: SecretaryTabPage;
  let fixture: ComponentFixture<SecretaryTabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecretaryTabPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SecretaryTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
