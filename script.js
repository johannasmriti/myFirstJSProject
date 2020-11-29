//Age in Days
function ageInDays(){
    var birthYear = prompt('What year where you born?!');
    var ageInD = (2020-birthYear)*365;
    var h1= document.createElement('h1');
    var textAnswer = document.createTextNode('You are '+ageInD+" days old.");
    h1.setAttribute('id','ageInDays');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1);
}

function reset(){
    document.getElementById('ageInDays').remove();
}

//Cat Generator
function generateCat(){
    var image = document.createElement('img');
    var div = document.getElementById('flex-cat-gen');
    image.src = "https://thecatapi.com/api/images/get?format=src&type=gif&size=small";
    div.appendChild(image);
}

//Rock, Paper, Scissors
function rpsGame(choice){
    var humanChoice,botChoice;
    //console.log(choice);
    humanChoice=choice;
    botChoice=numToChoice(randomrpsInt());
    //console.log('Bot choice : '+botChoice);
    result=decideWinner(humanChoice,botChoice); //[0,1],[1,0],[0.5],[0.5]
    //console.log('Result : '+result);
    message = finalMessage(result); //says if you won or lost or tied
    console.log(message);
    rpsFrontEnd(humanChoice,botChoice,message);
    console.log(message['color']);
}

function randomrpsInt(){
    return Math.floor(Math.random() * 3);
}

function numToChoice(number){
    return ['rock','paper','scissors'][number];
}

function decideWinner(humanChoice,botChoice){
    var dataBase = {
        'rock': {'scissors': 1,'rock': 0.5,'paper':0},
        'scissors': {'scissors': 0.5,'rock': 0,'paper':1},
        'paper': {'scissors': 0,'rock': 1,'paper':0.5},
    }
    var yourScore = dataBase[humanChoice][botChoice];
    var compScore = dataBase[botChoice][humanChoice];
    return [yourScore,compScore];
}

function finalMessage([yourScore,compScore]){
    if(yourScore==0){
        return{'fmessage': 'You Lost :(','color':'red'};
    }
    else if(yourScore==1){
        return{'fmessage': 'You Won :)','color':'green'};
    }
    else{
        return{'fmessage': 'Issa Tie!','color':'yellow'};
    }
}
function rpsFrontEnd(humanChoice,botChoice,message){
    var imgData = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissors': document.getElementById('scissors').src
    }
    //imgData('rock');
    //remove all the images
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();
    var humanDiv = document.createElement('div');
    var botDiv = document.createElement('div');
    var messageDiv = document.createElement('div');
    
    humanDiv.innerHTML="<img src='" +imgData[humanChoice]+"' height= 150 width=150 style='box-shadow: 0px 10px 50px rgb(0,0,0,0.7);'>";
    messageDiv.innerHTML="<h1 style='color: " + message['color'] + "; font-size:60px; padding:30px; '>"+message['fmessage'] + "</h1>";
    botDiv.innerHTML="<img src='" +imgData[botChoice]+"' height= 150 width=150 style='box-shadow: 0px 10px 50px rgb(0,0,0,0.7);'>";

    document.getElementById('flex-box-rps').appendChild(humanDiv);
    document.getElementById('flex-box-rps').appendChild(messageDiv);
    document.getElementById('flex-box-rps').appendChild(botDiv);
}

//Change the color of all the buttons
var allBut = document.getElementsByTagName('button');
console.log(allBut);

var copyArray = [];
for(let i=0;i<allBut.length;i++){
    copyArray.push(allBut[i].classList[1]);
    //console.log(copyArray[i]);
}
console.log(copyArray);

function buttonColorChange(buttonThing){    
    if(buttonThing.value=='red'){
        buttonRed();
    }
    else if(buttonThing.value=='blue'){
        buttonBlue();
    }
    else if(buttonThing.value=='green'){
        buttonGreen();
    }
    else if(buttonThing.value=='yellow'){
        buttonYellow();
    }
    else if(buttonThing.value=='reset'){
        buttonReset();
    }
    else{
        randomColor();
    }
}

function buttonRed(){
    for(let i=0;i<allBut.length;i++){
        allBut[i].classList.remove(allBut[i].classList[1]);
        allBut[i].classList.add('btn-danger');
    }
}

function buttonGreen(){
    for(let i=0;i<allBut.length;i++){
        allBut[i].classList.remove(allBut[i].classList[1]);
        allBut[i].classList.add('btn-success');
    }
    console.log(allBut);
}

function buttonBlue(){
    for(let i=0;i<allBut.length;i++){
        allBut[i].classList.remove(allBut[i].classList[1]);
        allBut[i].classList.add('btn-primary');
    }
}

function buttonYellow(){
    for(let i=0;i<allBut.length;i++){
        allBut[i].classList.remove(allBut[i].classList[1]);
        allBut[i].classList.add('btn-warning');
    }
}

function buttonReset(){
    for(let j=0;j<allBut.length;j++){
        console.log(copyArray[j]);
        var temp = copyArray[j];
        allBut[j].classList.remove(allBut[j].classList[1]);
        allBut[j].classList.add(copyArray[j]);
        //console.log(allBut[j]);
    }
}

