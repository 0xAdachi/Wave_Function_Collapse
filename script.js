"use strict";

import { Tile } from "./Tile.js";

// ### Setting up the canvas ### //
/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas");
/** @param {CanvasRenderingContext2D} ctx */
const ctx = canvas.getContext("2d");
const scrHeight = document.documentElement.clientHeight;
ctx.canvas.width= scrHeight;
ctx.canvas.height= scrHeight;

const DIM = 50;  // GRID SIZE

// ### Setting Tile properties ### //
let zerothTile = new Tile(0);
let firstTile = new Tile(1);
let secondTile = new Tile(2);
let thirdTile = new Tile(3);
let fourthTile = new Tile(4);
let fifthTile = new Tile(5);
let sixthTile = new Tile(6);
let seventhTile = new Tile(7);
let eighthTile = new Tile(8);
let ninethTile = new Tile(9);
let tenthTile = new Tile(10);
let eleventhTile = new Tile(11);
let twelvethTile = new Tile(12);

let tileList = [zerothTile, firstTile, secondTile, thirdTile, fourthTile, fifthTile, sixthTile, seventhTile, eighthTile, ninethTile, tenthTile, eleventhTile, twelvethTile];
let allTiles = create2DArray(DIM, DIM);
let nextAllTiles = create2DArray(DIM, DIM);

const rando = () => Math.floor(Math.random() * tileList.length);
const randy = () => Math.floor(Math.random() * DIM);

// ### Random Seed ### //
allTiles[randy()][randy()] = tileList[rando()];
allTiles[randy()][randy()] = tileList[rando()];
allTiles[randy()][randy()] = tileList[rando()];
allTiles[randy()][randy()] = tileList[rando()];
allTiles[randy()][randy()] = tileList[rando()];

function draw() {
  // ### Draw the background ### //  
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, scrHeight, scrHeight);

  // ### Loop over the grid ### //
  for (let i = 0; i < DIM; i++) {
    for (let j = 0; j < DIM; j++) {

      allTiles[j][i]?.drawTile(ctx, i * scrHeight/DIM, j * scrHeight/DIM, scrHeight/DIM, scrHeight/DIM); // draw the tiles
      if (allTiles[j][i] !== null) {
        allTiles[j][i]?.collapseWaveFunction(nextAllTiles, i, j, DIM, tileList);  // collapse the wavefunction around the tile
      }
      
    }
  }

  allTiles = nextAllTiles;  // update to next frame 
  nextAllTiles = create2DArray(DIM, DIM);  // reset the frame after
  
  setTimeout(draw, 100);  // calls the draw function every 0.5 seconds
}

// ### Only start the drawing loop after every image has been loaded ### //
async function loadAllImages() {
  try {
    await zerothTile.loadImage();
    await firstTile.loadImage();
    await secondTile.loadImage();
    await thirdTile.loadImage();
    await fourthTile.loadImage();
    await fifthTile.loadImage();
    await sixthTile.loadImage();
    await seventhTile.loadImage();
    await eighthTile.loadImage();
    await ninethTile.loadImage();
    await tenthTile.loadImage();
    await eleventhTile.loadImage();
    await twelvethTile.loadImage();
    draw();
  } catch (error) {
    console.error("Loading Images Failed", error);
  }
}

loadAllImages();  // load the images

// ### One thing I learnt from this is Javascript is bad at 2D arrays ### //
// ### also techinally you can do the following by use Array.from and .map method ### //
function create2DArray(rows, cols) {
  let array = [];
  for (let i = 0; i < rows; i++) {
      array[i] = [];
      for (let j = 0; j < cols; j++) {
          array[i][j] = null;
      }
  }
  return array;
}
