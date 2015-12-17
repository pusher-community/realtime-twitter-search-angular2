declare var Pusher: any;

import {bootstrap} from 'angular2/platform/browser';
import {Component} from 'angular2/core';

import SubscriptionComponent from './subscription';

@Component({
  selector: 'my-app',
  templateUrl: 'src/app/app.html',
  directives: [SubscriptionComponent],
})
class AppComponent {
  private newSearchTerm: string;
  private pusher;
  private channels: any[];

  constructor() {
    this.pusher = new Pusher('9fd1b33fcb36d968145f');
    this.channels = [];
  }

  public newSubscription() {
    this.channels.push({term: this.newSearchTerm, active: true});
    this.newSearchTerm = '';
  }

  public clearSearch(channel) {
    this.channels = this.channels.filter((ch) => {
      if (ch.term === channel.term) {
        this.toggleSearch(channel);
      }
      return ch.term !== channel.term;
    });
  }
  public toggleSearch(channel) {
    for (let ch of this.channels) {
      if (ch.term === channel.term) {
        ch.active = !ch.active;
        break;
      }
    }
  }
}

bootstrap(AppComponent);
