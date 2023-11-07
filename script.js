const mapDiv = document.querySelector('#map');
const missionsDiv = document.querySelector('#missions-container');
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

const elements = [
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
      tableCell.style.backgroundImage = "url('./assets/tiles/mountain_tile.png')";
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

let available_missions = ['erdo_szele', 'almos_volgy', 'krumpliontozes', 'hatarvidek'];
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
  let letterSpan = document.createElement('span');
  letterSpan.innerHTML = mission_id[i];
  imgDiv.appendChild(letterSpan);
  missionsDiv.appendChild(imgDiv);
}

// ----------------------------------------

let elementTime;
let time;
let elementIndex;
let type;
let shape;
function nextElement() {
  if (elements.length === 0) {
    console.log('vege');
  }
  elementIndex = Math.floor(Math.random() * elements.length);
  elementTime = elements[elementIndex]['time'];
  timeNumber.innerHTML = elementTime;
  type = elements[elementIndex]['type'];
  shape = elements[elementIndex]['shape'];

  while (nextElementDiv.firstChild) {
    nextElementDiv.removeChild(nextElementDiv.firstChild);
  }

  // --- Megjeleníti a következő elemet-------

  for (let i = 0; i < 3; i++) {
    let tableRow = document.createElement('div');
    for (let j = 0; j < 3; j++) {
      let tableCell = document.createElement('div');
      tableCell.classList.add('element-matrix-cell');
      if (shape[i][j] === 1) {
        tableCell.style.backgroundImage = "url('./assets/tiles/" + type + "_tile.png')";
      }
      tableRow.appendChild(tableCell);
    }
    nextElementDiv.appendChild(tableRow);
  }
}
// -----------------------------------------
nextElement();
rotateButton.addEventListener('click', () => nextElement());

// ---- Küldetés számítás ------

let springPoint = 0;
let summerPoint = 0;
let fallPoint = 0;
let winterPoint = 0;

let missionPoints = missions.map(mission => ({ [mission]: 0 }));

console.log(missionPoints);

function erdo_szele_mission() {
  for (let i = 0; i < 11; i++) {
    if (game[0][i] === 'forest') {
      missionPoints.erdo_szele++;
    }
  }

  for (let i = 0; i < 11; i++) {
    if (game[10][i] === 'forest') missionPoints.erdo_szele++;
  }

  for (let i = 0; i < 11; i++) {
    if (game[i][10] === 'forest') missionPoints.erdo_szele++;
  }

  for (let i = 0; i < 11; i++) {
    if (game[i][0] === 'forest') missionPoints.erdo_szele++;
  }
}

// ------------------------------

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

function drawShape(node) {
  coordinates = node.id.split('-');
  x = parseInt(coordinates[0]);
  y = parseInt(coordinates[1]);
  let draw = usedTiles(x, y);

  draw.forEach(e => {
    let elementStyle = document.getElementById(e[0] + '-' + e[1]).style;
    elementStyle.backgroundImage = "url('./assets/tiles/" + type + "_tile.png')";
    elementStyle.opacity = 0.7;
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
      cell.style.backgroundImage = "url('./assets/tiles/" + type + "_tile.png')";
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

function wrongMove(draw) {
  draw.forEach(e => {
    let eX = e[0];
    let eY = e[1];
    let el = document.getElementById(eX + '-' + eY);
    el.classList.add('wrong-border');
    setTimeout(() => el.classList.remove('wrong-border'), 400);
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
  seasonElementArray[seasonArrayIndex].classList.remove('season-active');
  seasonMissions[seasonArrayIndex][0].classList.remove('active-mission');
  seasonMissions[seasonArrayIndex][1].classList.remove('active-mission');

  //todo pontok, todo ha tél vége van arrayindex = 3
  seasonArrayIndex++;
  if (seasonArrayIndex === 1) {
    erdo_szele_mission();
    console.log(missionPoints.erdo_szele);

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
  seasonElementArray[seasonArrayIndex].classList.add('season-active');
  currentSeasonSpan.innerHTML = seasonArray[seasonArrayIndex];
  seasonMissions[seasonArrayIndex][0].classList.add('active-mission');
  seasonMissions[seasonArrayIndex][1].classList.add('active-mission');
  remainingTimeLocal = 7 - Math.abs(remainingTimeLocal);
  remainingTime.innerHTML = remainingTimeLocal;
}

remainingTime.innerHTML = '7';
let remainingTimeLocal = 7;
function addTime() {
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
      elementStyle.backgroundImage = "url('./assets/tiles/" + type + "_tile.png')";
      elementStyle.opacity = 1;
      game[eX][eY] = type;
    });
    addTime();
    nextElement();
  }
}

delegal(mapDiv, 'div[class="table-cell"]', 'click', e => {
  placedElement(e.target);
});
