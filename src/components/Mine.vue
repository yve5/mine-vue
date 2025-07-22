<template>
  <div class="minesweeper">
    <h1>Minesweeper</h1>

    <button @click="resetGame">Restart</button>

    <p v-if="gameOver">💥 Game Over</p>
    <p v-if="won">🎉 You Win!</p>
    <div class="grid" :style="{ gridTemplateColumns: 'repeat(' + cols + ', 30px)' }">
      <div
        v-for="(tile, index) in tiles"
        :key="index"
        class="tile"
        :class="{
          revealed: tile.revealed,
          flagged: tile.flagged,
          mine: tile.revealed && tile.mine,
        }"
        @click.left="revealTile(index)"
        @contextmenu.prevent="toggleFlag(index)"
      >
        <span v-if="tile.revealed && !tile.mine && tile.adjacentMines > 0">
          {{ tile.adjacentMines }}
        </span>
        <span v-if="tile.flagged && !tile.revealed">🚩</span>
        <span v-if="tile.revealed && tile.mine">💣</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const rows = 10;
const cols = 10;
const mineCount = 15;

const tiles = ref([]);
const gameOver = ref(false);
const won = ref(false);

function generateGrid() {
  const grid = Array(rows * cols)
    .fill()
    .map(() => ({
      mine: false,
      revealed: false,
      flagged: false,
      adjacentMines: 0,
    }));

  // Place mines
  let placed = 0;

  while (placed < mineCount) {
    const index = Math.floor(Math.random() * grid.length);

    if (!grid[index].mine) {
      grid[index].mine = true;
      placed++;
    }
  }

  // Count adjacent mines
  for (let i = 0; i < grid.length; i++) {
    const x = i % cols;
    const y = Math.floor(i / cols);
    let count = 0;

    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (dx === 0 && dy === 0) continue;

        const nx = x + dx;
        const ny = y + dy;
        const ni = ny * cols + nx;

        if (nx >= 0 && nx < cols && ny >= 0 && ny < rows && grid[ni]?.mine) {
          count++;
        }
      }
    }
    grid[i].adjacentMines = count;
  }

  return grid;
}

function revealTile(index) {
  const tile = tiles.value[index];
  if (tile.revealed || tile.flagged || gameOver.value) return;

  tile.revealed = true;

  if (tile.mine) {
    gameOver.value = true;
    revealAllMines();
    return;
  }

  if (tile.adjacentMines === 0) {
    // Reveal neighbors
    const x = index % cols;
    const y = Math.floor(index / cols);

    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        const nx = x + dx;
        const ny = y + dy;
        const ni = ny * cols + nx;

        if (nx >= 0 && nx < cols && ny >= 0 && ny < rows && ni !== index) {
          revealTile(ni);
        }
      }
    }
  }

  checkWin();
}

function revealAllMines() {
  tiles.value.forEach((tile) => {
    if (tile.mine) tile.revealed = true;
  });
}

function toggleFlag(index) {
  const tile = tiles.value[index];
  if (tile.revealed || gameOver.value) return;
  tile.flagged = !tile.flagged;
}

function checkWin() {
  if (gameOver.value) return;
  const unrevealed = tiles.value.filter((t) => !t.revealed);

  if (unrevealed.length === mineCount) {
    won.value = true;
    revealAllMines();
  }
}

function resetGame() {
  tiles.value = generateGrid();
  gameOver.value = false;
  won.value = false;
}

resetGame();
</script>

<style>
.minesweeper {
  font-family: sans-serif;
  text-align: center;
}
.grid {
  display: grid;
  gap: 2px;
  margin-top: 10px;
  justify-content: center;
}
.tile {
  width: 30px;
  height: 30px;
  background: #ccc;
  border: 1px solid #888;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-weight: bold;
}
.tile.revealed {
  background: #eee;
  cursor: default;
}
.tile.flagged {
  background: #fdd;
}
.tile.mine {
  background: #f99;
}
</style>
