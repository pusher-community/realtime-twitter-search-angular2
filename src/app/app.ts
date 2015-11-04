declare var Pusher: any;
import {
  Component,
  Attribute,
  Input,
  bootstrap,
  FORM_DIRECTIVES,
  CORE_DIRECTIVES,
  AfterViewChecked,
  OnInit,
  OnDestroy,
} from 'angular2/angular2';

@Component({
  selector: 'subscription',
  templateUrl: 'app/subscription.html',
  inputs: ['search', 'pusher'],
  directives: [CORE_DIRECTIVES]
})
class SubscriptionComponent implements AfterViewChecked, OnDestroy, OnInit {
  @Input() search: string;
  @Input() pusher;
  public tweets : Object[];
  private channel;

  onInit() {
    this.subscribeToChannel();
    this.tweets = [];
  }

  private subscribeToChannel() {
    var encoded = btoa(this.search);
    this.channel = this.pusher.subscribe(encoded);
    this.channel.bind('new_tweet', function(data) {
      console.log('got new tweet', data);
      this.newTweet(data);
    }.bind(this));
  }

  private newTweet(data: Object) {
    this.tweets.push(data);
  }

  onDestroy() {
    this.channel && this.channel.unbind();
  }

  afterViewChecked() {
    var listItem = document.querySelector(".channel-" + this.search);
    if (listItem) {
      listItem.scrollTop = listItem.scrollHeight;
    }
  }
}

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

  public newSubscription(event) {
    this.channels.push(this.newSearchTerm);
    this.newSearchTerm = '';
    return false;
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
