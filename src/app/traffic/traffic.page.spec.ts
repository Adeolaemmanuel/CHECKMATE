import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TrafficPage } from './traffic.page';

describe('TrafficPage', () => {
  let component: TrafficPage;
  let fixture: ComponentFixture<TrafficPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrafficPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TrafficPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
