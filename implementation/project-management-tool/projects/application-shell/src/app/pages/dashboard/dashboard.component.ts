import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MicrofrontendRegistryService } from '../../services/microfrontend-registry.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DashboardComponent {
  constructor(private mfeRegistry: MicrofrontendRegistryService) {}

  async ngOnInit() {
    const mfeBundles = [
      'http://localhost:4201/bundle.js',
      'http://localhost:4202/bundle.js',
    ];

    try {
      const results = await Promise.all(
        mfeBundles.map((url) => this.mfeRegistry.loadBundle(url))
      );

      if (!results.every((result) => result === true)) {
        console.error('Some microfrontends failed to load');
      }
    } catch (error) {
      console.error('Error loading microfrontends:', error);
    }
  }
}
