import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDialogComponent } from './modal-dialog.component';
import { TranslateService } from '@ngx-translate/core';

describe('ModalDialogComponent', () => {
  let component: ModalDialogComponent;
  let fixture: ComponentFixture<ModalDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModalDialogComponent],
      providers: [{provide: TranslateService, useValue: {}}],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
