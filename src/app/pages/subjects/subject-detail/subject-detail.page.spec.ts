import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubjectDetailPage } from './subject-detail.page';

describe('SubjectDetailPage', () => {
  let component: SubjectDetailPage;
  let fixture: ComponentFixture<SubjectDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
