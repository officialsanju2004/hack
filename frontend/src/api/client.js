import axios from 'axios';
export const api = axios.create({ baseURL: '/api', timeout: 15000 });
export function getClientId() {
const key = 'algolens:clientId';
let id = localStorage.getItem(key);
if (!id) { id = 'c_' + Math.random().toString(36).slice(2) + Date.now().toString(36); localStorage.setItem(key, id); }
return id;
}
