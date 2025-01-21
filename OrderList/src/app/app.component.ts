import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,  // Cần khai báo nếu sử dụng standalone
  imports: [RouterOutlet, HttpClientModule],  // Đảm bảo import các module cần thiết
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Order-list';
}
