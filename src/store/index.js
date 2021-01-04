import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import * as api from '../api/api.js'
/*Estados de Vuex, contiene todas las variables accesibles desde la aplicación*/

export const store = new Vuex.Store({
   state: {
      charactersToDisplay:[],
      currentCharacter:{}
    },
     getters: {
      getCharacters: state => state.charactersToDisplay,
      getCurrentCharacter: state => state.currentCharacter,
    },
     actions:{
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
      //METODO MAESTRO
      setCharacters(state,{data}){
        if(data!==undefined)
        {
              state.charactersToDisplay = [];
              state.charactersToDisplay = data;
        }
      },
      setCharacter(state,{data}){
        if(data!==undefined)
        {
              state.currentCharacter = data;
        }
      },

    }
})
