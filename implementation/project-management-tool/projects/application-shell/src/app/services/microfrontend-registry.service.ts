import { Injectable } from '@angular/core';

interface BundleLoadError {
  error: string;
}

enum LoadingState {
  UNKNOWN = 'UNKNOWN',
  LOADING = 'LOADING', 
  LOADED = 'LOADED',
  FAILED = 'FAILED'
}

/**
 * Loads a JavaScript bundle by injecting a script tag into the document.
 * Returns a promise that resolves when the bundle loads or rejects if there's an error.
 */
function loadBundle(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    script.onload = () => resolve();
    script.onerror = () => reject({
      error: `Bundle ${url} could not be loaded`
    } as BundleLoadError);
    document.body.appendChild(script);
  });
}

/**
 * Service responsible for loading and managing microfrontend bundles.
 * Tracks bundle loading states and prevents duplicate loading.
 */
@Injectable({ providedIn: 'root' })
export class MicrofrontendRegistryService {
  private readonly bundleStates = new Map<string, LoadingState>();

  /**
   * Loads a microfrontend bundle if not already loaded.
   * @param bundleUrl - URL of the bundle to load
   * @returns Promise resolving to true if bundle loaded successfully, false otherwise
   */
  async loadBundle(bundleUrl: string): Promise<boolean> {
    const currentState = this.getLoadingState(bundleUrl);
    
    if (currentState === LoadingState.LOADED || currentState === LoadingState.LOADING) {
      return true;
    }

    this.bundleStates.set(bundleUrl, LoadingState.LOADING);

    try {
      await loadBundle(bundleUrl);
      this.bundleStates.set(bundleUrl, LoadingState.LOADED);
      return true;
    } catch (error) {
      this.bundleStates.set(bundleUrl, LoadingState.FAILED);
      return false;
    }
  }

  /**
   * Gets the current loading state of a bundle.
   * @param bundleUrl - URL of the bundle to check
   */
  getLoadingState(bundleUrl: string): LoadingState {
    return this.bundleStates.get(bundleUrl) || LoadingState.UNKNOWN;
  }

  /**
   * Checks if a bundle has been successfully loaded.
   * @param bundleUrl - URL of the bundle to check
   */
  isBundleLoaded(bundleUrl: string): boolean {
    return this.getLoadingState(bundleUrl) === LoadingState.LOADED;
  }
}
