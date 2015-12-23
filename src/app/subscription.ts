import {
  Component,
  Input,
  AfterViewChecked,
  OnInit,
  OnDestroy,
} from 'angular2/core';

@Component({
  selector: 'subscription',
  templateUrl: 'src/app/subscription.html'
})
export default class SubscriptionComponent implements OnInit, OnDestroy, AfterViewChecked {
  @Input() search: any;
  @Input() pusher;
  public tweets : Object[];
  private channel;
  private subscribed: boolean = false;

  public ngOnInit() {
    this.subscribeToChannel();
    this.tweets = [];
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
  
  // TODO: bring back when working correctly (see bottom of ngAfterViewChecked)
  // This should fire anytime bindings are modified from AppComponent but it's not
  // Don't have time to debug at moment, but fix if you can :)
  // public ngOnChanges() {
  //   console.log(this.search);
  //   if (!this.search.active && this.subscribed) {
  //     this.ngOnDestroy();
  //   } else if (this.search.active && !this.subscribed) {
  //     this.subscribeToChannel();
  //   }
  // }

  public ngOnDestroy() {
    this.pusher.unsubscribe(btoa(this.search.term));
    this.channel && this.channel.unbind();
    this.subscribed = false;
  }

  public ngAfterViewChecked() {
    var listItem = document.querySelector(".channel-" + this.search.term);
    if (listItem) {
      listItem.scrollTop = listItem.scrollHeight;
    }
    
    // TODO: Remove when ngOnChanges above works properly
    // Not sure why ngOnChanges is not working right now
    if (!this.search.active && this.subscribed) {
      this.ngOnDestroy();
    } else if (this.search.active && !this.subscribed) {
      this.subscribeToChannel();
    }
    
  }
}
