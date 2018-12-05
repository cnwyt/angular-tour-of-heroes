import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MessagesComponent } from './pages/messages/messages.component';
import { HeroSearchComponent } from './pages/hero-search/hero-search.component';

describe('AppComponent', () => {
  //  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent, MessagesComponent, HeroSearchComponent
      ],
      imports: [ 
        // fix errors:  'router-outlet' is not a known element
        RouterTestingModule,
        HttpClientTestingModule, 
      ] 
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  // it(`should have as title 'angular-tour-of-heroes'`, async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app.title).toEqual('angular-tour-of-heroes');
  // }));

  // it('should render title in a h1 tag', async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('Welcome to angular-tour-of-heroes!');
  // }));
});
