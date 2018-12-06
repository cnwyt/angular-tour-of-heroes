ng-test-errors.md

Angular执行测试报错: NullInjectorError: No provider for HttpClient!

### 报错内容

使用 `ng serve` 运行应用，通过访问 `http://localhost:4200`，运行正常，未见报错。 但是，执行 `ng test` 测试就报错，错误内容如下：

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

### 错误原因: 

没有引入 HttpClientTestingModule 模块, 执行测试用例时找不到模块。

### 解决办法: 

在测试代码中，引入 `HttpClientTestingModule` 模块

```js
beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [ HeroSearchComponent ],
        imports:[ 
            RouterTestingModule, 
            HttpClientTestingModule, 
            FormsModule 
        ]
    }).compileComponents();
}));
``` 

### 修复后完整代码如下:

HeroeSearchComponent 测试文件: 

```js
// heros-search-component.spec.ts
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroSearchComponent } from './hero-search.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('HeroSearchComponent', () => {
  let component: HeroSearchComponent;
  let fixture: ComponentFixture<HeroSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroSearchComponent ],
      imports:[RouterTestingModule, HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

HeroService 测试文件: 

```js
// hero.service.spec.ts
import { TestBed } from '@angular/core/testing';

import { HeroService } from './hero.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('HeroService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ]
  }));

  it('should be created', () => {
    const service: HeroService = TestBed.get(HeroService);
    expect(service).toBeTruthy();
  });
});
```


更多内存，请查看项目代码：

https://github.com/cnwyt/angular-tour-of-heroes

[END]