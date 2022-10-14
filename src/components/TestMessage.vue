<template>
    <div>
        {{user.name}}
        {{user.age}}
    </div>
    <button @click="onChange">change</button>
</template>
<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
interface IUser {
    name: string;
    age: number
}
interface IEvents {
    (e: 'change', age: number): void
}
const props = defineProps<{user: IUser}>()


const emit = defineEmits<IEvents>()
const onChange = () => {
    console.log(props)
    emit('change', props.user.age)
}
</script>
<style >
    
</style>