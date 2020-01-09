import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ILanguage } from 'src/app/interfaces/language.model';
import { MatSelectChange } from '@angular/material/select';

const LANGUAGES = [
  {
    value: 'en',
    viewValue: 'English'
  },
  {
    value: 'ru',
    viewValue: 'Русский'
  }
];

@Component({
  selector: 'app-language-select',
  templateUrl: './language-select.component.html',
  styleUrls: ['./language-select.component.scss']
})
export class LanguageSelectComponent {
  public languages: ILanguage[] = LANGUAGES;
  constructor(private translate: TranslateService) { }

  handleChange(event: MatSelectChange) {
    this.translate.use(event.value);
  }

}
