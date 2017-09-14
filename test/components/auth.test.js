import test from 'ava';
import Auth from '../../src/components/auth.vue';
import mount from '../helpers/vue.helpers';
import * as AuthStore from '../../src/components/store.babel';

test('Renders', t => {
  const { vm } = mount(Auth, AuthStore);
  t.is(vm.$el.textContent.trim(), 'Your component created with unicorn CLI');
});