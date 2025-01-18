import { Injectable } from '@angular/core';
import { Events } from '../types/event.types';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  // Events Listeners
  onTaskSelected(callback: (data: { taskId: number }) => void) {
    return this.on(Events.TASK_SELECTED, callback);
  }
  onTaskUnselected(callback: () => void) {
    return this.on(Events.TASK_UNSELECTED, callback);
  }
  onUserSelected(callback: (data: { userId: number }) => void) {
    return this.on(Events.USER_SELECTED, callback);
  }
  onUserUnselected(callback: () => void) {
    return this.on(Events.USER_UNSELECTED, callback);
  }

  // Event Emitters
  emitUserSelected(userId: number) {
    this.emit(Events.USER_SELECTED, { userId: userId });
  }
  emitUserUnselected() {
    this.emit(Events.USER_UNSELECTED, undefined);
  }

  private emit(eventName: string, data: any) {
    const customEvent = new CustomEvent(eventName, {
      detail: data,
      bubbles: true,
      composed: true,
    });

    window.dispatchEvent(customEvent);
  }

  private on(eventName: string, callback: (data: any) => void) {
    const windowListener = (event: CustomEvent) => callback(event.detail);
    window.addEventListener(eventName, windowListener as EventListener);

    return () => {
      window.removeEventListener(eventName, windowListener as EventListener);
    };
  }
}
