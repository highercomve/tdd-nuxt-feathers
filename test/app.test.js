import test from 'ava'
import { describe } from 'ava-spec'
import { initializeServer, closeServer, getNuxt } from './helpers/_nuxt_test_init'

// Init Nuxt.js and create a server listening on localhost:4000
test.before('Init Nuxt.js', initializeServer)

// Example of testing only generated html
describe('Test home route', it => {
  it('Route / exits and render HTML', async t => {
    let nuxt = getNuxt()
    let context = {}
    const { html, error, redirected } = await nuxt.renderRoute('/', context)
    t.deepEqual(redirected, {
      path: '/login',
      query: {},
      status: 302,
    })
  })
})

// Close server and ask nuxt to stop listening to file changes
test.after('Closing server and nuxt.js', closeServer)
