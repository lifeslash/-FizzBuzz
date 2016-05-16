function botTest(){
  postTweet("認証テスト");
}

var CONSUMER_KEY = '********************';
var CONSUMER_SECRET = '*******************************************************';
var PROJECT_KEY = '********************';

function listTweets() {
  var service = getTwitterService();
  if (service.hasAccess()) {
    var url = 'https://api.twitter.com/1.1/statuses/user_timeline.json';
    var response = service.fetch(url);
    var tweets = JSON.parse(response.getContentText());
    for (var i = 0; i < tweets.length; i++) {
      Logger.log(tweets[i].text);
    }
  } else {
    var authorizationUrl = service.authorize();
    Logger.log('Please visit the following URL and then re-run the script: ' + authorizationUrl);
  }
}

function postTweet(text) {
  var service = getTwitterService();
  var encodedTweet = encodeURIComponent(text);
  Logger.log(encodedTweet);
  if (service.hasAccess()) {
    var url = 'https://api.twitter.com/1.1/statuses/update.json?status='+encodedTweet;
    var options =
        {"method" : "POST",
         "oAuthUseToken" : "always"
        };
    var response = service.fetch(url,options);
    var o = JSON.parse(response.getContentText());
    Logger.log(o);
  } else {
    var authorizationUrl = service.authorize();
    Logger.log('Please visit the following URL and then re-run the script: ' + authorizationUrl);
  }
}

function getTwitterService() {
  var service = OAuth1.createService('twitter');
  //UrlFetchApp.addOAuthService()の代わりにサービスを作成する
  service.setAccessTokenUrl('https://api.twitter.com/oauth/access_token')
  service.setRequestTokenUrl('https://api.twitter.com/oauth/request_token')
  service.setAuthorizationUrl('https://api.twitter.com/oauth/authorize')
  service.setConsumerKey(CONSUMER_KEY);
  service.setConsumerSecret(CONSUMER_SECRET);
  service.setProjectKey(PROJECT_KEY);
  service.setCallbackFunction('authCallback');
  //コールバック関数の名前をセットすること
  service.setPropertyStore(PropertiesService.getScriptProperties());
  //開発者のみがOAuth認証をし、使用者はそれを共有するOAuthConfigとは違い、
  //このライブラリはどんなユーザーでもスクリプトのOAuth認証を行え、開発者はどのように認証が共有されるのかを選べる
  return service;
}

function authCallback(request) {
  var service = getTwitterService();
  var isAuthorized = service.handleCallback(request);
  if (isAuthorized) {
    return HtmlService.createHtmlOutput('Success! You can close this page.');
  } else {
    return HtmlService.createHtmlOutput('Denied. You can close this page');
  }
}
