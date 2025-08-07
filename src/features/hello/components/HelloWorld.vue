<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>
      You’ve successfully created a project with
      <a href="https://vite.dev/" target="_blank" rel="noopener">Vite</a> +
      <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>.
    </h3>
     <p>Current Count: {{ counter.count }}</p>
  </div>

  <button type="button" @click="counter.increment">Increment</button>
</template>

<script setup lang='ts'>
import { useCounterStore } from '../stores/counter'

defineProps<{
  msg: string;
}>();

const counter = useCounterStore();

</script>

<style scoped lang="scss">

  h1 {
    font-weight: 500;
    font-size: 2.6rem;
  }

  h3 {
    font-size: 1.2rem;
  }

  .greetings {
    h1, h3 {
      text-align: center;

      @media (min-width: 1024px) {
        text-align: left;
      }
    }
  }
  
</style>
