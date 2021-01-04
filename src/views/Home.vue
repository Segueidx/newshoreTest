<template>
  <b-container>
      <b-row class="d-flex  align-items-center w-100 justify-content-center">
        <div @click="toggleHouse('prev')" class="pointer mr-4" >
          <p>{{getHouse('prev')}}</p>
        </div>
        <div class="d-flex flex-column justify-content-center">
          <h2 class="mb-0">{{currentHouse.name}}</h2>
          <p>Members: {{currentHouse.memberCount}}</p>
        </div>
        <div @click="toggleHouse('next')" class="pointer ml-4" >
            <p>{{getHouse('next')}}</p>
        </div>
      
      </b-row>
      <b-row class="d-flex justify-content-end">
        <div class="d-flex align-items-center">
            <label for="namefilter" class="mb-0 mr-2">Filter by name:</label>
            <input type="text" id="nameFilter" v-model="stringToFilter" />
        </div>
        <div class="d-flex align-items-center ml-2">
          <label for="orderSelect"  class="mb-0 mr-2">Order By:</label>
          <select id="orderSelect" name="Order By" v-model="orderBy">
            <option value="name">Name</option>
            <option value="lastname" selected>Lastname</option>
          </select>
          <div class="min-line-height mx-2">
            <p class="mb-0 pointer" @click="changeOrder(true)"> <i class="arrow up"></i></p>
            <p class="pointer" @click="changeOrder(false)"> <i class="arrow down"></i></p>
          </div>
        </div>
      </b-row>
    <b-row>
      <b-col cols="2" >
          <b-img  class="img-fix fading" :src="'https://www.mariootalvaro.com/newshore/assets/'+currentHouse.name+'-logo.png'" />
      </b-col>
      <b-col cols="10">
        <div v-for="(character, characterKey) in  sortedCharacters" :key="'char'+characterKey" class="fading">
            <characterCard :character="character" :showModal.sync="showModal" />
        </div>
      </b-col>
    </b-row>
    <characterDetails :showModal.sync="showModal"/>
  </b-container>
</template>
<script>
  import {mapGetters} from 'vuex';

  export default{
    name:"Home",
    data(){
      return{
        houses:[],
        currentHouse:{},
        sortedCharacters:[],
        currentIdx:0,
        orderBy:'',
        showModal:false,
        lastOrder:'',
        orderAsc:true,
        stringToFilter:'',
      }
    },
    components:{
      characterDetails: () => import ('../components/characterDetails.vue'),
      characterCard: () => import ('../components/characterCard.vue'),
    },
    computed:mapGetters({
      characters:'getCharacters'
    }),
    created(){
      this.$store.dispatch('getCharacters');
    },
    methods:{
      toggleHouse:function(val){
        if(val=='prev'){
          if(this.currentIdx-1<0) {
             this.currentIdx= this.houses.length-1;
            }
          else {
            this.currentIdx--;
          }
        }
        else if(val=='next')
        {
          if(this.currentIdx+1>this.houses.length-1) {
               this.currentIdx= 0;
           }
          else {
            this.currentIdx++;
           }

        }
         this.currentHouse = this.houses[this.currentIdx];

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

      },
      getHouses: function(){
        this.characters.forEach((item) => {
          let validCharacter =  (item.hogwartsStudent || item.hogwartsStaff);
          let finded = false;
          let findedIdx = 0;
          if(item.house != '' && validCharacter){
            for (var i = 0; i < this.houses.length; i++) {
              if(this.houses[i].name == item.house) {finded = true;   findedIdx = i; break;}
            }
              if(!finded){
                var obj = {name:item.house , memberCount:1}
                this.houses.push(obj);
              }
              else{
                this.houses[findedIdx].memberCount++;
              }
          }
          if(validCharacter)
          this.sortedCharacters.push(item);

          this.currentHouse = this.houses[0];
        });

      },
      filterByValue: function(string) {
            this.sortedCharacters = this.characters.filter((el) =>
             el.name.toLowerCase().includes(string.toLowerCase()) && el.house==this.currentHouse.name );
      },
      filterByHouse: function() {

        if(this.currentHouse!==undefined)
            this.sortedCharacters = this.characters.filter((el) =>
            el.house==this.currentHouse.name && ( el.hogwartsStudent || el.hogwartsStaff) );
      },
      changeOrder: function(val){
          this.orderAsc = val;
          if(val == this.lastOrder){
            this.$bvToast.toast(`Already ordered in this way.`,{title:'Info',variant:'info'});
          }
          this.lastOrder = val;

          this.sortByProperty('name');

      },
     sortByProperty: function(property){

       if(this.orderBy=='')this.orderBy = 'name';

       if(this.orderAsc)
       this.sortedCharacters.sort(function (a, b) {
             if (a[property] < b[property]) {
                 return -1;
             }
             if (b[property] < a[property]) {
                 return 1;
             }
             return 0;
         });
       else{
        this.sortedCharacters.sort(function (a, b) {
              if (a[property] > b[property]) {
                  return -1;
              }
              if (b[property] > a[property]) {
                  return 1;
              }
              return 0;
          });
        }
      },
    },
    watch:{
      stringToFilter:{
        handler(val){
          this.filterByValue(val);
        }
      },
      orderBy:{
        handler(val){
          if(val!='')
          this.sortByProperty('name');
        }
      },
      currentHouse:{
        handler(){
              this.filterByHouse();
        }
      },
      characters:{
        handler(val){
          if(val!==undefined) this.getHouses();
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .min-line-height{
    line-height:0px;
  }
  .fix-slider{
    max-height:150px !important;
  }
  .arrow {
  border: solid black;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
}
      .up {
      transform: rotate(-135deg);
      -webkit-transform: rotate(-135deg);
    }

    .down {
      transform: rotate(45deg);
      -webkit-transform: rotate(45deg);
    }
</style>
