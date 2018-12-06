
cant-bind-to-ngModel-since-it-isnt-a-known-property-of-input.md

Angular执行测试报错: Can't bind to 'ngModel' since it isn't a known property of 'input'

### 本机环境：

```
$ ng --version
Angular CLI: 7.1.1
Node: 10.11.0
OS: darwin x64
Angular: 7.1.1
... animations, cli, common, compiler, compiler-cli, core, forms
... http, language-service, platform-browser
... platform-browser-dynamic, router

Package                           Version
-----------------------------------------------------------
@angular-devkit/architect         0.10.6
@angular-devkit/build-angular     0.10.6
@angular-devkit/build-optimizer   0.10.6
@angular-devkit/build-webpack     0.10.6
@angular-devkit/core              7.0.6
@angular-devkit/schematics        7.1.1
@ngtools/webpack                  7.0.6
@schematics/angular               7.1.1
@schematics/update                0.11.1
rxjs                              6.3.3
typescript                        3.1.6
webpack                           4.19.1
```

### 报错详情：

执行 `ng test` 报错，错误内容如下：

```
Chrome 72.0.3622 (MacOSX 10.13.6) HeroeDetailComponent should create FAILED
  Can't bind to 'ngModel' since it isn't a known property of 'input'. ("
<div>
<label>name:
  <input [ERROR ->][(ngModel)]="heroDetail.name" placeholder="name"/>
</label>
</div>
"): ng:///DynamicTestModule/HeroDetailComponent.html@10:15
```

使用 `ng serve` 运行应用，通过访问 `http://localhost:4200`,都一切正常。 
为何在执行测试用例会报错呢？

查看 `app.module.ts`文件，已经导入了表单模块：

```
@NgModule({
  declarations: [ ... ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

在 `app.module.ts` 中已经都引入了表单模块  `FormsModule`，所以访问应用都正常。但是测试执行测试用例时，没有找到表单模块。

### 解决办法：

解决办法，在测试用例文件`hero-detail.component.spec.ts`的`beforeEach`部分，引入表单模块 `FormsModule` :

```
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroDetailComponent ],
      imports:[ 
        RouterTestingModule, 
        HttpClientTestingModule, 
        FormsModule 
      ]
    }).compileComponents();
  }));
```

### 完整代码如下：

```js
// hero-detail.component.spec.ts`
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroDetailComponent } from './hero-detail.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

describe('HeroeDetailComponent', () => {
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroDetailComponent ],
      imports:[ 
        RouterTestingModule, 
        HttpClientTestingModule, 
        FormsModule 
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

更多内容，请查看项目代码：

https://github.com/cnwyt/angular-tour-of-heroes

[END]