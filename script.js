const mapDiv = document.querySelector('#map');
const missionsDiv = document.querySelector('#missions-container');
const showElementDiv = document.querySelector('#next-element-container');
const nextElementDiv = document.querySelector('#element-matrix-table');
const rotateButton = document.querySelector('#rotate');
const mirrorButton = document.querySelector('#mirror');
const springPointP = document.querySelector('#spring-point');
const summerPointP = document.querySelector('#summer-point');
const fallPointP = document.querySelector('#fall-point');
const winterPointP = document.querySelector('#winter-point');
const remainingTime = document.querySelector('#remaining-time');
const timeNumber = document.querySelector('#time-number');
const springDiv = document.querySelector('#spring');
const summerDiv = document.querySelector('#summer');
const fallDiv = document.querySelector('#fall');
const winterDiv = document.querySelector('#winter');
const currentSeasonSpan = document.querySelector('#current-season span');
const theEndSpan = document.querySelector('#the-end');
const fullPointP = document.querySelector('#full-point');
const seasonInfoP = document.querySelector('#season-info');
const ItemToPlaceP = document.querySelector('#item-to-place');
const endButton = document.querySelector('#end-button');
const endGameDiv = document.querySelector('#endgame-div');

theEndSpan.style.display = 'none';

function delegal(szulo, gyerek, mikor, mit) {
  function esemenyKezelo(esemeny) {
    let esemenyCelja = esemeny.target;
    let esemenyKezeloje = this;
    let legkozelebbiKeresettElem = esemenyCelja.closest(gyerek);

    if (esemenyKezeloje.contains(legkozelebbiKeresettElem)) {
      mit(esemeny, legkozelebbiKeresettElem);
    }
  }

  szulo.addEventListener(mikor, esemenyKezelo);
}

let game = [];

const mountains = [
  [2, 2],
  [4, 9],
  [6, 4],
  [9, 10],
  [10, 6],
];

