let ip;
let ip_api = 'https://api.ipify.org?format=json'; //https://www.ipify.org/
let deck_id;
let deck_id_api = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
let cards; //XXX = cards desired thing to grab from api
let cards_api = 'https://deckofcardsapi.com/api/deck/new/draw/?count=52';
let button;

async function getIP(){
  let data = await fetch(ip_api);
  let j_data = await data.json();
  ip = j_data.ip;
}

async function getDeck_id(){
  let data = await fetch(deck_id_api);
  let deck_data = await data.json();
  deck_id = deck_data.deck_id;
}

let cardDeck = [];
async function getCards(){ // getXXX = getdeck_id
  // let cards_api = 'https://deckofcardsapi.com/api/deck/'+ deck_id +'/draw/?count=52';
  let data = await fetch(cards_api);
  const cards_data = await data.json();
  for (x = 0; x < 52; x++){
    cardDeck.push(await cards_data.cards[x].code);
  }
}

// let XXX; //XXX = cards desired thing to grab from api
// let XXX_api = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
// async function geXXX(){ // getXXX = getdeck_id
//   let data = await fetch(XXX_api);
//   let YYY_data = await data.json();
//   XXX = YYY_data.XXX;
// }

function setup() {
  createCanvas(400, 400);
  getIP();
  getDeck_id();
  getCards();
  p_idx = 2;
  d_idx = 1;
  hitButton = createButton('Hit');
  hitButton.position(40, 50);
  hitButton.mousePressed(hit); 
  standButton = createButton('Stand');
  standButton.position(80, 50);
  standButton.mousePressed(stand); 
  playerTotal = 0;
  dealerTotal = 0;
  // card_url = 'https://deckofcardsapi.com/static/img/4S.png';
  // //card_url = 'https://deckofcardsapi.com/static/img/'+str(cardDeck[card_idx])+'.png';
  // const img = createImg(card_url);
  // img.hide() 
}

function draw() {
  background(20,220,100);
  // text(ip, 20,20);
  textSize(5);
  textAlign(CENTER)
  text('S = Spades, H = Hearts, D = Diamonds, S = Spades',width/2.5,20);
  text('Ten value cards: 0 = 10, K = King, Q = Queen J = JAck',width/2.5,30);
  text('Ace has a soft value of 11 and a hard value of 1.. dealer hits on soft 17',width/2.5,40);
  
  //################################### PLAYER
  // text(cardDeck, 40, 20) 
  textSize(15); 
  playerTotal = 0;
  text('PLAYER',40,height-40);
  for (idx = 0; idx < p_idx; idx++){
    c = cardDeck[idx];
    text(c,40,height-30*idx-55)
    // text(str(c)[0]=='J',40,height-55)

    if(((str(c)[0] == 'K')||((str(c)[0] == 'Q')||((str(c)[0] == 'J')||(str(c)[0]=='0'))))){
      playerTotal += 10;
    } else if (str(c)[0] <= 9){
      playerTotal += int(str(c)[0])
    } else if (str(c)[0] == 'A'){
      if (playerTotal + 11 < 21){
        playerTotal += 11;
      } else{
        playerTotal += 1;
      }
    }
  }

 // ########################################## Dealer

  dealerTotal = 0;
  text('DEALER',300,height-40);
  for (idx = 0; idx < d_idx; idx++){
    c = cardDeck[idx];
    text(c,300,height-30*idx-55)
    // text(str(c)[0]=='J',40,height-55)

    if(((str(c)[0] == 'K')||((str(c)[0] == 'Q')||((str(c)[0] == 'J')||(str(c)[0]=='0'))))){
      dealerTotal += 10;
    } else if (str(c)[0] <= 9){
      dealerTotal += int(str(c)[0])
    } else if (str(c)[0] == 'A'){
      if (dealerTotal + 11 < 21){
        dealerTotal += 11;
      } else{
        dealerTotal += 1;
      }
  }

  // ###################################### END CONDIDTIONs
  text(playerTotal,40,height-20);
  if (playerTotal >= 21){
    background(20,220,100);
    // text(ip, 20,20);
    textSize(20);
    textAlign(CENTER)
    text('YOU BUST!',width/2.5,height/2);
    text('refresh to try again',width/2.5,height-40);
    }

  text(dealerTotal,300,height-20);
    if (dealerTotal >= 21){
      background(20,220,100);
    // text(ip, 20,20);
    textSize(20);
    textAlign(CENTER)
    text('DEALER BUST!',width/2.5,height/2);
    text('refresh to try again',width/2.5,height-40);
    }
  }

  text(dealerTotal,300,height-20);
  if (dealerTotal >= 21){
    background(20,220,100);
  // text(ip, 20,20);
  textSize(20);
  textAlign(CENTER)
  text('DEALER BUST!',width/2.5,height/2);
  text('refresh to try again',width/2.5,height-40);
  if ((dealerTotal > playerTotal)&&(dealer >= 17)){
      background(20,220,100);
      // text(ip, 20,20);
      textSize(20);
      textAlign(CENTER)
      text('DEALER WON!',width/2.5,height/2);
      text('refresh to try again',width/2.5,height-40); 
    }if ((dealerTotal == playerTotal)&&(dealer >= 17)){
      background(20,220,100);
      // text(ip, 20,20);
      textSize(20);
      textAlign(CENTER)
      text('ITS A PUSH!',width/2.5,height/2);
      text('refresh to try again',width/2.5,height-40); 
    }if ((dealerTotal < playerTotal)&&(dealer >= 17)){
      background(20,220,100);
      // text(ip, 20,20);
      textSize(20);
      textAlign(CENTER)
      text('PLAYER WON!',width/2.5,height/2);
      text('refresh to try again',width/2.5,height-40); 
    }
  }
}

function hit(){
  background(200);
  if (playerTotal >= 21){
    stand();
  } else {
    p_idx ++;
  }
  
}
function stand(){
  background(200);
  if (dealerTotal <= 21){
    d_idx++;
  }
}
