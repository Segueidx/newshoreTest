
import axios from 'axios'

const mseApi = axios.create({ //instancia de axios
    baseURL: 'http://hp-api.herokuapp.com/api/',
    headers: {'Content-Type': 'application/json'}
});

axios.interceptors.request.use(function (config) {
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

axios.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    return Promise.reject(error);
  });

export async function getCharacters(){
    return mseApi.get('/characters').then(response => response.data).catch(err => err);
}
export function getStudents(){
  return mseApi.get('/characters/students').then(response => response.data).catch(err => err)
}
export function getStaff(){
  return mseApi.get('/characters/staff').then(response => response.data).catch(err => err)
}
export function getCharactersByHouse(house){
  return mseApi.get('/characters/house/'+house).then(response => response.data).catch(err => err)
}
