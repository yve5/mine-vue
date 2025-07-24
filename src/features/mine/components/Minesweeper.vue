<template>
  <div class="minesweeper">
    <h1>Minesweeper</h1>
    <button @click="resetGame">Restart</button>
    <p v-if="gameOver">💥 Game Over</p>
    <p v-if="won">🎉 You Win!</p>

    <div class="grid" :style="{ gridTemplateColumns: `repeat(${cols}, 30px)` }">
      <Tile
        v-for="(tile, index) in tiles"
        :key="index"
        :tile="tile"
        @reveal="() => revealTile(index)"
        @flag="() => toggleFlag(index)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Tile from "../nested/Tile.vue";
import { useMinesweeper } from "../composables/useMinesweeper";

const { tiles, rows, cols, gameOver, won, revealTile, toggleFlag, resetGame } = useMinesweeper();
</script>

<style scoped>
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
</style>
