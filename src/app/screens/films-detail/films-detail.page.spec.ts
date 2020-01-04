import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FilmsDetailPage } from './films-detail.page';

describe('FilmsDetailPage', () => {
  let component: FilmsDetailPage;
  let fixture: ComponentFixture<FilmsDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilmsDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FilmsDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