function randomColor(){
    console.log('Hi');
    let choice = ['btn-primary','btn-success','btn-warning','btn-danger'];
    let temp = Math.floor(Math.random()*4);
    for(let i=0;i<allBut.length;i++){
        temp = Math.floor(Math.random()*4);
        allBut[i].classList.remove(allBut[i].classList[1]);
        allBut[i].classList.add(choice[temp]);
    }
}

//BackJack
var bjGame={
    'you': {'scoreSpan': '#your-black-jack-result','div':'#your-box','score': 0},
    'dealer': {'scoreSpan': '#dealer-black-jack-result','div':'#dealer-box','score': 0},
    'cards' : ['2','3','4','5','6','7','8','9','10','K','Q','A','J'],
    'cardsMap' : {'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'Q':10,'J':10,'K':10,'A':[1,11]},
    'wins':0,
    'draws':0,
    'loss':0,
    'isStand':false,
    'turnsOver':false,
};

const YOU = bjGame['you']
const DEALER = bjGame['dealer']

const hitSound = new Audio('static/sounds/swish.m4a');
const winSound = new Audio('static/sounds/cash.mp3');
const lossSound = new Audio('static/sounds/aww.mp3');

document.querySelector('#hit-button').addEventListener('click',bjHit);
document.querySelector('#stand-button').addEventListener('click',dealerLogic);
document.querySelector('#deal-button').addEventListener('click',bjDeal);

function randomCard(){
    let random = Math.floor(Math.random()*13);
    return bjGame['cards'][random];
}

function bjHit(){
    if(bjGame['isStand']==false){
        let card = randomCard();
        showCard(card,YOU);
        updateScore(card,YOU);
        showScore(YOU);
    }
}

function showCard(card, activePlayer){
    if(activePlayer['score'] <=21){
        let cardImage = document.createElement('img');
        cardImage.src = `static/images/${card}.png`;
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play();
    }
}

function bjDeal(){
    //showResult(computeWinner());
    if(bjGame['turnsOver']==true){
        let yourImage= document.querySelector('#your-box').querySelectorAll('img');
        let dealerImage= document.querySelector('#dealer-box').querySelectorAll('img');
        for(let i=0;i<yourImage.length;i++){
            yourImage[i].remove();
        }
        for(let i=0;i<dealerImage.length;i++){
            dealerImage[i].remove();
        }

        YOU['score']=0;
        DEALER['score']=0;

        document.querySelector('#your-black-jack-result').textContent=0;
        document.querySelector('#your-black-jack-result').style.color='white';

        document.querySelector('#dealer-black-jack-result').textContent=0;
        document.querySelector('#dealer-black-jack-result').style.color='white';

        document.querySelector('#black-jack-result').textContent = "Let's Play!";
        document.querySelector('#black-jack-result').style.color = 'black';
        
        bjGame['isStand']=false;
        bjGame['turnOver']=false;
    }
}

function updateScore(card,activePlayer){
    if(card=='A'){
        if(activePlayer['score']+bjGame['cardsMap'][card][1]<=21){
            activePlayer['score']+=bjGame['cardsMap'][card][1];
        }
        else{
            activePlayer['score']+=bjGame['cardsMap'][card][0]
        }
    }
    else{
        activePlayer['score']+=bjGame['cardsMap'][card];
    }
}

function showScore(activePlayer){
    if(activePlayer['score'] >=21){
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    }
    else{
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve,ms));
}

async function dealerLogic(){
    bjGame['isStand']=true;

    while(DEALER['score']<15 && (bjGame['isStand']==true)){
        let card=randomCard();
        showCard(card,DEALER);
        updateScore(card,DEALER);
        showScore(DEALER);
        await sleep(1000);
    }

    bjGame['turnsOver']=true;
    showResult(computeWinner());
}

function computeWinner(){
    let winner;
    if(YOU['score']<=21){
        if((YOU['score']>DEALER['score'])  || (DEALER['score']>21)){
            console.log('you won');
            bjGame['wins']++;
            winner=YOU;
        }
        else if((YOU['score']<DEALER['score']) ){
            console.log('you lost');
            winner=DEALER;
            bjGame['loss']++;
        }
        else if((YOU['score']===DEALER['score'])){
            console.log('issa draw');
            bjGame['draws']++;
        }
    }
    else if(YOU['score']>21 && DEALER['score']<=21){
        console.log('you lost');
        bjGame['loss']++;
        winner=DEALER;
    }
    else if(YOU['score']>21 && DEALER['score']>21){
        console.log('issa draw');
        bjGame['draws']++;
    }
    return winner;
}

function showResult(winner){
    let message,messageColor;
    if (winner==YOU){
        document.querySelector('#wins').textContent=bjGame['wins'];
        message='You Won!!';
        messageColor='green';
        winSound.play();
    }
    else if (winner==DEALER){
        document.querySelector('#loss').textContent=bjGame['loss'];
        message='You Lost!!';
        messageColor='red';
        lossSound.play();
    }
    else{
        document.querySelector('#draws').textContent=bjGame['draws'];
        message='You Drew :)';
        messageColor='orange';   
    }
    document.querySelector('#black-jack-result').textContent = message;
    document.querySelector('#black-jack-result').style.color = messageColor;
}