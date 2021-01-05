import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import * as api from '../api/api.js'
/*Estados de Vuex, contiene todas las variables accesibles desde la aplicación*/

export const store = new Vuex.Store({
   state: {
      charactersToDisplay:[],
      characters:[],
      currentCharacter:null,
      houses:[],
      currentHouse: null,
      error:false
    },
     getters: {
      getCharacters: state => state.charactersToDisplay,
      getCurrentCharacter: state => state.currentCharacter,
      getHouses:state => state.houses,
      getCurrentHouse:state => state.currentHouse,
      getError: state => state.error

    },
     actions:{
       setCurrentHouse({commit},data){
           commit('setCurrentHouse',{data})
       },
       setCurrentCharacter({commit},data){
           commit('setCharacter',{data})
       },
        getCharacters({commit}){
          api.getCharacters().then(data=>{
            commit('setCharacters',{data})
          })
        },
        getStudents({commit}){
          api.getStudents().then(data=>{
            commit('setCharacters',{data})
          })
        },
        getStaff({commit}){
          api.getStaff().then(data=>{
            commit('setCharacters',{data})
          })
        },
        getCharactersbyHouse({commit},data){
          api.getCharactersbyHouse(data).then(data=>{
            commit('setCharacters',{data})
          })
        }
    },
    /* ejecucion de acciones previamente descritas*/
   mutations: {
    //Mutación de datos base
      setCharacters(state,{data}){

        if(data!==undefined && data.isAxiosError===undefined)
        {
            state.characters = [];
            state.charactersToDisplay = [];
            let tempHouses = [];
            let tempCharacters = [];
              data.forEach((item) => {
                let validCharacter =  (item.hogwartsStudent || item.hogwartsStaff);
                let finded = false;
                let findedIdx = 0;

                if(item.house != '' && validCharacter){
                  for (var i = 0; i < tempHouses.length; i++) {
                    if(tempHouses[i]!=null && tempHouses[i].name == item.house) {finded = true;   findedIdx = i; break;}
                  }
                    if(!finded){
                      var obj = {name:item.house , memberCount:1}
                      tempHouses.push(obj);
                    }
                    else{
                      tempHouses[findedIdx].memberCount++;
                    }
                }
                if(validCharacter)
                tempCharacters.push(item);

            });
            state.currentHouse = tempHouses[0];
            state.houses = tempHouses;
            state.characters = tempCharacters;
            state.charactersToDisplay = tempCharacters;


        }else if(data.isAxiosError) state.error=true;

      },
      setCurrentHouse(state,{data}){
        if(data!==undefined)
        {
              state.currentHouse = data;
        }
      },
      setCurrentHouseByName(state,name){
        if(name!==undefined)
        {
              var finded = null;
              state.houses.forEach((item) => {
                  if(item.name == name) finded = item;
              });
              state.currentHouse = finded;
              console.log(this.currentHouse);
        }
      },
      setCharacter(state,{data}){
        if(data!==undefined)
        {
              state.currentCharacter = data;
        }
      },
      sortByProperty(state,data){

        let property = data.prop;
       if(property=='')property = 'name';
        if(data.order)
        state.charactersToDisplay.sort(function (a, b) {
              if (a[property] < b[property]) {
                  return -1;
              }
              if (b[property] < a[property]) {
                  return 1;
              }
              return 0;
          });
        else{
         state.charactersToDisplay.sort(function (a, b) {
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
      filterByHouse(state){
        if(state.currentHouse!=null)
            state.charactersToDisplay = state.characters.filter((el) =>
            el.house==state.currentHouse.name && ( el.hogwartsStudent || el.hogwartsStaff) );
      },
      filterByValue(state, string){
         state.charactersToDisplay = state.characters.filter((el) =>
         el.name.toLowerCase().includes(string.toLowerCase()) && el.house==state.currentHouse.name );
      }
    }
})
