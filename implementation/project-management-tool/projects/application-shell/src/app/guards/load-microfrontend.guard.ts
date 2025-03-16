import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { MicrofrontendRegistryService } from '../services/microfrontend-registry.service';

@Injectable({ providedIn: 'root' })
export class LoadMicrofrontendGuard implements CanActivate {
  constructor(private mfeRegistryService: MicrofrontendRegistryService) {}

  async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    try {
      const bundleUrl = this.getBundleUrl(route);
      await this.mfeRegistryService.loadBundle(bundleUrl);
      return true;
    } catch (error) {
      console.error('Failed to load microfrontend:', error);
      return false;
    }
  }

  private getBundleUrl(route: ActivatedRouteSnapshot): string {
    const bundleUrl = route.data['bundleUrl'];
    if (typeof bundleUrl !== 'string') {
      throw new Error(
        'LoadMicrofrontendGuard requires a bundleUrl string in the route data. ' +
          'Please add data: { bundleUrl: "http://your-bundle-url" } to your route configuration. ' +
          'Example: { path: "**", canActivate: [LoadMicrofrontendGuard], data: { bundleUrl: "http://localhost:4201/bundle.js" } }'
      );
    }
    return bundleUrl;
  }
}
