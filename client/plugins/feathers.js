import Vue from 'vue';
import Feathers from 'feathers/client';
import VueFeathers from 'vue-feathers';
import hooks from 'feathers-hooks';
import authentication from 'feathers-authentication-client';
import rx from 'feathers-reactive';
import RxJS from 'rxjs';
import socketio from 'feathers-socketio/client';
import io from 'socket.io-client';
import localStorage from 'localstorage-memory';

const feathers = Feathers()
const host = process.env.FEATHERS_HOST || 'http://localhost:3030';
const socket = io(host);
feathers
  .configure(authentication({ 
    storage: localStorage, 
    cookie: 'feathers-jwt' 
  }))
  .configure(socketio(socket))
  .configure(rx(RxJS))
  .configure(hooks());

Vue.use(VueFeathers, feathers);

export default feathers
