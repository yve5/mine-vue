<template>
  <div class="minesweeper">
    <h1>Minesweeper</h1>
    <button @click="resetGame">Restart</button>

    <div class="grid" :style="{ gridTemplateColumns: `repeat(${cols}, 30px)` }">
      <Tile
        v-for="(tile, index) in tiles"
        :key="index"
        :tile="tile"
        @flag="() => toggleFlag(index)"
        @reveal="() => revealTile(index)"
      />
    </div>

    <p v-if="gameOver">💥 Game Over</p>
    <p v-if="won">🎉 You Win!</p>
  </div>
</template>

<script setup lang="ts">
import Tile from "../nested/MineTile.vue";
import { useMinesweeper } from "../composables/useMinesweeper";

const { tiles, cols, gameOver, won, revealTile, toggleFlag, resetGame } = useMinesweeper();
</script>

<style scoped lang="scss">

  .minesweeper {
    text-align: center;
    font-family: sans-serif;
  }

  .grid {
    gap: 2px;
    display: grid;
    margin-top: 10px;
    justify-content: center;
  }
  
</style>
