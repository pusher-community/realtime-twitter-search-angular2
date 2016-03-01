"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var angular2_1 = require('angular2/angular2');
var SubscriptionComponent = (function () {
    function SubscriptionComponent() {
    }
    SubscriptionComponent.prototype.onInit = function () {
        this.subscribeToChannel();
        this.tweets = [];
    };
    SubscriptionComponent.prototype.subscribeToChannel = function () {
        var encoded = btoa(this.search);
        this.channel = this.pusher.subscribe(encoded);
        this.channel.bind('new_tweet', this.newTweet.bind(this));
    };
    SubscriptionComponent.prototype.newTweet = function (data) {
        this.tweets.push(data);
    };
    SubscriptionComponent.prototype.onDestroy = function () {
        this.channel && this.channel.unbind();
    };
    SubscriptionComponent.prototype.afterViewChecked = function () {
        var listItem = document.querySelector(".channel-" + this.search);
        if (listItem) {
            listItem.scrollTop = listItem.scrollHeight;
        }
    };
    __decorate([
        angular2_1.Input(), 
        __metadata('design:type', String)
    ], SubscriptionComponent.prototype, "search", void 0);
    __decorate([
        angular2_1.Input(), 
        __metadata('design:type', Object)
    ], SubscriptionComponent.prototype, "pusher", void 0);
    SubscriptionComponent = __decorate([
        angular2_1.Component({
            selector: 'subscription',
            templateUrl: 'src/app/subscription.html',
            inputs: ['search', 'pusher'],
            directives: [angular2_1.CORE_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], SubscriptionComponent);
    return SubscriptionComponent;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SubscriptionComponent;
//# sourceMappingURL=subscription.js.map