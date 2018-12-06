error-TS2580-Cannot-find-name-require

Angular报错引入faker类库: error TS2580: Cannot find name 'require'. 


`faker` 是生成测试数据的一个js类库。 

在 InMemoryDataService 中调用 fake 类库，可以生成不同的英雄姓名。但是，在引入 `fake` 类时却报错了，这是为什么呢？

### 报错详情

```js
ERROR in src/app/services/in-memory-data.service.ts(6,13): 
error TS2580: Cannot find name 'require'. 
Do you need to install type definitions for node? 
Try `npm i @types/node`.
```

原因是在 `ts` 中无法调用 `js` 的 `require` 语法。

### 解决办法:

在使用 `require` 语法前增加一个声明“declare const require: any”。 

```js
declare const require: any; // <-- 新增
const faker = require('faker');
```

可以看下在Angular项目根目录的 `test.ts` 文件, 就有这个用法。

```js
// test.ts
import 'zone.js/dist/zone-testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

// <---- 这里有声明 require
declare const require: any;
// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);
// Then we find all the tests.
const context = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);
```

### 完整代码如下：

```js
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from '../models/hero';
import { Injectable } from '@angular/core';

declare const require: any;  // <-- 新增
const faker = require('faker');

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 11, name: faker.name.findName() },
      { id: 12, name: faker.name.findName() },
      { id: 13, name: faker.name.findName() },
      { id: 14, name: faker.name.findName() },
      { id: 15, name: faker.name.findName() },
      { id: 16, name: faker.name.findName() },
      { id: 17, name: faker.name.findName() },
      { id: 18, name: faker.name.findName() },
      { id: 19, name: faker.name.findName() },
      { id: 20, name: faker.name.findName() },
    ];

    const nobodies: any[] = [ ];

    // entities with string ids that look like numbers
    const stringers = [
      { id: '10', name: 'Bob String'},
      { id: '20', name: 'Jill String'}
    ];

    const db = { heroes, nobodies, stringers };

    return db;
  }
  
  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? 
      Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
}
```

### 参考链接：

https://angular.io/tutorial/toh-pt6  
http://www.cnblogs.com/htoooth/p/6942080.html  
https://www.npmjs.com/package/faker  


更多内容，请查看项目代码：

https://github.com/cnwyt/angular-tour-of-heroes

[END]