<template>
  <b-container class="main-container">
      <b-row class="d-flex  align-items-center w-100 justify-content-center">
        <houseSelector/>
      </b-row>
      <b-row class="d-flex justify-content-end">
        <filterBar/>
      </b-row>
      <b-row>
        <b-col cols="2" class="d-none d-md-flex" >
            <b-img v-if="currentHouse!=null" class="img-fix fading" :src="'https://www.mariootalvaro.com/newshore/assets/'+currentHouse.name+'-logo.png'" />
        </b-col>
        <b-col cols="12" md="10">
          <div v-for="(character, characterKey) in  characters" :key="'char'+characterKey" class="fading">
              <characterCard :character="character" :showModal.sync="showModal" />
          </div>
        </b-col>
      </b-row>
      <sidebarmenu />
      <characterDetails :showModal.sync="showModal"/>
  </b-container>
</template>
<script>
  import {mapGetters} from 'vuex';
  export default{
    name:"Home",
    data(){
      return{
        showModal:false,
      }
    },
    components:{
      characterDetails: () => import ('../components/characterDetails.vue'),
      characterCard: () => import ('../components/characterCard.vue'),
      houseSelector: () => import ('../components/houseSelector.vue'),
      filterBar: () => import ('../components/filterBar.vue'),
      sidebarmenu: () => import ('../components/sidebarmenu.vue')
    },
    computed:mapGetters({
      characters:'getCharacters',
      currentHouse:'getCurrentHouse',
      error:'getError',
    }),
    created(){
      this.$store.dispatch('getCharacters');
    },
    methods:{
      checkIfHasQuery: function(){
        (this.$route.query.house !==undefined && this.$route.query.house != this.currentHouse.name )
        this.$store.commit('setCurrentHouseByName',this.$route.query.house);
      }
    },
    watch:{
      error:{handler(val){
        if(val) this.$bvToast.toast(`We have some issues now, Please try again later.`,{title:'Warning',variant:'warning'});
      }},
      characters:{
        handler(val){
          if(val.length>0)
            this.checkIfHasQuery();
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
    .main-container{
      min-height:97vh;
    }
</style>
