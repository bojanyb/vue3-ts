<template>
    <Teleport to='#VModal'>
        <div id="center" v-if="isOpen">
            <h2>
                <slot>this is a modal</slot>
                {{lang}}
                {{ currentUser && currentUser.name}}
            </h2>
            <button @click="buttonClick">Close</button>
        </div>
    </Teleport>
</template>
<script lang="ts">
import { defineComponent, inject } from "vue";
export default defineComponent({
    props: {
        isOpen: Boolean,
    },
    emit: {
        'close-modal': null
    },
    setup(props, context) {
        // inject 拿到 provide 提供的数据
        const lang = inject('lang')
        const currentUser = inject<{ name: string }>('currentUser')
        console.log(currentUser, 'currentUser')
        const buttonClick = () => {
            context.emit('close-modal')
        }
        return {
            buttonClick,
            lang,
            currentUser
        }
    }
})
</script>
<style>
#center {
    width: 200px;
    height: 200px;
    border: 2px solid black;
    background: white;
    position: fixed;
    left: 50%;
    right: 50%;
    margin-left: 100px;
    margin-top: -100px;
}
</style>