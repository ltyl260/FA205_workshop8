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

let card_imgs = [];
async function getCardImage(c){
  card_url = 'https://deckofcardsapi.com/static/img/'+cardDeck[c]+'.png';
  const img = createImg(card_url);
  card_imgs[c] = (img);
  img.hide() 
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
    /* background variables*/
  bgR = 20;
  bgG = 220;
  bgB = 100;
  /* player variables */
  pX=50;
  pY=height-150;
  pcX = 15;
  pcY = 20;
  playerTotal = 0;
  playerCards = [0,1];
  // append(playerCards,3);
  // append(playerCards,1);
  /* dealer variables */
  dX = 15;
  dY = 85;
  dealerTotal = 0;
  dealerCards = [2];
  // append(dealerCards,3);

  /* card variables */
  card_idx = 2;
  /* button variables */
  hitButton = createButton('Hit');
  hitButton.position(pX-3, pY+62);
  hitButton.mousePressed(hit); 
  standButton = createButton('Stand');
  standButton.position(pX+32, pY+62);
  standButton.mousePressed(stand); 
  tic = 0;
}

function draw() {
  background(bgR,bgG,bgB);
  // text(cardDeck[2], 10,50);
  //#### HEADER ####################################################################################
  textSize(16);                                                                                  //#
  textAlign(CENTER)                                                                              //#
  // text('S = Spades, H = Hearts, D = Diamonds, S = Spades',width/2.5,20);                      //#
  // text('Ten value cards: 0 = 10, K = King, Q = Queen J = JAck',width/2.5,30);                 //#
  // text('Ace has a soft value of 11 and a hard value of 1',width/2.5,40);                      //#
                                                                                                 //#   
  textStyle(BOLD);
  textSize(25);                                                                                      //#                                    //#
  text('BLACKJACK',width/2,30);                                                                //#  
  textStyle(NORMAL);                                                              //#
  textSize(15);                                                                                  //#
  text('\n dealer stands on soft 17',width/2,30);    
  player();
  dealer();
  textAlign(CENTER);
  textStyle(BOLD);
  if ((playerTotal == 21)&&(dealerTotal <= 9)){
    textSize(20);
    textAlign(CENTER);
    text('Player Wins with Blackjack!',width/2.5,height/2);
    text('refresh to try again',width/2.5,height/2-20);
  } else if ((playerTotal == 21)&&(dealerTotal == 21)){
    textSize(20);
    textAlign(CENTER);
    text('Tie with two Blackjacks!',width/2.5,height/2);
    text('refresh to try again',width/2.5,height/2-20);
  } else if ((dealerTotal == 21)){
    textSize(20);
    textAlign(CENTER);
    text('Dealer Wins with Blackjack!',width/2.5,height/2);
    text('refresh to try again',width/2.5,height/2-20);
  } else if (playerTotal >= 21){
    textSize(20);
    textAlign(CENTER)
    text('PLAYER BUST!',width/2,height/2);
    text('refresh to try again',width/2,height/2-20); 
  } else if (dealerTotal > 21){
    textSize(20);
    textAlign(CENTER)
    text('DEALER BUST!',width/2.5,height/2);
    text('refresh to try again',width/2.5,height/2-20);
  } else if ((dealerTotal > playerTotal)&&(dealer >= 17)){
    textSize(20);
    textAlign(CENTER)
    text('DEALER WON!',width/2.5,height/2);
    text('refresh to try again',width/2.5,height/2-20);
    hitButton.hide();
    standButton.hide() 
  } else if ((dealerTotal == playerTotal)&&(dealer >= 17)){
    textSize(20);
    textAlign(CENTER)
    text('ITS A PUSH!',width/2.5,height/2);
    text('refresh to try again',width/2.5,height/2-20); 
  } else if ((dealerTotal < playerTotal)&&(dealer >= 17)){
    textSize(20);
    textAlign(CENTER)
    text('PLAYER WON!',width/2.5,height/2);
    text('refresh to try again',width/2.5,height/2-20); 
  }
}                                            //#
 // ########## DRAW ENDS ##########################################################################

function player(){
  textSize(15);                                                                                  //#
  playerTotal = 0;    // re calculate total upon each draw otherwise it will keep increasing...  //#
  text('PLAYER',pX+40,pY+100);                                                                   //#
  for (idx = 0; idx < playerCards.length; idx++){                                                //#
    c = cardDeck[playerCards[idx]];                                                              //#
    if(((str(c)[0] == 'K')||((str(c)[0] == 'Q')||((str(c)[0] == 'J')||(str(c)[0]=='0'))))){      //#
      playerTotal += 10;                                                                         //#
    } else if (str(c)[0] <= 9){                                                                  //#
      playerTotal += int(str(c)[0])                                                              //#
    } else if (str(c)[0] == 'A'){                                                                //#
      if (playerTotal + 11 <= 21){                                                                //#
        playerTotal += 11;                                                                       //#
      } else{                                                                                    //#
        playerTotal += 1;                                                                        //#
      }                                                                                          //#
    }                                                                                            //#
    card = getCardImage(playerCards[idx]);                                                                    //#
    image(card_imgs[playerCards[idx]],pX+pcX*idx,pY-pcY*idx,40,60);                                //#
  }                                                                                              //#
  textStyle(BOLD);
  textSize(25);                                                                                      //#                                    //#
  text(playerTotal,pX+40,pY+130);   
  textStyle(NORMAL);                                                              //#
}

function dealer(){
  textSize(15);        
  textAlign(LEFT);                                                                            //#
  text('DEALER',dX,dY);                                                                     //#
  dealerTotal = 0;      // re calculate total upon each draw otherwise it will keep increasing...  //#                                                                         //#
  for (idx = 0; idx < dealerCards.length; idx++){                                                  //#
    // text(c,40,height-30*idx-55)                                                                 //#
    c = cardDeck[dealerCards[idx]];                                                                          //#
    if(((str(c)[0] == 'K')||((str(c)[0] == 'Q')||((str(c)[0] == 'J')||(str(c)[0]=='0'))))){        //#
      dealerTotal += 10;
    } else if (str(c)[0] <= 9){
      dealerTotal += int(str(c)[0])
    } else if (str(c)[0] == 'A'){
      if (dealerTotal + 11 <= 21){
        dealerTotal += 11;
      } else{
        dealerTotal += 1;
      }
    }                                                                           //#
    card = getCardImage(dealerCards[idx]);                                                                    //#
    // image(card_imgs[dealerCards[idx]],dX+20*idx,dY-40*idx,40,60);                                             //#
    image(card_imgs[dealerCards[idx]],dX+75+40*idx,dY-15,40,60);                                             //#
  }    
  textStyle(BOLD);
  textSize(25);                                                                                      //#                                    //#
  text(dealerTotal,dX+20,dY+30);
  textStyle(NORMAL);
}

function hit(){
  if (playerTotal >= 21){
    stand();
  } else {
    card_idx += 1;
    append(playerCards,int(card_idx));
  }
}

function stand(){
  // when player stands dealer reveals cards
  // while((dealerTotal <= 17)){
  //   // tic+= 1;
  //   card_idx+=1;
  //   append(dealerCards, card_idx);
  //   deal
  // }
  // tic+= 1;
  if ((dealerTotal <= 17)){
    card_idx+=1;
    append(dealerCards, card_idx);
  }
  
}