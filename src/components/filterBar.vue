<template>
    <div class="w-100 d-flex justify-content-end">
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
          <p class="mb-0 pointer" @click="changeOrder(true)"><i class="arrow up"></i></p>
          <p class="pointer" @click="changeOrder(false)"><i class="arrow down"></i></p>
        </div>
      </div>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex';
    export default{
      name:'filterBar',
      data(){
        return{
            stringToFilter:'',
            orderBy:'',
            lastOrder:'',
            orderAsc:true,
        }
      },
      computed:mapGetters({
        currentHouse:'getCurrentHouse'
      }),
      mounted(){
          this.filterByHouse();
      },
        methods:{
          filterByValue: function(string) {
            this.$store.commit('filterByValue',string);
          },
          filterByHouse: function() {
            this.$store.commit('filterByHouse');
          },
          changeOrder: function(val){
            if(val == this.lastOrder){
              this.$bvToast.toast(`Already ordered in this way.`,{title:'Info',variant:'info'});
            }
            else{
                  this.$store.commit('sortByProperty',{prop:this.orderBy,order:val});
            }
            this.lastOrder = val;
          },
          sortByProperty: function(property){
            this.$store.commit('sortByProperty',{prop:property,order:this.orderAsc});
           }
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
          orderAsc:{
            handler(){
              this.sortByProperty('name');
            }
          },
          currentHouse:{
            handler(val){
                this.filterByHouse();
                if(this.$route.query.house !==undefined && this.$route.query.house != val.name )
                this.$router.push({ path: '/', query: { house: val.name }})
            }
          }
        }
    }
</script>
<style lang="scss" scoped>
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
  .fix-slider{
    max-height:150px !important;
  }
  .min-line-height{
    line-height:0px;
  }
</style>
