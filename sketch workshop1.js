let ip;
let ip_api = 'https://api.ipify.org?format=json'; //https://www.ipify.org/

async function getIP(){
  let data = await fetch(ip_api);
  let j_data = await data.json();
  ip = j_data.ip;
}

function setup() {
  createCanvas(400, 400);
  getIP()
}

function draw() {
  background(220);
  text(ip, 20,20);
}
