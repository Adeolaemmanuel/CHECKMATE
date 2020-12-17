import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FpasswordPage } from './fpassword.page';

describe('FpasswordPage', () => {
  let component: FpasswordPage;
  let fixture: ComponentFixture<FpasswordPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FpasswordPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FpasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
