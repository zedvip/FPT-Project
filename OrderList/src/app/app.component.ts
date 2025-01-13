import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true, // Cần khai báo nếu sử dụng standalone
  imports: [RouterOutlet], // Đảm bảo import các component cần thiết
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Order-list';
}
