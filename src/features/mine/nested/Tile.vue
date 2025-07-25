<template>
  <div
    class="tile"
    :class="{
      revealed: tile.revealed,
      flagged: tile.flagged,
      mine: tile.revealed && tile.mine,
    }"
    @click="onReveal"
    @contextmenu.prevent="onToggleFlag"
  >
    <span v-if="tile.revealed && !tile.mine && tile.adjacentMines > 0">
      {{ tile.adjacentMines }}
    </span>
    <span v-if="tile.flagged && !tile.revealed">🚩</span>
    <span v-if="tile.revealed && tile.mine">💣</span>
  </div>
</template>

<script setup lang="ts">
import type { Tile } from "../types/types";

defineProps<{
  tile: Tile;
}>();

const emit = defineEmits<{
  (e: "reveal"): void;
  (e: "flag"): void;
}>();

function onReveal() {
  emit("reveal");
}

function onToggleFlag() {
  emit("flag");
}
</script>

<style scoped lang="scss">
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

  &.revealed {
    background: #eee;
    cursor: default;
  }

  &.flagged {
    background: #fdd;
  }

  &.mine {
    background: #f99;
  }
}
</style>
