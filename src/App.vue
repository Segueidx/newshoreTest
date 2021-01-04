<template>
  <div id="app">
    <navbar />
    <router-view class="pt-5"/>
    <footerbar />
  </div>
</template>
<script>
  export default{
    components:{
      navbar: () => import ('./components/navbar.vue'),
      footerbar: () => import ('./components/footerbar.vue')
    }
  }
</script>
<style lang="scss">

@import './css/common.scss';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size:.8rem;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: text-primary-color;
}
p{
  margin-bottom:0px;
}
.carousel-3d-slide{
  background-color:transparent !important;
}

</style>
