import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from 'src/app/modules/courses-page/services/courses/courses.service';
import { ICoursesListItem, ITranslateValue } from '../../../../interfaces/courses-list-item.model';
import { CoursesListEntry } from '../../entities/classes/courses-list-entry';
import { Store } from '@ngrx/store';
import { IAppState } from '../../state/manage-courses-list/manage-courses-list.selectors';
import { editCourse } from '../../state/manage-courses-list/manage-courses-list.actions';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { dateValidator } from '../../entities/validators/date-validator.directive';
import { durationValidator } from '../../entities/validators/duration-validator.directive';
import { authorsListValidator } from '../../entities/validators/authors-list-size.directive';
import { CustomErrorStateMatcher } from '../../entities/classes/error-state-matcher';
import { AddCoursePageComponent } from '../add-course-page/add-course-page.component';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

const TRANSLATE_PARAMS = {
  RU: 'Редактировать курс',
  EN: 'Edit course'
};

@Component({
  selector: 'app-course',
  templateUrl: '../add-course-page/add-course-page.component.html',
  styleUrls: ['../add-course-page/add-course-page.component.scss']
})
export class CourseComponent extends AddCoursePageComponent implements OnInit {
  public course: ICoursesListItem;
  public isLoaded = false;
  public editCourse: CoursesListEntry;
  public addCourseForm: FormGroup;
  public translateParams: ITranslateValue = {value: ''};
  public matcher = new CustomErrorStateMatcher();

  constructor(
    private route: ActivatedRoute,
    protected router: Router,
    private service: CoursesService,
    protected store: Store<IAppState>,
    protected translate: TranslateService
  ) {
    super(router, store, translate);
  }

  ngOnInit(): void {
    this.setTranslateParams(this.translate.defaultLang, TRANSLATE_PARAMS);
    const id = this.route.snapshot.paramMap.get('id');
    this.isLoaded = false;
    this.service.getItem(+id)
      .subscribe(courses => {
        this.isLoaded = true;
        this.course = courses[0];
        this.editCourse = { ...this.course };
        this.addCourseForm = new FormGroup({
          title: new FormControl(
            this.course.title, [
            Validators.required,
            Validators.maxLength(50)
          ]),
          description: new FormControl(this.course.description, [
            Validators.required,
            Validators.maxLength(500)
          ]),
          creationDate: new FormControl(this.formatDate(), [
            Validators.required,
            dateValidator
          ]),
          duration: new FormControl(this.course.duration,
            [
              Validators.required,
              durationValidator
            ]),
          authors: new FormControl(this.course.authors,
            [
              Validators.required,
              authorsListValidator
            ]),
        });
        this.isLoaded = true;
      });
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.setTranslateParams(event.lang, TRANSLATE_PARAMS);
    });
  }

  private formatDate(): string {
    const date = new Date(this.course.creationDate);
    return date.toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    });
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
    this.store.dispatch(editCourse({ course: this.editCourse }));
    this.router.navigate(['courses']);
  }
}
