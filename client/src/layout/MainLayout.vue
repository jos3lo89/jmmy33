<script setup> 
import NavBar from '../components/NavBar.vue';
</script>

<template>

<NavBar></NavBar>
<main>
    <slot name="mainSlot">
        
    </slot>
</main>

</template>

<style scoped>

</style>