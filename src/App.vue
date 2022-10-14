<template>
  <img alt="Vue logo" src="./assets/logo.png">
  {{ count }}
  {{ double }}
  {{ x }} {{ y }}
  <!-- <h1 v-if="loading">Loading...</h1> -->
  <!-- <img v-if="loaded" :src="result[0].url" /> -->
  <VModal :is-open="modalIsOpen" @close-modal="onModalClose">
    !!!!! my
  </VModal>
  <Suspense>
    <template #default>
      <AsyncShow />
      <DogShow />
    </template>
    <template #fallback>
      <div>
        Loading! ...
      </div>
    </template>
  </Suspense>
  <button @click="increate">+1</button>
  <button @click="updateGreeting">update</button>
  <button @click="openModal">open</button>
  <button @click="changeLang('en')">change1</button>
  <button @click="changeLang('cn')">change2</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { provide, computed, ref, reactive, toRefs, onUpdated, onRenderTracked, watch, onMounted, onUnmounted, onErrorCaptured } from "vue";
import useMousePosition from "../src/hooks/useMousePosition";
import useURLLoader from "../src/hooks/useURLLoader";
import VModal from './components/VModal.vue';
import AsyncShow from './components/AsyncShow.vue';
import DogShow from './components/DogShow.vue';
interface DataProps {
  count: number;
  double: number;
  increate: () => void;
}
interface DogRsult {
  messgae: string;
  status: string;
}
interface CatRsult {
  id: string;
  url: string;
  width: number;
  height: number;
}
export default defineComponent({
  name: "App",
  setup() {
    // provide 提供数据
    const lang = ref('en')

    provide('lang', lang) 

    const changeLang = (type: string) => {
      lang.value = type
    }
    const error = ref(null)
    onErrorCaptured((e: any) => {
      error.value = e
      return true
    })
    // const count = ref(0)
    // const double = computed(() => {
    //   return count.value * 2
    // })
    // const increate = () => {
    //   count.value++
    // }
    onMounted(() => {
      // console.log('mounted')
    });
    onUpdated(() => {
      // console.log('updated')
    });
    onRenderTracked((e) => {
      // console.log(e)
    });
    const data: DataProps = reactive({
      count: 0,
      double: computed(() => data.count * 2),
      increate: () => { data.count++; }
    });
    const greetings = ref("");
    const updateGreeting = () => {
      greetings.value += "hello! ";
    };
    const { x, y } = useMousePosition();
    const { result, loading, loaded } = useURLLoader<CatRsult[]>("https://api.thecatapi.com/v1/images/search?limit=1");
    // api.thecatapi.com/v1/images/search?limt=1
    watch(result, () => {
      if (result.value) {
        console.log(result.value[0].url);
      }
    });
    watch([greetings, () => data.count], (newValue, oldValue) => {
      console.log(newValue, oldValue);
      document.title = "updated" + greetings.value + data.count;
    });
    const refData = toRefs(data);
    const modalIsOpen = ref(false)
    const openModal = () => {
      console.log(modalIsOpen);
      modalIsOpen.value = true
    }
    const onModalClose = () => {
      modalIsOpen.value = false
    }
    return {
      ...refData,
      updateGreeting,
      greetings,
      x,
      y,
      result,
      loading,
      loaded,
      modalIsOpen,
      openModal,
      onModalClose,
      error,
      changeLang
    };
  },
  components: { VModal, AsyncShow, DogShow }
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
