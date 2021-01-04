
import axios from 'axios'

const mseApi = axios.create({ //instancia de axios
    baseURL: 'http://hp-api.herokuapp.com/api/',
    headers: {'Content-Type': 'application/json'}
});

export function getCharacters(){
  return mseApi.get('/characters').then(response => response.data)
}
export function getStudents(){
  return mseApi.get('/characters/students').then(response => response.data)
}
export function getStaff(){
  return mseApi.get('/characters/staff').then(response => response.data)
}
export function getCharactersByHouse(house){
  return mseApi.get('/characters/house/'+house).then(response => response.data)
}
