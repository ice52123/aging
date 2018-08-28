<template>
    <div class="wrapper">
        <v-head></v-head>
        <router-view></router-view>
    </div>
</template>

<script>
    import vHead from './header.vue'
    export default {
      components: {
        vHead
      }
    }
</script>
<style>
    html,body,.wrapper{
      height: 100%;
    }
</style>