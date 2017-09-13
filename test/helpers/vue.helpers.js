import Vue from 'vue/dist/vue.common';
import Vuex from 'vuex';
Vue.config.productionTip = false;

export default function mount(Component, Store) {
  const store = new Vuex.Store({
    ...Store,
    state: Store.state()
  });
  
  const Constructor = Vue.extend(Component);
  Constructor.mixin({
    beforeCreate() {
      const options = this.$options;
      // store injection
      if (options.store) {
        this.$store = typeof options.store === 'function' ?
          options.store() :
          options.store;
      } else if (options.parent && options.parent.$store) {
        this.$store = options.parent.$store;
      }
    }
  });
  const vm = new Constructor({
    store
  }).$mount();

  return {
    vm,
    store
  };
}
