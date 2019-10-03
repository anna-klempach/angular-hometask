import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-course-page',
  templateUrl: './add-course-page.component.html',
  styleUrls: ['./add-course-page.component.scss']
})
export class AddCoursePageComponent implements OnInit {
  // consider creating an instance of CourseListItem, think it over later
  public title: string; // need to make checks on the input data
  public description: string;
  public duration: number;
  public date: string;
  constructor() { }

  ngOnInit() {
  }

  handleTitleInput(value: string): void {
    this.title = value;
    console.log(this.title);
  }

  handleDescriptionInput(value: string): void {
    this.description = value;
    console.log(this.description);
  }

  handleDateInput(value: string): void { // string for now
    this.date = value;
  }

  handleDurationInput(value: string): void {
    const inputDuration = +value;
    if (inputDuration && typeof inputDuration === 'number' && inputDuration >= 0) {
      this.duration = inputDuration;
      console.log(this.duration);
    }
  }

  handleSave() {
    console.log(`Current data input is ${this.title}, ${this.description}, ${this.duration}, ${this.date}`);
  }

  handleCancel() {
    this.title = '';
    this.description = '';
    this.duration = 0;
    this.date = '';
    console.log('Cancel has been clicked.');
  }

}
