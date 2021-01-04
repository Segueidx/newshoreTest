<template>
  <div class="my-1 py-2">
    <b-card v-b-hover="handleHover" :class="{'shadow-sm':isHovered}" no-body  border-variant="light" v-if="character!==undefined && character !=={}" class="pointer p-1 py-2 ">
        <b-row class="d-flex align-items-center">
           <b-col cols="3" md="2" class="px-0">
             <b-avatar variant="info" :size="avatarSize" :src="character.image"></b-avatar>
           </b-col>
           <b-col cols="9" md="10" class="d-flex align-items-center justify-content-around">
             <b-row class="w-100">
               <b-col cols="6" class="d-flex flex-column align-items-start p-0">
                 <p class="text-left"><small class="font-weight-bold mr-1">Name:</small>{{character.name}}</p>
                 <p class="text-left" v-if="character.ancestry!=''"><small class="font-weight-bold mr-1">Ancestry:</small>{{character.ancestry}}</p>
                 <p class="text-left"><small class="font-weight-bold mr-1">Type:</small>{{character.hogwartsStudent?'student':character.hogwartsStaff?'staff':none}}</p>
                 <p class="text-left"><small class="font-weight-bold mr-1">specie/gender:</small>{{character.species}}-{{character.gender}}</p>
               </b-col>
               <b-col cols="6" class="d-flex flex-column align-items-end justify-content-center p-0">
                 <b-button variant="info" @click="toggleModal()" class="mr-4">Show info</b-button>
               </b-col>
             </b-row>
          </b-col>
        </b-row>
    </b-card>
  </div>
</template>
<script>
  export default{
    name:"characterCard",
    props:{
      character:{
        type:Object,
        required:true,
        default: () => {}
      },
      showModal:{
        type:Boolean,
        required:true,
        default: false
      },
    },
    data() {
     return {
       avatarSize:'5rem',
       isHovered: false
     }
   },
    methods:{
      toggleModal: function(){
        this.$store.dispatch('setCurrentCharacter',this.character);
        this.$emit('update:showModal',true);
      },
      handleHover(hovered) {
        this.isHovered = hovered
        if(hovered)
        this.avatarSize = '5.5rem';
        else
          this.avatarSize = '5rem';
      }
    }
  }
</script>
<style lang="scss" scoped>

</style>
