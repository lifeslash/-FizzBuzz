//卒論の提出締め切りは平成28年2月10日15時まで

function returnDays(){
  var today = new Date();
  Logger.log(today);

  var deadline = new Date(2016,1,10);
  Logger.log(deadline);

  return Math.floor((deadline - today) / (1000 * 60 * 60 * 24))+1;
}

function check(){
  var text="";
  var days = returnDays();
  Logger.log(days);
  if(days==0){
    text="卒論提出締め切りは今日です";
    Logger.log("今日だよーー");
  }else if(days%15==0){
    text="FizzBuzz！"+"（卒論提出締め切りまであと"+days+"日です）";
    Logger.log("FizzBuzz");
  }else if(days%5==0){
    text="Buzz！"+"（卒論提出締め切りまであと"+days+"日です）";
    Logger.log("Buzz");
  }else if(days%3==0){
    text="Fizz！"+"（卒論提出締め切りまであと"+days+"日です）";
    Logger.log("Fizz");
  }else if(days>0){
    text=days+" （卒論提出締め切りまであと"+days+"日です）";
    Logger.log(days);
  }else{
    text="";
  }
  Logger.log(text);
  return text;
}

function tweet(){
  var text = check();
  postTweet(text);
}
