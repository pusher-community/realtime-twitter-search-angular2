declare var Pusher: any;

import {bootstrap} from '@angular/platform-browser-dynamic';
import {Component} from '@angular/core';

import SubscriptionComponent from './subscription.component';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html',
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
