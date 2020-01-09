import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectorRef } from '@angular/core';
import { LoadingBlockService } from './services/loading-block/loading-block.service';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

describe('AppComponent', () => {
  // let loadingBlockService: LoadingBlockService;
  let loadingBlockServiceStub: Partial<LoadingBlockService>;
  let translateServiceStub: Partial<TranslateService>;
  beforeEach(async(() => {
    loadingBlockServiceStub = {
      displayed: new BehaviorSubject(false),
      toggleLoading(value: boolean): void {
        this.displayed.next(value);
      }
    };
    translateServiceStub = {
      defaultLang: '',
      setDefaultLang(lang: string): void {
        this.defaultLang = lang;
      }
    };
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [{ provide: LoadingBlockService, useValue: loadingBlockServiceStub },
      {provide: ChangeDetectorRef, useValue: {}},
      {provide: TranslateService, useValue: translateServiceStub}],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'angular-hometask'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('angular-hometask');
  });

  it(`should set default lang as 'en'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.translate.defaultLang).toEqual('en');
  });
});
