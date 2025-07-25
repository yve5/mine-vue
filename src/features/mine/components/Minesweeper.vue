<template>
  <div class="minesweeper">
    <h1>Minesweeper</h1>
    <button @click="resetGame">Restart</button>

    <div class="grid" :style="{ gridTemplateColumns: `repeat(${cols}, 30px)` }">
      <Tile
        :key="index"
        :tile="tile"
        v-for="(tile, index) in tiles"
        @flag="() => toggleFlag(index)"
        @reveal="() => revealTile(index)"
      />
    </div>

    <p v-if="gameOver">💥 Game Over</p>
    <p v-if="won">🎉 You Win!</p>
  </div>
</template>

<script setup lang="ts">
import Tile from "../nested/Tile.vue";
import { useMinesweeper } from "../hooks/useMinesweeper";

const { tiles, rows, cols, gameOver, won, revealTile, toggleFlag, resetGame } = useMinesweeper();
</script>

<style scoped lang="scss">
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
