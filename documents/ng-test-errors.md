ng-test-errors.md

在一个项目中，单元测试必不可少。今天在执行 angular 测试是报了一堆错误，现整理如下。

```js
$ ng test 
18:36:47.128:INFO [karma-server]: Karma v3.1.1 server started at http://0.0.0.0:9876/
18:36:47.130:INFO [launcher]: Launching browsers Chrome with concurrency unlimited
18:36:47.135:INFO [launcher]: Starting browser Chrome
18:37:00.299:WARN [karma]: No captured browser, open http://localhost:9876/     
18:37:00.553:INFO [Chrome 72.0.3622 (Mac OS X 10.13.6)]: 
Connected on socket n0mnv34p0_0a9wTkAAAA with id 90594167
// ... ...
// ... (这里是一大推错误提示) ...
// ... ...
Chrome 72.0.3622 (Mac OS X 10.13.6): 
Executed 22 of 22 (9 FAILED) (0.92 secs / 0.788 secs)
TOTAL: 9 FAILED, 13 SUCCESS
```

### 本机环境：

```js
$ ng --version
Angular CLI: 7.1.1
Node: 10.11.0
OS: darwin x64
Angular: 7.1.1
...（略）...
```

### 问题分析：

使用 `ng serve` 运行应用，通过访问 `http://localhost:4200`，都运行正常，未见报错。但是，执行 `ng test` 就提示一大推错误，这是为什么呢？

提示这个“不是已知元素”，哪个ngModel不是已知属性，可是在代码里已经都引入过了，为何还会这样报错呢?

最后发现，在应该代码里需要引入外，在测试代码(`*.spec.ts`)里也要再次引入相应的组件或模块。

具体错误提示与解决办法如下。

### 错误提示1: 'app-messages' is not a known element

错误详情:

```js
Chrome 72.0.3622 (Mac OS X 10.13.6) AppComponent should create the app FAILED
	'app-messages' is not a known element:
	1. If 'app-messages' is an Angular component, then verify that it is part of this module.
	2. If 'app-messages' is a Web Component then add 'CUSTOM_ELEMENTS_SCHEMA' to the '@NgModule.schemas' of this component to suppress this message. ("
	<router-outlet></router-outlet>
	[ERROR ->]<app-messages></app-messages>"): ng:///DynamicTestModule/AppComponent.html@22:0
```

错误原因: 没有引入提示的组件。比如本错误提示中，在AppComponent组件中，使用了app-messages 组件，但是并没有引入 app-messages 组件

解决办法: 引入相应的组件，比如 app-messages 组件

类似`XXX is not a known element`的错误还有很多，引入相应的组件即可:

比如，在 DashboardComponent 组件中，使用了 `app-hero-search` 组件模板，却没有引入 `HeroSearchComponent` 组件: 

```js
Chrome 72.0.3622 (Mac OS X 10.13.6) DashboardComponent should create FAILED
	'app-hero-search' is not a known element:
	1. If 'app-hero-search' is an Angular component, then verify that it is part of this module.
	2. If 'app-hero-search' is a Web Component then add 'CUSTOM_ELEMENTS_SCHEMA' to the '@NgModule.schemas' of this component to suppress this message. ("
	</div>
	[ERROR ->]<app-hero-search></app-hero-search>
	"): ng:///DynamicTestModule/DashboardComponent.html@12:0
```

修改后`dashboard.component.spec.ts`的`beforeEach`部分代码如下:

```js
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        DashboardComponent, 
        MessagesComponent, 
        HeroSearchComponent
      ],
      imports:[
        RouterTestingModule,
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  }));
```

### 错误提示2: Can't bind to 'ngModel' since it isn't a known property of 'input'

错误详情:

```js
Chrome 72.0.3622 (MacOSX 10.13.6) HeroeDetailComponent should create FAILED
  Can't bind to 'ngModel' since it isn't a known property of 'input'. ("
<div>
<label>name:
  <input [ERROR ->][(ngModel)]="heroDetail.name" placeholder="name"/>
</label>
</div>
"): ng:///DynamicTestModule/HeroDetailComponent.html@10:15
```

错误原因: 没有引入 FormsModule 模块

解决办法: 引入 FormsModule 模块


### 错误提示3: NullInjectorError: No provider for HttpClient!

错误详情:

```js
// HeroeSearchComponent
Chrome 72.0.3622 (Mac OS X 10.13.6) HeroeSearchComponent should create FAILED
	Error: StaticInjectorError(DynamicTestModule)[HttpClient]: 
	  StaticInjectorError(Platform: core)[HttpClient]: 
        NullInjectorError: No provider for HttpClient!
// HeroService
Chrome 72.0.3622 (Mac OS X 10.13.6) HeroService should be created FAILED
	Error: StaticInjectorError(DynamicTestModule)[HttpClient]: 
	  StaticInjectorError(Platform: core)[HttpClient]: 
	    NullInjectorError: No provider for HttpClient!
```

错误原因: 没有引入 HttpClientTestingModule 模块

解决办法: 在测试代码中，引入 HttpClientTestingModule 模块

```js
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

### 错误提示4:  

错误详情:

```js
// AppComponent
Chrome 72.0.3626 (Mac OS X 10.13.6) AppComponent should have as title 'angular-tour-of-heroes' FAILED
    Expected 'Angular Tour Of Heroes' to equal 'angular-tour-of-heroes'.

// AppComponent
Chrome 72.0.3626 (Mac OS X 10.13.6) AppComponent should render title in a h1 tag FAILED
Failed: Cannot read property 'textContent' of null
```

错误原因: 修改了模板，没有同步修改测试用例，导致测试用例与模板展示内容不匹配(预期结果与实际结果不匹配), 这正是单元测试要测试的内容。

解决办法: 修改相应模板或测试用例，使其符合预期。


更多内容，请查看项目代码：

https://github.com/cnwyt/angular-tour-of-heroes

[END]