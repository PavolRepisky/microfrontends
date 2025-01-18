import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private eventListeners: Map<string, Set<(data: any) => void>> = new Map();

  emit(eventName: string, data: any) {
    const customEvent = new CustomEvent(eventName, {
      detail: data,
      bubbles: true,
      composed: true, // Allows event to cross shadow DOM boundaries
    });

    window.dispatchEvent(customEvent);
  }

  on(eventName: string, callback: (data: any) => void) {
    if (!this.eventListeners.has(eventName)) {
      this.eventListeners.set(eventName, new Set());
    }
    this.eventListeners.get(eventName)?.add(callback);

    const windowListener = (event: CustomEvent) => callback(event.detail);
    window.addEventListener(eventName, windowListener as EventListener);

    // Return cleanup function
    return () => {
      this.eventListeners.get(eventName)?.delete(callback);
      window.removeEventListener(eventName, windowListener as EventListener);
    };
  }
}
