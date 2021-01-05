<template>
  <div class="w-100 d-flex flex-column " v-if="houses!==undefined && houses!=null &&currentHouse!=null ">
    <div @click="toggleHouse('prev')" class="pointer fading text-muted"  >
      <p >{{getHouse('prev')}}</p>
    </div>
    <div class="d-flex flex-column justify-content-center">
      <h2 class="mb-0 font-weigth-bold">{{currentHouse.name}}</h2>
      <b>Members: {{currentHouse.memberCount}}</b>
    </div>
    <div @click="toggleHouse('next')" class="pointer fading text-muted"  >
        <p >{{getHouse('next')}}</p>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex';
  export default{
        name:'houseSelector',
        computed:mapGetters({
          houses:'getHouses',
          currentHouse:'getCurrentHouse'
        }),
        data(){
          return{
              currentIdx:0,
              next:false
          }
        },
        methods:{
          toggleHouse:function(val){
            if(val=='prev'){
              this.next=false;
              if(this.currentIdx-1<0) {
                 this.currentIdx= this.houses.length-1;
                }
              else {
                this.currentIdx--;
              }
            }
            else if(val=='next')
            {
              this.next=true;
              if(this.currentIdx+1>this.houses.length-1) {
                   this.currentIdx= 0;
               }
              else {
                this.currentIdx++;
               }
            }
            this.$store.dispatch('setCurrentHouse', this.houses[this.currentIdx]);
          },
          getHouse: function(val){
            if(this.houses.length>0){
              if(val=='prev'){
                if(this.currentIdx-1<0)
                    return this.houses[this.houses.length-1].name;
                else return this.houses[this.currentIdx-1].name;
              }
              else if(val=='next')
              {
                if(this.currentIdx+1>this.houses.length-1)
                    return this.houses[0].name;
                else return this.houses[this.currentIdx+1].name;
              }
            }
          }
        }
  }
</script>
<style lang="scss" scoped>

</style>
