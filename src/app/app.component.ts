import { Component } from '@angular/core';

// import the HttpClientModule symbol from @angular/common/http
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular Tour Of Heroes';
}
