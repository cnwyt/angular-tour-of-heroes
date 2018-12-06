Cant-bind-to-formGroup-since-it-isnt-a-known-property-of-form

Angular报错问题：Can't bind to 'formGroup' since it isn't a known property of 'form'

### 报错提示：

```js
Uncaught Error: Template parse errors:
Can't bind to 'formGroup' since it isn't a known property of 'form'. ("</p>
<form [ERROR ->][formGroup]="loginForm">
  <label>
"): ng:///AppModule/LoginComponent.html@7:6
```

### 问题原因： 

没有导入表单模块 `FormsModule`。

### 解决办法:

从 `@angular/forms` 中导入 `ReactiveFormsModule` 模块。

```js
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
```

### 修改后代码实例

组件LoginComponent(`login.component.ts`)代码如下： 

```js
import { Component }   from '@angular/core';
import { Router }      from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  message: string;
  public userId: number = 0;
  public storeId: number = 0;

  constructor(
    private fb: FormBuilder,
    public router: Router
  ) {
    this.setMessage();
  }

  loginForm = this.fb.group({
    username: ['', Validators.required],
    userpass: ['', Validators.required],
    captcha:  [''],
  });

  onLogin() {
    console.log(this.loginForm)
  }
}
```

Login模板 `login.component.html` 代码：

```html
<form [formGroup]="loginForm">
  <label>
    account: <input type="text" formControlName="username">
  </label>
  <label>
    password: <input type="text" formControlName="userpass">
  </label>
  <button type="button" (click)="onLogin()" [disabled]="!loginForm.valid">Submit</button>
</form>
```

项目入口模块 `app.module.ts` 代码如下：

```js
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
// 引入表单模块
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    DashboardComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    UsersModule,
    // 导入表单模块
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### 参考链接：

https://stackoverflow.com/questions/39152071/cant-bind-to-formgroup-since-it-isnt-a-known-property-of-form

更多内容，请查看项目代码：

https://github.com/cnwyt/angular-tour-of-heroes

[END]
