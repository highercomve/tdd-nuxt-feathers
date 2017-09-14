import test from 'ava';
import Login from '../../src/components/login.vue';
import mount from '../helpers/vue.helpers';
import * as AuthStore from '../../src/components/store.babel';

test('Renders', t => {
  const { vm } = mount(Login, AuthStore.default(() => {}, () => {}, () => {}));
  t.is(vm.$el.textContent.trim(), 'Your component created with unicorn CLI');
});