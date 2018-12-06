ng-test-errors.md

Angular执行测试报错: 'app-messages' is not a known element

### 本机环境：

```js
$ ng --version
Angular CLI: 7.1.1
Node: 10.11.0
OS: darwin x64
Angular: 7.1.1
```

### 错误详情:

```js
Chrome 72.0.3622 (Mac OS X 10.13.6) AppComponent should create the app FAILED
	'app-messages' is not a known element:
	1. If 'app-messages' is an Angular component, then verify that it is part of this module.
	2. If 'app-messages' is a Web Component then add 'CUSTOM_ELEMENTS_SCHEMA' to the '@NgModule.schemas' of this component to suppress this message. ("
	<router-outlet></router-outlet>
	[ERROR ->]<app-messages></app-messages>"): ng:///DynamicTestModule/AppComponent.html@22:0
```

### 问题分析：

使用 `ng serve` 运行应用，通过访问 `http://localhost:4200`，都运行正常，未见报错。但是，执行 `ng test` 就提示一大推错误，这是为什么呢？

提示这个“不是已知元素”，一般是没有引入组件，可是在代码里已经都引入过了，为何还会这样报错呢?

最后发现，在应用代码里需要引入外，在测试代码(`*.spec.ts`)里也要再次引入相应的组件或模块。

比如上边例子中，在`AppComponent`组件中，使用了 `app-messages` 组件模板，但是并没有引入 app-messages 组件（MessagesComponent）。


### 解决办法: 

引入相应的组件。

类似`XXX is not a known element`的错误还有很多，引入相应的组件即可。

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

### 修复后代码:

修改后 `dashboard.component.spec.ts` 的 `beforeEach` 部分代码如下:

```js
// dashboard.component.spec.ts 
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
 
更多内容，请查看项目代码：

https://github.com/cnwyt/angular-tour-of-heroes

[END]