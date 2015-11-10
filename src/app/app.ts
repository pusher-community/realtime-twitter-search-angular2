declare var Pusher: any;

import {
  Component,
  Attribute,
  bootstrap,
  FORM_DIRECTIVES,
  CORE_DIRECTIVES
} from 'angular2/angular2';

import SubscriptionComponent from './subscription';

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.html',
  directives: [FORM_DIRECTIVES, CORE_DIRECTIVES, SubscriptionComponent],
})
class AppComponent {
  private newSearchTerm: string;
  private pusher;
  private channels: String[];

  constructor() {
    this.pusher = new Pusher('9fd1b33fcb36d968145f');
    this.channels = [];
  }

  public newSubscription() {
    this.channels.push(this.newSearchTerm);
    this.newSearchTerm = '';
  }

  public clearSearch(channel) {
    this.channels = this.channels.filter(function(ch) {
      return ch !== channel;
    });
  }
  public stopSearch(channel) {
    this.pusher.unsubscribe(btoa(channel));
  }
}

bootstrap(AppComponent);