let elements = [
  {
    time: 2,
    type: 'water',
    shape: [
      [1, 1, 1],
      [0, 0, 0],
      [0, 0, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 2,
    type: 'town',
    shape: [
      [1, 1, 1],
      [0, 0, 0],
      [0, 0, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 1,
    type: 'forest',
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 2,
    type: 'farm',
    shape: [
      [1, 1, 1],
      [0, 0, 1],
      [0, 0, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 2,
    type: 'forest',
    shape: [
      [1, 1, 1],
      [0, 0, 1],
      [0, 0, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 2,
    type: 'town',
    shape: [
      [1, 1, 1],
      [0, 1, 0],
      [0, 0, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 2,
    type: 'farm',
    shape: [
      [1, 1, 1],
      [0, 1, 0],
      [0, 0, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 1,
    type: 'town',
    shape: [
      [1, 1, 0],
      [1, 0, 0],
      [0, 0, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 1,
    type: 'town',
    shape: [
      [1, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 1,
    type: 'farm',
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 1,
    type: 'farm',
    shape: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 1, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 2,
    type: 'water',
    shape: [
      [1, 1, 1],
      [1, 0, 0],
      [1, 0, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 2,
    type: 'water',
    shape: [
      [1, 0, 0],
      [1, 1, 1],
      [1, 0, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 2,
    type: 'forest',
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 1],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 2,
    type: 'forest',
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 2,
    type: 'water',
    shape: [
      [1, 1, 0],
      [1, 1, 0],
      [0, 0, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
];

// ---- Kirajzolja a kezdetleges térképet ------

for (let i = 0; i < 11; i++) {
  let tableRow = document.createElement('div');
  let gameRow = Array(11).fill('base');
  for (let j = 0; j < 11; j++) {
    let tableCell = document.createElement('div');
    tableCell.classList.add('table-cell');
    tableCell.setAttribute('id', i + '-' + j);
    if (mountains.some(m => m[0] === i + 1 && m[1] === j + 1)) {
      tableCell.style.backgroundImage = "url('./assets/tiles/mountain_tile.svg')";
      gameRow[j] = 'mountain';
    }
    tableRow.appendChild(tableCell);
  }
  tableRow.classList.add('table-row');
  mapDiv.appendChild(tableRow);
  game.push(gameRow);
}
console.log(game);

// -------------------------------------------

let available_missions = [
  'erdo_szele',
  'almos_volgy',
  'krumpliontozes',
  'hatarvidek',
  'paratlan_silok',
  'ures_telek',
  'gazdag_videk',
  'magusok_volgye',
  'gazdag_varos',
  'ontozocsatorna',
];
let missions = [];

// --- Választ 4 küldetést az elérhetőek közül ---

for (let i = 0; i < 4; i++) {
  let index = Math.floor(Math.random() * available_missions.length);
  missions.push(available_missions[index]);
  available_missions.splice(index, 1);
}

// ---------------------------------------------
const mission_id = ['A', 'B', 'C', 'D'];

// ----- Megjeleníti a küldetéseket ------

for (let i = 0; i < 4; i++) {
  let imgDiv = document.createElement('div');
  let img = document.createElement('img');
  img.src = './assets/missions/' + missions[i] + '.png';
  img.classList.add('mission-img');
  imgDiv.appendChild(img);
  let pointP = document.createElement('p');
  let point = document.createElement('span');
  point.classList.add('mission-point');
  point.innerHTML = '0';
  let letterSpan = document.createElement('span');
  letterSpan.innerHTML = 'p ' + mission_id[i];
  pointP.appendChild(point);
  pointP.appendChild(letterSpan);
  imgDiv.appendChild(pointP);
  missionsDiv.appendChild(imgDiv);
}

// ----------------------------------------

let elementTime;
let time;
let elementIndex;
let type;
let shape;
let allTime = 0;
let fullPoint = 0;
let usedElements = [];

// --- Megjeleníti a következő elemet-------

function drawNextElement() {
  while (nextElementDiv.firstChild) {
    nextElementDiv.removeChild(nextElementDiv.firstChild);
  }

  for (let i = 0; i < 3; i++) {
    let tableRow = document.createElement('div');
    for (let j = 0; j < 3; j++) {
      let tableCell = document.createElement('div');
      tableCell.classList.add('element-matrix-cell');
      if (shape[i][j] === 1) {
        tableCell.style.backgroundImage = "url('./assets/tiles/" + type + "_tile.svg')";
      }
      tableRow.appendChild(tableCell);
    }
    nextElementDiv.appendChild(tableRow);
  }
}

// -----------------------------------------

function nextElement() {
  if (elements.length === 0) {
    console.log('vege');
  }
  elementIndex = Math.floor(Math.random() * elements.length);
  elementTime = elements[elementIndex]['time'];
  timeNumber.innerHTML = elementTime;
  type = elements[elementIndex]['type'];
  shape = elements[elementIndex]['shape'];

  drawNextElement();
}

nextElement();

// ---- Küldetés számítás ------

let missionPoints = Array(missions.length).fill(0);

// ---- template: szomszédos mezők ------

function szomszedos_mezok_template(object, neighbor_of_object) {
  let sum = 0;
  for (let i = 1; i < 10; i++) {
    for (let j = 1; j < 10; j++) {
      if (game[i][j] === object) {
        if (game[i + 1][j] === neighbor_of_object) sum++;
        if (game[i - 1][j] === neighbor_of_object) sum++;
        if (game[i][j + 1] === neighbor_of_object) sum++;
        if (game[i][j - 1] === neighbor_of_object) sum++;
      }
    }
  }
  for (let i = 1; i < 10; i++) {
    if (game[0][i] === object) {
      if (game[0][i + 1] === neighbor_of_object) sum++;
      if (game[0][i - 1] === neighbor_of_object) sum++;
      if (game[1][i] === neighbor_of_object) sum++;
    }
  }

  for (let i = 1; i < 10; i++) {
    if (game[10][i] === object) {
      if (game[10][i + 1] === neighbor_of_object) sum++;
      if (game[10][i - 1] === neighbor_of_object) sum++;
      if (game[9][i] === neighbor_of_object) sum++;
    }
  }

  for (let i = 1; i < 10; i++) {
    if (game[i][0] === object) {
      if (game[i + 1][0] === neighbor_of_object) sum++;
      if (game[i - 1][0] === neighbor_of_object) sum++;
      if (game[i][1] === neighbor_of_object) sum++;
    }
  }

  for (let i = 1; i < 10; i++) {
    if (game[i][10] === object) {
      if (game[i + 1][10] === neighbor_of_object) sum++;
      if (game[i - 1][10] === neighbor_of_object) sum++;
      if (game[i][9] === neighbor_of_object) sum++;
    }
  }

  if (game[0][0] === object) {
    if (game[0][1] === neighbor_of_object) sum++;
    if (game[1][0] === neighbor_of_object) sum++;
  }

  if (game[0][10] === object) {
    if (game[0][9] === neighbor_of_object) sum++;
    if (game[1][10] === neighbor_of_object) sum++;
  }

  if (game[10][0] === object) {
    if (game[10][1] === neighbor_of_object) sum++;
    if (game[9][0] === neighbor_of_object) sum++;
  }

  if (game[10][10] === object) {
    if (game[10][9] === neighbor_of_object) sum++;
    if (game[9][10] === neighbor_of_object) sum++;
  }
  return sum;
}

// ----- Alap küldetések innentől------

function erdo_szele_mission() {
  let index = missions.indexOf('erdo_szele');
  for (let i = 0; i < 11; i++) {
    if (game[0][i] === 'forest') {
      missionPoints[index]++;
    }
  }

  for (let i = 0; i < 11; i++) {
    if (game[10][i] === 'forest') missionPoints[index]++;
  }

  for (let i = 0; i < 11; i++) {
    if (game[i][10] === 'forest') missionPoints[index]++;
  }

  for (let i = 0; i < 11; i++) {
    if (game[i][0] === 'forest') missionPoints[index]++;
  }
}

function hatarvidek_mission() {
  let index = missions.indexOf('hatarvidek');

  for (let i = 0; i < 11; i++) {
    fullRow = true;
    for (let j = 0; j < 11; j++) {
      if (game[i][j] === 'base') {
        fullRow = false;
        break;
      }
    }
    if (fullRow) missionPoints[index] += 6;
  }

  for (let i = 0; i < 11; i++) {
    fullRow = true;
    for (let j = 0; j < 11; j++) {
      if (game[j][i] === 'base') {
        fullRow = false;
        break;
      }
    }
    if (fullRow) missionPoints[index] += 6;
  }
}

function almos_volgy_mission() {
  let index = missions.indexOf('almos_volgy');

  for (let i = 0; i < 11; i++) {
    forestFields = 0;
    for (let j = 0; j < 11; j++) {
      if (game[i][j] === 'forest') forestFields++;
    }
    if (forestFields === 3) missionPoints[index] += 4;
  }
}

function krumpliontozes_mission() {
  let index = missions.indexOf('krumpliontozes');
  let count = szomszedos_mezok_template('farm', 'town');
  missionPoints[index] += count * 2;
}

function hegy_mission() {
  let mountainPoints = 0;
  for (let i = 0; i < 11; i++) {
    for (let j = 0; j < 11; j++) {
      if (game[i][j] === 'mountain') {
        if (
          game[i + 1][j] !== 'base' &&
          game[i - 1][j] !== 'base' &&
          game[i][j + 1] !== 'base' &&
          game[i][j - 1] !== 'base'
        )
          mountainPoints++;
      }
    }
  }
  return mountainPoints;
}

// ----- Alap küldetések vége------
// -----Extra küldetések innentól------

function paratlan_silok_mission() {
  let index = missions.indexOf('paratlan_silok');

  for (let i = 1; i <= 9; i += 2) {
    fullColumn = true;
    for (let j = 0; j < 11; j++) {
      if (game[j][i] === 'base') {
        fullColumn = false;
        break;
      }
    }
    if (fullColumn) missionPoints[index] += 10;
  }
}

function ures_telek_mission() {
  let index = missions.indexOf('ures_telek');
  let count = szomszedos_mezok_template('town', 'base');
  missionPoints[index] += count * 2;
}

function gazdag_videk_mission() {
  let index = missions.indexOf('ures_telek');

  for (let i = 0; i < 11; i++) {
    fields = [];
    for (let j = 0; j < 11; j++) {
      if (!fields.includes(game[i][j])) fields.push(game[i][j]);
    }
    if (fields.length >= 5) missionPoints[index] += 4;
  }
}

function magusok_volgye_mission() {
  let index = missions.indexOf('magusok_volgye');
  let count = szomszedos_mezok_template('mountain', 'water');
  missionPoints[index] += count * 3;
}

function gazdag_varos_mission() {
  let index = missions.indexOf('gazdag_varos');
  let fields = [];
  for (let i = 0; i < 11; i++) {
    for (let j = 0; j < 11; j++) {
      fields = [];
      if (game[i][j] === 'town') {
        if (!fields.includes(game[i + 1][j]) && game[i + 1][j] !== 'base')
          fields.push(game[i + 1][j]);
        if (!fields.includes(game[i - 1][j]) && game[i - 1][j] !== 'base')
          fields.push(game[i - 1][j]);
        if (!fields.includes(game[i][j + 1]) && game[i][j + 1] !== 'base')
          fields.push(game[i][j + 1]);
        if (!fields.includes(game[i][j - 1]) && game[i][j - 1] !== 'base')
          fields.push(game[i][j - 1]);
        if (fields.length >= 3) missionPoints[index] += 3;
      }
    }
  }

  for (let i = 1; i < 10; i++) {
    if (game[0][i] === 'town') {
      fields = [];
      if (!fields.includes(game[0][i + 1]) && game[0][i + 1] !== 'base')
        fields.push(game[0][i + 1]);
      if (!fields.includes(game[0][i - 1]) && game[0][i - j] !== 'base')
        fields.push(game[0][i - 1]);
      if (!fields.includes(game[1][i]) && game[1][i] !== 'base') fields.push(game[1][i]);
      if (fields.length >= 3) missionPoints[index] += 3;
    }
  }

  for (let i = 1; i < 10; i++) {
    if (game[10][i] === 'town') {
      fields = [];
      if (!fields.includes(game[10][i + 1]) && game[10][i + 1] !== 'base')
        fields.push(game[10][i + 1]);
      if (!fields.includes(game[10][i - 1]) && game[10][i - 1] !== 'base')
        fields.push(game[10][i - 1]);
      if (!fields.includes(game[9][i]) && game[9][i] !== 'base') fields.push(game[9][i]);
      if (fields.length >= 3) missionPoints[index] += 3;
    }
  }

  for (let i = 1; i < 10; i++) {
    if (game[i][0] === 'town') {
      fields = [];
      if (!fields.includes(game[i + 1][0]) && game[i + 1][0] !== 'base')
        fields.push(game[i + 1][0]);
      if (!fields.includes(game[i - 1][0]) && game[i - 1][0] !== 'base')
        fields.push(game[i - 1][0]);
      if (!fields.includes(game[i][1]) && game[i][1] !== 'base') fields.push(game[i][1]);
      if (fields.length >= 3) missionPoints[index] += 3;
    }
  }

  for (let i = 1; i < 10; i++) {
    if (game[i][10] === 'town') {
      fields = [];
      if (!fields.includes(game[i + 1][10]) && game[i + 1][10] !== 'base')
        fields.push(game[i + 1][10]);
      if (!fields.includes(game[i - 1][10]) && game[i - 1][10] !== 'base')
        fields.push(game[i - 1][10]);
      if (!fields.includes(game[i][9]) && game[i][9] !== 'base') fields.push(game[i][9]);
      if (fields.length >= 3) missionPoints[index] += 3;
    }
  }
}

function ontozocsatorna_mission() {
  let index = missions.indexOf('ontozocsatorna');

  for (let i = 0; i < 11; i++) {
    let waterCount = 0;
    let farmCount = 0;
    for (let j = 0; j < 11; j++) {
      if (game[j][i] === 'water') waterCount++;
      if (game[j][i] === 'farm') farmCount++;
    }
    if (waterCount !== 0 && farmCount !== 0 && waterCount === farmCount) missionPoints[index] += 4;
  }
}

// ----------------------------------

function validateValues(x, y) {
  if (x >= 0 && y >= 0 && x <= 10 && y <= 10) return true;
  else return false;
}

function usedTiles(x, y) {
  let draw = [];
  if (shape[0][0] === 1 && validateValues(x - 1, y - 1)) draw.push([x - 1, y - 1]);
  if (shape[0][1] === 1 && validateValues(x - 1, y)) draw.push([x - 1, y]);
  if (shape[0][2] === 1 && validateValues(x - 1, y + 1)) draw.push([x - 1, y + 1]);
  if (shape[1][0] === 1 && validateValues(x, y - 1)) draw.push([x, y - 1]);
  if (shape[1][1] === 1 && validateValues(x, y)) draw.push([x, y]);
  if (shape[1][2] === 1 && validateValues(x, y + 1)) draw.push([x, y + 1]);
  if (shape[2][0] === 1 && validateValues(x + 1, y - 1)) draw.push([x + 1, y - 1]);
  if (shape[2][1] === 1 && validateValues(x + 1, y)) draw.push([x + 1, y]);
  if (shape[2][2] === 1 && validateValues(x + 1, y + 1)) draw.push([x + 1, y + 1]);
  return draw;
}

// ----- Forgatás, tükrözés ------

rotateButton.addEventListener('click', () => {
  shape = shape.map((val, index) => shape.map(row => row[index]).reverse());
  drawNextElement();
});

mirrorButton.addEventListener('click', () => {
  shape = shape.map(row => row.reverse());
  drawNextElement();
});
//-------------------------

function drawShape(node) {
  coordinates = node.id.split('-');
  x = parseInt(coordinates[0]);
  y = parseInt(coordinates[1]);
  let draw = usedTiles(x, y);

  draw.forEach(e => {
    let elementStyle = document.getElementById(e[0] + '-' + e[1]).style;
    elementStyle.backgroundImage = 'none';
    elementStyle.backgroundColor = '#97ED74';
  });
}

delegal(mapDiv, 'div[class="table-cell"]', 'mouseover', e => {
  drawShape(e.target);
});

// ---- Újrarajzolja a térképet --------
function reDrawMap() {
  for (let i = 0; i < 11; i++) {
    for (let j = 0; j < 11; j++) {
      let type = game[i][j];
      let cell = document.getElementById(i + '-' + j);
      cell.style.backgroundColor = 'none';
      cell.style.backgroundImage = "url('./assets/tiles/" + type + "_tile.svg')";
      cell.style.opacity = 1;
    }
  }
}

const tableCellForMouse = document.querySelectorAll('.table-cell');
tableCellForMouse.forEach(e =>
  e.addEventListener('mouseout', () => {
    reDrawMap();
  }),
);

// ---------------------------------------

// ------- Játék vége -----------------

function endGame() {
  showElementDiv.style.display = 'none';
  theEndSpan.style.display = 'inline';
  remainingTime.innerHTML = '0';
  fullPointP.style.display = 'inline';
  seasonInfoP.style.display = 'none';
  ItemToPlaceP.style.display = 'none';
  fullPoint += hegy_mission();
  fullPointP.innerHTML += fullPoint + ' pont';
  endGameDiv.style.display = 'block';
  const endGameMap = mapDiv.cloneNode(true);
  mapDiv.parentNode.replaceChild(endGameMap, mapDiv);
}

endButton.addEventListener('click', () => endGame());

// ------------------------------------

function wrongMove(draw) {
  draw.forEach(e => {
    let eX = e[0];
    let eY = e[1];
    let el = document.getElementById(eX + '-' + eY);
    console.log('wrongmove');
    el.classList.add('wrong-move');
    setTimeout(() => el.classList.remove('wrong-move'), 300);
  });
}

springDiv.classList.add('season-active');
seasonArray = ['Tavasz', 'Nyár', 'Ősz', 'Tél'];
seasonElementArray = [springDiv, summerDiv, fallDiv, winterDiv];
seasonArrayIndex = 0;
seasonMissions = [
  [missionsDiv.children.item(0), missionsDiv.children.item(1)],
  [missionsDiv.children.item(1), missionsDiv.children.item(2)],
  [missionsDiv.children.item(2), missionsDiv.children.item(3)],
  [missionsDiv.children.item(3), missionsDiv.children.item(0)],
];
seasonMissions[0][0].classList.add('active-mission');
seasonMissions[0][1].classList.add('active-mission');
seasonMissions[0][0].firstChild.classList.add('spring');
seasonMissions[0][1].firstChild.classList.add('spring');
currentSeasonSpan.innerHTML = seasonArray[seasonArrayIndex];

function setNextSeason() {
  elements = elements.concat(usedElements);
  usedElements = [];
  seasonElementArray[seasonArrayIndex].classList.remove('season-active');
  seasonMissions[seasonArrayIndex][0].classList.remove('active-mission');
  seasonMissions[seasonArrayIndex][1].classList.remove('active-mission');

  if (seasonArrayIndex === 0) {
    window[missions[0] + '_mission']();
    window[missions[1] + '_mission']();
    let springPoint = missionPoints[0] + missionPoints[1];
    springPointP.innerHTML = springPoint + ' pont';
    fullPoint += springPoint;
  } else if (seasonArrayIndex === 1) {
    window[missions[1] + '_mission']();
    window[missions[2] + '_mission']();
    let summerPoint = missionPoints[1] + missionPoints[2];
    summerPointP.innerHTML = summerPoint + ' pont';
    fullPoint += summerPoint;
  } else if (seasonArrayIndex === 2) {
    window[missions[2] + '_mission']();
    window[missions[3] + '_mission']();
    let fallPoint = missionPoints[2] + missionPoints[3];
    fallPointP.innerHTML = fallPoint + ' pont';
    fullPoint += fallPoint;
  } else if (seasonArrayIndex === 3) {
    window[missions[3] + '_mission']();
    window[missions[0] + '_mission']();
    let winterPoint = missionPoints[3] + missionPoints[0];
    winterPointP.innerHTML = winterPoint + ' pont';
    fullPoint += winterPoint;
  }
  seasonArrayIndex++;
  if (seasonArrayIndex === 1) {
    seasonMissions[seasonArrayIndex - 1][0].firstChild.classList.remove('spring');
    seasonMissions[seasonArrayIndex - 1][1].firstChild.classList.remove('spring');
    seasonMissions[seasonArrayIndex][0].firstChild.classList.add('summer');
    seasonMissions[seasonArrayIndex][1].firstChild.classList.add('summer');
  } else if (seasonArrayIndex === 2) {
    seasonMissions[seasonArrayIndex - 1][0].firstChild.classList.remove('summer');
    seasonMissions[seasonArrayIndex - 1][1].firstChild.classList.remove('summer');
    seasonMissions[seasonArrayIndex][0].firstChild.classList.add('fall');
    seasonMissions[seasonArrayIndex][1].firstChild.classList.add('fall');
  } else if (seasonArrayIndex === 3) {
    seasonMissions[seasonArrayIndex - 1][0].firstChild.classList.remove('fall');
    seasonMissions[seasonArrayIndex - 1][1].firstChild.classList.remove('fall');
    seasonMissions[seasonArrayIndex][0].firstChild.classList.add('winter');
    seasonMissions[seasonArrayIndex][1].firstChild.classList.add('winter');
  }

  for (let i = 0; i < 4; i++) {
    missionsDiv.children.item(i).children.item(1).firstChild.innerHTML = missionPoints[i];
  }

  if (allTime >= 28) {
    seasonMissions[3][0].firstChild.classList.remove('winter');
    seasonMissions[3][1].firstChild.classList.remove('winter');
    endGame();
  } else {
    seasonElementArray[seasonArrayIndex].classList.add('season-active');
    currentSeasonSpan.innerHTML = seasonArray[seasonArrayIndex];
    seasonMissions[seasonArrayIndex][0].classList.add('active-mission');
    seasonMissions[seasonArrayIndex][1].classList.add('active-mission');
    remainingTimeLocal = 7 - Math.abs(remainingTimeLocal);
    remainingTime.innerHTML = remainingTimeLocal;
  }
}

remainingTime.innerHTML = '7';
let remainingTimeLocal = 7;
function addTime() {
  allTime += elementTime;
  remainingTimeLocal -= elementTime;
  if (remainingTimeLocal <= 0) {
    setNextSeason();
  } else remainingTime.innerHTML = remainingTimeLocal;
}

function placedElement(node) {
  coordinates = node.id.split('-');
  x = parseInt(coordinates[0]);
  y = parseInt(coordinates[1]);

  let draw = usedTiles(x, y);

  let elementCount = 0;
  for (let i = 0; i < shape.length; i++) {
    for (let j = 0; j < shape[i].length; j++) {
      if (shape[i][j] === 1) elementCount++;
    }
  }

  let clear = true;
  for (let i = 0; i < 11; i++) {
    for (let j = 0; j < 11; j++) {
      if (draw.some(e => e[0] === i && e[1] === j) && game[i][j] !== 'base') {
        clear = false;
        break;
      }
    }
    if (!clear) break;
  }

  if (draw.length < elementCount || !clear) {
    wrongMove(draw);
  } else {
    draw.forEach(e => {
      let eX = e[0];
      let eY = e[1];
      let elementStyle = document.getElementById(eX + '-' + eY).style;
      elementStyle.backgroundImage = "url('./assets/tiles/" + type + "_tile.svg')";
      elementStyle.opacity = 1;
      game[eX][eY] = type;
    });
    usedElements.push(elements[elementIndex]);
    elements.splice(elementIndex, 1);
    addTime();
    nextElement();
  }
}

delegal(mapDiv, 'div[class="table-cell"]', 'click', e => {
  placedElement(e.target);
});
