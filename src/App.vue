<template>
  <img alt="Vue logo" src="./assets/logo.png">
  {{ count }}
  {{ double }}
  {{ x }} {{ y }}
  {{ result }}
  {{ loading }}
  {{ loaded }}
  <button @click="increate">+1</button>
  <button @click="updateGreeting">update</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { computed, ref, reactive, toRefs, onUpdated, onRenderTracked, watch, onMounted, onUnmounted } from "vue";
import useMousePosition from "../src/hooks/useMousePosition";
import useURLLoader from "../src/hooks/useURLLoader";
interface DataProps {
   count: number;
   double: number;
   increate: () => void;
}
export default defineComponent({
  name: 'App',
  setup() {
    // const count = ref(0)
    // const double = computed(() => {
    //   return count.value * 2
    // })
    // const increate = () => {
    //   count.value++
    // }
    onMounted(() => {
      console.log('mounted')
    })
    onUpdated(() => {
      console.log('updated')
    })
    onRenderTracked((e) => {
      console.log(e)
    })
    const data: DataProps = reactive({
      count: 0,
      double: computed(() => data.count * 2 ),
      increate: () => { data.count++ }
    })
    const greetings = ref('')
    const updateGreeting = () => {
      greetings.value += 'hello! '
    }
    const { x, y } = useMousePosition()
    const { result, loading, loaded } = useURLLoader('https://img2.baidu.com/it/u=2469235590,171567957&fm=253&fmt=auto&app=138&f=JPG?w=500&h=500')
    watch([greetings, () => data.count ], (newValue, oldValue) => {
      console.log(newValue, oldValue)
      document.title = 'updated' + greetings.value + data.count
    })
    const refData = toRefs(data)
    return {
      ...refData,
      updateGreeting,
      greetings,
      x,
      y,
      result, loading, loaded
    }
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
