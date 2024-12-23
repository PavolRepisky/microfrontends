import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { MicrofrontendRegistryService } from '../services/microfrontend-registry.service';

@Injectable({ providedIn: 'root' })
export class LoadMicrofrontendGuard implements CanActivate {
  constructor(
    private microfrontendRegistryService: MicrofrontendRegistryService
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    const bundleUrl = route.data['bundleUrl'] as unknown;
    if (!(typeof bundleUrl === 'string')) {
      console.error(`
        The LoadMicroFrontendGuard is missing information on which bundle to load.
        Did you forget to provide a bundleUrl: string as data to the route?
      `);
      return Promise.resolve(false);
    }
    return this.microfrontendRegistryService.loadBundle(bundleUrl);
  }
}
