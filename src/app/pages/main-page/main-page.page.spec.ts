import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainPagePage } from './main-page.page';

describe('MainPagePage', () => {
  let component: MainPagePage;
  let fixture: ComponentFixture<MainPagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
