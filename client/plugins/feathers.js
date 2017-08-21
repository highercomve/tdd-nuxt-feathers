'use strict';

import Vue from 'vue';
import Feathers from 'feathers/client';
import VueFeathers from 'vue-feathers';
import hooks from 'feathers-hooks';
import authentication from 'feathers-authentication-client';
// import rest from 'feathers-rest/client';
import rx from 'feathers-reactive';
import RxJS from 'rxjs';
// import axios from 'axios';
import socketio from 'feathers-socketio/client';
import io from 'socket.io-client';

if (process.BROWSER_BUILD) {
  // Configure Feathers client
  const host = process.env.FEATHERS_HOST || 'http://localhost:3030';
  const socket = io(host);
  const feathers = Feathers()
    .configure(authentication({storage: this.localStorage}))
    .configure(socketio(socket))
    // .configure(rest(host).axios(axios))
    .configure(rx(RxJS))
    .configure(hooks());

  Vue.use(VueFeathers, feathers);
}
