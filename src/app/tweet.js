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
var TweetComponent = (function () {
    function TweetComponent() {
    }
    TweetComponent.prototype.onInit = function () {
        this.userName = this.tweet.user.screen_name;
        this.text = this.tweet.text;
    };
    __decorate([
        angular2_1.Input(), 
        __metadata('design:type', Object)
    ], TweetComponent.prototype, "tweet");
    TweetComponent = __decorate([
        angular2_1.Component({
            selector: 'tweet',
            templateUrl: 'app/tweet.html'
        }), 
        __metadata('design:paramtypes', [])
    ], TweetComponent);
    return TweetComponent;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TweetComponent;
//# sourceMappingURL=tweet.js.map