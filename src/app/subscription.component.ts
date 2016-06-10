import {
  Component,
  Input,
  AfterViewChecked,
  OnInit,
  OnChanges,
  OnDestroy
} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'subscription',
  templateUrl: 'subscription.component.html'
})
export default class SubscriptionComponent implements OnInit, OnChanges, OnDestroy, AfterViewChecked {
  @Input() search: any;
  @Input() pusher;
  public tweets : Object[];
  private channel;
  private subscribed: boolean = false;
  private className: String;

  public ngOnInit() {
    this.subscribeToChannel();
    this.tweets = [];
    this.className = this.search.term.replace(' ', '-');
  }

  private subscribeToChannel() {
    this.channel = this.pusher.subscribe(btoa(this.search.term));
    this.channel.bind('new_tweet', (data) => {
      this.newTweet(data);
    });
    this.subscribed = true;
  }

  private newTweet(data: Object) {
    this.tweets.push(data);
  }
  
  public ngOnChanges() {
    console.log(this.search);
    if (!this.search.active && this.subscribed) {
      this.ngOnDestroy();
    } else if (this.search.active && !this.subscribed) {
      this.subscribeToChannel();
    }
  }

  public ngOnDestroy() {
    this.pusher.unsubscribe(btoa(this.search.term));
    this.channel && this.channel.unbind();
    this.subscribed = false;
  }

  public ngAfterViewChecked() {
    var listItem = document.querySelector(".channel-" + this.className);
    if (listItem) {
      listItem.scrollTop = listItem.scrollHeight;
    }
  }
}
