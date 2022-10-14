<template>
  <div class="app-2">
    <!-- {{hello}}
    {{count}} -->
    <!-- <button @click="count++">Add</button> -->
    <TestMessage :user="user" @change="showAlert"></TestMessage>
  </div>
</template>

<script setup lang="ts">
// import { ref } from "vue";
// import HelloWorld from "./components/HelloWorld.vue";
import TestMessage from "./components/TestMessage.vue";
// const hello = 'hello world'
// const count = ref(0)
const user = {
  name: 'viking',
  age: 30
}
const showAlert = (text: number) => {
  alert(text)
}
</script>

<style>

</style>
