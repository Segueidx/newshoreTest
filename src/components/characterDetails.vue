<template>
  <div v-if="currentCharacter!==undefined && currentCharacter!=null">
    <b-modal ref="characterDetailsModal" v-model="show" hide-footer :title="currentCharacter.name+' detailed info'">
      <b-row class="w-100 p-4">
        <b-col cols="12" md="6" class="d-flex flex-column p-0 img-container">
            <b-img v-bind="imageSetup"  :src="currentCharacter.image" />
        </b-col>
        <b-col cols="12" md="6" class="d-flex flex-column align-items-start px-2 py-0">
          <p class="text-left" v-if="currentCharacter.name!=''"><small class="font-weight-bold mr-1">Name:</small>{{currentCharacter.name}}</p>
          <p class="text-left" v-if="currentCharacter.ancestry!=''"><small class="font-weight-bold mr-1">Ancestry:</small>{{currentCharacter.ancestry}}</p>
          <p class="text-left" v-if="currentCharacter.hogwartsStudent!='' || currentCharaceter.hogwartsStaff !=''"><small class="font-weight-bold mr-1">Type:</small>{{currentCharacter.hogwartsStudent?'student':currentCharacter.hogwartsStaff?'staff':none}}</p>
          <p class="text-left" v-if="currentCharacter.species!='' && currentCharacter.gender!=''"><small class="font-weight-bold mr-1">specie/gender:</small>{{currentCharacter.species}}-{{currentCharacter.gender}}</p>
          <p class="text-left" v-if="currentCharacter.eyeColour!=''"><small class="font-weight-bold mr-1">Eye Colour:</small>{{currentCharacter.eyeColour}}</p>
          <p class="text-left" v-if="currentCharacter.hairColour!=''"><small class="font-weight-bold mr-1">Hair Colour:</small>{{currentCharacter.hairColour}}</p>
          <p class="text-left" v-if="currentCharacter.house!=''"><small class="font-weight-bold mr-1">House:</small>{{currentCharacter.house}}</p>
          <p class="text-left" v-if="currentCharacter.dateOfBirth!=''"><small class="font-weight-bold mr-1">Date of Birth:</small>{{currentCharacter.dateOfBirth}}</p>
          <p class="text-left" v-if="currentCharacter.yearOfBirth!=''"><small class="font-weight-bold mr-1">Year of Birth:</small>{{currentCharacter.yearOfBirth}}</p>
          <p class="text-left" ><small class="font-weight-bold mr-1">Wand:</small>{{currentCharacter.wood}}-{{currentCharacter.core}}</p>
          <p class="text-left" v-if="currentCharacter.patronus!=''"><small class="font-weight-bold mr-1">Patronus:</small>{{currentCharacter.patronus}}</p>
        </b-col>
      </b-row>

    </b-modal>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex';
  export default{
    name:'characterDetails',
    data(){
      return{
        show:false,
        imageSetup:{ width: 200, height: 'auto' }
      }
    },
    props:{
      showModal:{
        type:Boolean,
        required:true,
        default: false
      },
    },
    computed:mapGetters({
      currentCharacter:'getCurrentCharacter'
    }),
    watch:{
      showModal:{
        handler(val){
          if(val)
          this.show = val;
        }
      },
      show:{
        handler(val){
          if(!val)
          this.$emit('update:showModal',val);
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .img-container{
    align-items:start;
  }
  @media (max-width: 768px) {
    .img-container{
      align-items:center;
      padding-bottom:4rem;
    }
  }
</style>
