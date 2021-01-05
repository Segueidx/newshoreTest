<template>
<b-row v-b-hover="handleHover" class="px-3 pointer py-2 mx-0 align-items-center"  :class="{'bg-light':(currentHouse == house || isHovered)}" @click="toggleHouse(house)" >
  <b-img v-bind="imageSetup"  v-if="currentHouse!=null" class="img-fix fading" :src="'https://www.mariootalvaro.com/newshore/assets/'+house.name+'-logo.png'" />
  <div class="d-flex flex-column ml-4 align-items-start">
    <h2 class="mb-0 font-weigth-bold">{{house.name}}</h2>
    <b>Members: {{house.memberCount}}</b>
  </div>
</b-row>
</template>
<script>
  import {mapGetters} from 'vuex';
export default{
  name:'sideMenuItem',
  computed:mapGetters({
    houses:'getHouses',
    currentHouse:'getCurrentHouse'
  }),
  props:{
    house:{
      type:Object,
      required:true,
      default:()=>{}
    }
  },
  data(){
    return{
      imageSetup:{ width: 75, height: 'auto' },
      isHovered:false
    }
  },
  methods:{
    toggleHouse:function(val){
      this.$store.dispatch('setCurrentHouse',val);
    },
    handleHover(hovered) {
      this.isHovered = hovered;
    }
  }
}
</script>
<style lang="scss">
</style>
