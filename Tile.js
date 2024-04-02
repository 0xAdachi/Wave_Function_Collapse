const UP = 0;
const RIGHT = 1;
const DOWN = 2;
const LEFT = 3;

export class Tile {
  tileImg;
  edges;
  
  constructor(type) {
    this.type = type || 1;
    this.collapsed = false;
    this.tileImg = new Image();
    // ### Socket types ### //
    switch (this.type) {
      case 0:
        this.edges = ["AAA", "AAA", "AAA", "AAA"];
        break;
      
      case 1:
        this.edges = ["BBB", "BBB", "BBB", "BBB"];
        break;
      
      case 2:
        this.edges = ["BBB", "BCB", "BBB", "BBB"];
        break;
      
      case 3:
        this.edges = ["BBB", "BDB", "BBB", "BDB"];
        break;
      
      case 4:
        this.edges = ["ABB", "BCB", "BBA", "AAA"];
        break;

      case 5:
        this.edges = ["ABB", "BBB", "BBB", "BBA"];
        break;

      case 6:
        this.edges = ["BBB", "BCB", "BBB", "BCB"];
        break;
    
      case 7:
        this.edges = ["BDB", "BCB", "BDB", "BCB"];
        break;
    
      case 8:
        this.edges = ["BDB", "BBB", "BCB", "BBB"];
        break;
    
      case 9:
        this.edges = ["BCB", "BCB", "BBB", "BCB"];
        break;
    
      case 10:
        this.edges = ["BCB", "BCB", "BCB", "BCB"];
        break;
    
      case 11:
        this.edges = ["BCB", "BCB", "BBB", "BBB"];
        break;
    
      case 12:
        this.edges = ["BBB", "BCB", "BBB", "BCB"];
        break;
    
      default:
        break;
    }
  }

  // ### DRAW METHOD ### //
  drawTile(ctx, x, y, width, height) {
    ctx.drawImage(this.tileImg, x, y, width, height);
  }

  collapse(tileList) {
    let waveFunction = [0, 0, 0, 0];
    let upWaveFunction = [];
    let rightWaveFunction = [];
    let downWaveFunction = [];
    let leftWaveFunction = [];
    for (let tile of tileList) {
      if (this.edges[UP] == reverseString(tile.edges[DOWN])) upWaveFunction.push(tile.type);
      if (this.edges[RIGHT] == reverseString(tile.edges[LEFT])) rightWaveFunction.push(tile.type);
      if (this.edges[DOWN] == reverseString(tile.edges[UP])) downWaveFunction.push(tile.type);
      if (this.edges[LEFT] == reverseString(tile.edges[RIGHT])) leftWaveFunction.push(tile.type);
    }

    // ### Collapse the SuperPosition ### //
    
    if (upWaveFunction.length > 0) waveFunction[UP] = upWaveFunction[Math.floor(Math.random()*upWaveFunction.length)];
    if (rightWaveFunction.length > 0) waveFunction[RIGHT] = rightWaveFunction[Math.floor(Math.random()*rightWaveFunction.length)];
    if (downWaveFunction.length > 0) waveFunction[DOWN] = downWaveFunction[Math.floor(Math.random()*downWaveFunction.length)];
    if (leftWaveFunction.length > 0) waveFunction[LEFT] = leftWaveFunction[Math.floor(Math.random()*leftWaveFunction.length)];

    return waveFunction;
  }

  // ### Boundary checking and applying the collapsed wave function ### //
  collapseWaveFunction(nextAllTiles, i, j, dim, tileList) {

    nextAllTiles[j][i] = this;
    nextAllTiles[j][i].collapsed = true;

    // ### Top neighbor ### //
    if (j - 1 >= 0) {
      if (nextAllTiles[j-1][i]?.collapsed !== true) {
        nextAllTiles[j-1][i] = tileList[this.collapse(tileList)[UP]];
        nextAllTiles[j-1][i].collapsed = true;
      }
    }

    // ### Bottom neighbor ### //
    if (j + 1 < dim) {
      if (nextAllTiles[j+1][i]?.collapsed !== true) {
        nextAllTiles[j+1][i] = tileList[this.collapse(tileList)[DOWN]];
        nextAllTiles[j+1][i].collapsed = true;
      }
    }

    // ### Right neighbor ### //
    if (i + 1 < dim) {
      if (nextAllTiles[j][i+1]?.collapsed !== true) {
        nextAllTiles[j][i+1] = tileList[this.collapse(tileList)[RIGHT]];
        nextAllTiles[j][i+1].collapsed = true;
      }
    }

    // ### Left neighbor ### //
    if (i - 1 >= 0) {
      if (nextAllTiles[j][i-1]?.collapsed !== true) {
        nextAllTiles[j][i-1] = tileList[this.collapse(tileList)[LEFT]];
        nextAllTiles[j][i-1].collapsed = true;
      }
    }

  }

  // ### Load the images for the tiles depending on type ### //
  loadImage() {
    let imgSrc = "./assets/0.png";
    if(this.type == 0) imgSrc = "./assets/0.png";
    if(this.type == 1) imgSrc = "./assets/1.png";
    if(this.type == 2) imgSrc = "./assets/2.png";
    if(this.type == 3) imgSrc = "./assets/3.png";
    if(this.type == 5) imgSrc = "./assets/5.png";
    if(this.type == 6) imgSrc = "./assets/6.png";
    if(this.type == 7) imgSrc = "./assets/7.png";
    if(this.type == 8) imgSrc = "./assets/8.png";
    if(this.type == 9) imgSrc = "./assets/9.png";
    if(this.type == 10) imgSrc = "./assets/10.png";
    if(this.type == 11) imgSrc = "./assets/11.png";
    if(this.type == 12) imgSrc = "./assets/12.png";

      return new Promise((resolve, reject) => {
      this.tileImg.src = imgSrc;
      this.tileImg.onload = () => resolve(this.tileImg);
      this.tileImg.onerror = reject;
    });
  }

  // ### useless getter method that I never used ### //
  get tileType() { return this.type }
}

/** @param {String} str */
const reverseString = (str) => str.split("").reverse().join("");