// let A; //ip {"ip":"203.211.76.8"} A is the dictionary reference
let deck_id;
// let B = 'link'; //ip_api = 'https://api.ipify.org?format=json'; //https://www.ipify.org/
let deck = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'

async function name(){
  // let C = await fetch(B); //C = data, D = j_data (BOTH local storage variable)
  // let D = await C.E(); // E = json (link format)
  // A = D.A;
}

function setup() {
  createCanvas(400, 400);
  name() // async function setup
}

function draw() {
  background(220);
  text(deck_id, 20,20);
}
