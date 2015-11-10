import {
  Component,
  Input,
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
export default class SubscriptionComponent implements AfterViewChecked, OnDestroy, OnInit {
  @Input() search: string;
  @Input() pusher;
  public tweets : Object[];
  private channel;

  public onInit() {
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

  public onDestroy() {
    this.channel && this.channel.unbind();
  }

  public afterViewChecked() {
    var listItem = document.querySelector(".channel-" + this.search);
    if (listItem) {
      listItem.scrollTop = listItem.scrollHeight;
    }
  }
}
