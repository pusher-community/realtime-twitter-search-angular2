var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
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
        this.channel.bind('new_tweet', function (data) {
            console.log('got new tweet', data);
            this.newTweet(data);
        }.bind(this));
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
    ], SubscriptionComponent.prototype, "search");
    __decorate([
        angular2_1.Input(), 
        __metadata('design:type', Object)
    ], SubscriptionComponent.prototype, "pusher");
    SubscriptionComponent = __decorate([
        angular2_1.Component({
            selector: 'subscription',
            templateUrl: 'app/subscription.html',
            inputs: ['search', 'pusher'],
            directives: [angular2_1.CORE_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], SubscriptionComponent);
    return SubscriptionComponent;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SubscriptionComponent;
//# sourceMappingURL=subscription.js.map