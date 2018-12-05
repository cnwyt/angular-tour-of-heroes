# AngularTourOfHeroes

```
Angular CLI: 7.1.1
Node: 10.11.0
OS: darwin x64
Angular: 7.1.1
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. 
The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. 
You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.


ng generate module app-routing --flat --module=app

npm install spectre.css --save

### 修改 angular 配置文件

打开项目根目录 `angular.json` 配置文件:  

`architect > outputPath > options`: 

`outputPath`: 项目输出目录  
`assets`: 项目资源目录，存放项目资源文件，比如ico,images等  
`styles`: 项目样式文件.  
`scripts`: 项目js文件目录.   

```json
"architect": {
  "build": {
    "builder": "@angular-devkit/build-angular:browser",
    "options": {
        "outputPath": "dist/angular-tour-of-heroes",
        "index": "src/index.html",
        "main": "src/main.ts",
        "polyfills": "src/polyfills.ts",
        "tsConfig": "src/tsconfig.app.json",
        "assets": [
            "src/favicon.ico",
            "src/assets"
        ],
        "styles": [
            "node_modules/purecss/build/pure-min.css",
            "src/styles.css"
        ],
        "scripts": []
    },
  }
```

## 构建代码并部署到 Github Pages

使用`ng build` 命令可以构建项目

修改 `angular.json` 配置文件：
输出路径 `outputPath` 的值由 `dist/angular-tour-of-heroes` 修改为 `docs`。

```
$ ng build --prod --build-optimizer --base-href=/angular-tour-of-heroes/
```

在 Github > Settings 中，`` > 选择 "master branch /docs folder"， 并保存。

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## 参考链接

[Angular英文站](https://angular.io/)  
[Angular中文站](https://angular.cn/)  
[Angular CLI](https://github.com/angular/angular-cli)  



ng generate component pages/dashboard 
ng generate component pages/heroes
ng generate component pages/hero-detail
ng generate component pages/hero-search


ng generate service services/hero
ng generate service services/message
ng generate service services/InMemoryData

ng generate class models/hero

ng generate component pages/errors/PageNotFound

npm i faker

HTTP拦截器：

ng generate class http-interceptors/index
ng generate class http-interceptors/noop-interceptor
ng generate class http-interceptors/auth-interceptor  
ng generate class http-interceptors/logging-interceptor


ng generate class http-interceptors/caching-interceptor
ng generate service services/request-cache 