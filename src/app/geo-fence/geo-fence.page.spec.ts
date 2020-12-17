import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GeoFencePage } from './geo-fence.page';

describe('GeoFencePage', () => {
  let component: GeoFencePage;
  let fixture: ComponentFixture<GeoFencePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeoFencePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GeoFencePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
