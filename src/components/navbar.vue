<template>
  <div id="nav" class="py-2 position-fixed w-100 ">
    <b-container class="d-flex justify-content-between align-items-center">
      <router-link to="/">
        <b-img v-bind="logoSetup" class="mr-2" src="https://www.mariootalvaro.com/newshore/assets/logo.png" />
        Magician School Education
      </router-link> <p class="px-2 d-flex align-items-center"></p>
     <b-button variant="link" v-b-toggle.sidebarmenu>
       <div class="burger">
         <span></span>
       </div>
     </b-button>
    </b-container>
  </div>
</template>
<script>
  export default{
    name:"navbar",
    data(){
      return{
        logoSetup: { width: 25, height: 25 }
      }
    },
  }
</script>
<style lang="scss" scoped>
@import '../css/common.scss';
@import '../css/burgerMenu.scss';
  #nav {
    background-color: $primary-color;
    padding: 30px;
    color: $text-white;
    z-index:10;
    a {
      font-weight: bold;
      color: $text-white;
      &.router-link-exact-active {
        color: $text-white;
      }
    }
  }
</style>
