let deck_id;
let deck_id_api = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'

async function getdeck_id(){
  let data = await fetch(deck_id_api);
  let deck_data = await data.deckson();
  deck_id = deck_data.deck_id;
}

function setup() {
  createCanvas(400, 400);
  getdeck_id()
}

function draw() {
  background(20,220,100);
  text(deck_id, 20,20);
}
