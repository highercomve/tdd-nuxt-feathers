import test from 'ava';
import * as AuthStore from '../../src/components/store.babel';

test('get State', t => {
  t.not(AuthStore.state(), null);
});