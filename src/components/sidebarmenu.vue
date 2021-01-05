<template>
    <b-sidebar id="sidebarmenu" right  shadow v-if="houses.length>=0 && currentHouse!=null" bg-variant="white" >
        <b-row>
          <div class="burger">
            <span></span>
          </div>
        </b-row>
        <div class="w-100" v-if="houses.length>0">
          <sideMenuItem v-for="(house, houseIdx) in houses" :key="'menuHouse'+houseIdx" :house="house" />
        </div>
      </b-sidebar>
</template>
<script>
  import {mapGetters} from 'vuex';
  export default{
    name:'sidebarmenu',
    computed:mapGetters({
      houses:'getHouses',
      currentHouse:'getCurrentHouse'
    }),
    components:{
      sideMenuItem: () => import ('./sideMenuItem.vue')
    }
  }

</script>
}
<style lang="scss" scoped>

</style>
