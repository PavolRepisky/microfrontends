import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-angular-element',
  templateUrl: './angular-element.component.html',
  styleUrls: ['./angular-element.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class AngularElementComponent implements OnInit, OnDestroy {
  @Input() message: string | undefined;
  isSpeaking: boolean = false;
  speakDuration: number = 2000;
  reactMessage: string | undefined;
  inputValue: string = '';
  buttonDisabled: boolean = true;

  private helloEventListener: EventListener | null = null;

  playSpeakAnimation() {
    this.isSpeaking = true;
    setTimeout(() => {
      this.isSpeaking = false;
    }, this.speakDuration);
  }

  handleButtonClick() {
    if (this.inputValue.trim() !== '') {
      this.playSpeakAnimation();
      setTimeout(() => {
        const event = new CustomEvent('🗣️⚛️', {
          detail: this.inputValue,
        });
        document.dispatchEvent(event);
        this.inputValue = '';
      }, this.speakDuration);
    }
  }

  handleInputChange(event: any) {
    this.inputValue = event.target.value;
    this.buttonDisabled = this.inputValue.trim() === '';
  }

  ngOnInit(): void {
    this.helloEventListener = (event: any) => {
      this.reactMessage = event.detail;
    };
    document.addEventListener('🗣️🅰️', this.helloEventListener);
  }

  ngOnDestroy(): void {
    if (this.helloEventListener) {
      document.removeEventListener('🗣️🅰️', this.helloEventListener);
    }
  }
}
