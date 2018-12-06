router-outlet-is-not-a-known-element.md

Angular执行测试报错: 'router-outlet' is not a known element

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

### 报错内容

使用 `ng serve` 运行应用，通过访问 `http://localhost:4200`，运行正常，未见报错。 

但是，执行 `ng test` 测试就报错，错误内容如下：

```
Chrome 72.0.3622 (Mac OS X 10.13.6) AppComponent should create the app FAILED
	'router-outlet' is not a known element:
	1. If 'router-outlet' is an Angular component, then verify that it is part of this module.
	2. If 'router-outlet' is a Web Component then add 'CUSTOM_ELEMENTS_SCHEMA' to the '@NgModule.schemas' of this component to suppress this message. ("
	<!-- <app-heroes></app-heroes> -->
	[ERROR ->]<router-outlet></router-outlet>
    ...
```

错误提示，执行测试用例创建 AppComponent 失败，应该是测试代码里没有引入路由模块。

### 解决办法

来自github用户 @mokipedia 的解决办法：

```js
For everyone else having this issue: in app.component.spec.ts

import {RouterTestingModule} from '@angular/router/testing'

add imports to TestBed

beforeEach(() => { 
    TestBed.configureTestingModule({ 
        declarations: [ AppComponent ], 
        imports: [ RouterTestingModule ] 
    })
})
```

在测试用例文件`app.component.spec.ts`的`beforeEach`部分引入模块 `RouterTestingModule`。
 
### 完整代码

文件 `app.component.spec.ts` 完整代码如下：

```js
// app.component.spec.ts
import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MessagesComponent } from './pages/messages/messages.component';
import { HeroSearchComponent } from './pages/hero-search/hero-search.component';

describe('AppComponent', () => {
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
});
```

更多内容，请查看项目代码：

https://github.com/cnwyt/angular-tour-of-heroes

[END]