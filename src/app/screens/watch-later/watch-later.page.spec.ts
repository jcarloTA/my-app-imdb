import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WatchLaterPage } from './watch-later.page';

describe('WatchLaterPage', () => {
  let component: WatchLaterPage;
  let fixture: ComponentFixture<WatchLaterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WatchLaterPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WatchLaterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
