import { Component, OnInit } from '@angular/core';
import { ICoursesListItem, ITranslateValue, ITranslateParams } from 'src/app/interfaces/courses-list-item.model';
import { CoursesListEntry } from 'src/app/modules/courses-page/entities/classes/courses-list-entry';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IAppState } from '../../state/manage-courses-list/manage-courses-list.selectors';
import { addCourse } from '../../state/manage-courses-list/manage-courses-list.actions';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { dateValidator } from '../../entities/validators/date-validator.directive';
import { durationValidator } from '../../entities/validators/duration-validator.directive';
import { CustomErrorStateMatcher } from '../../entities/classes/error-state-matcher';
import { authorsListValidator } from '../../entities/validators/authors-list-size.directive';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

const TRANSLATE_PARAMS = {
  RU: 'Добавить курс',
  EN: 'Add course'
};

@Component({
  selector: 'app-add-course-page',
  templateUrl: './add-course-page.component.html',
  styleUrls: ['./add-course-page.component.scss']
})
export class AddCoursePageComponent implements OnInit {
  public loaded = true;
  public editCourse: ICoursesListItem;
  public translateParams: ITranslateValue = { value: ''};
  public matcher = new CustomErrorStateMatcher();
  public titleControl = new FormControl('', [
      Validators.required,
      Validators.maxLength(50)
    ]);
  public descriptionControl = new FormControl('', [
      Validators.required,
      Validators.maxLength(500)
    ]);
  public creationDateControl = new FormControl('', [
      Validators.required,
      dateValidator
    ]);
  public durationControl = new FormControl('',
      [
        Validators.required,
        durationValidator
      ]);
  public authorsControl = new FormControl([],
      [
        Validators.required,
        authorsListValidator
      ]);
  public addCourseForm = new FormGroup({
    title: this.titleControl,
    description: this.descriptionControl,
    creationDate: this.creationDateControl,
    duration: this.durationControl,
    authors: this.authorsControl,
  });

  constructor(
    protected router: Router,
    protected store: Store<IAppState>,
    protected translate: TranslateService
  ) {
  }

  get title() { return this.addCourseForm.get('title'); }

  ngOnInit(): void {
    this.setTranslateParams(this.translate.defaultLang, TRANSLATE_PARAMS);
    this.editCourse = new CoursesListEntry(new Date().valueOf(), '', undefined, 0, '', false, []); // we'll make id a current date
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.setTranslateParams(event.lang, TRANSLATE_PARAMS);
    });
  }

  protected setTranslateParams(lang: string, params: ITranslateParams): void {
    switch (lang) {
        case 'en':
          this.translateParams.value = params.EN;
          break;
        case 'ru':
          this.translateParams.value = params.RU;
          break;
        default:
          break;
      }
  }

  handleTitleInput(value: string): void {
    this.addCourseForm.patchValue({
      ...this.addCourseForm,
      title: value
    });
  }

  handleDescriptionInput(value: string): void {
    this.addCourseForm.patchValue({
      ...this.addCourseForm,
      description: value
    });
  }

  protected calculateDate() {
    const currentDate = this.addCourseForm.value.creationDate;
    const currentValue = currentDate.split('/');
    return new Date(`${currentValue[1]}/${currentValue[0]}/${currentValue[2]}`);
  }

  handleSave(): void {
    const date = this.calculateDate();
    this.addCourseForm.patchValue({
      ...this.addCourseForm,
      creationDate: date
    });
    this.editCourse = {
      ...this.editCourse,
      ...this.addCourseForm.value
    };
    this.store.dispatch(addCourse({ course: this.editCourse }));
    this.router.navigate(['courses']);
  }

  handleCancel(): void {
    this.editCourse = undefined;
    this.router.navigate(['courses']);
  }

}
