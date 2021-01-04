<template>
  <div id="footer" class="py-2 w-100">
    <b-container class="d-flex">
    <p>Copyright © Magician School Education - 2021 - All rigths reserved </p>
    </b-container>
  </div>
</template>
<script>
  export default{
    name:"navbar",
    data(){
      return{

      }
    },
  }
</script>
<style lang="scss" scoped>
@import '../css/common.scss';
  #footer {
    background-color: $primary-color;
    padding: 30px;
    color: $text-white;


    top:0;
    a {
      font-weight: bold;
      color: $text-white;
      &.router-link-exact-active {
        color: $text-white;
      }
    }
  }
</style>
