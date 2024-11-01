import { Component } from '@angular/core';

@Component({
  selector: 'app-mfe-placeholder',
  standalone: true,
  imports: [],
  templateUrl: './mfe-placeholder.component.html',
  styleUrl: './mfe-placeholder.component.scss',
})
export class MfePlaceholderComponent {
  title = '<RENDERED BY MICROFRONTEND/>';
}
