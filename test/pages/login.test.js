import { describe } from 'ava-spec'
import test from 'ava'
import { initializeServer, closeServer, getNuxt } from '../../nuxt_test_init'

// Init Nuxt.js and create a server listening on localhost:4000
test.before('Init Nuxt.js', async t => {
  return await initializeServer()
})

// Example of testing only generated html
describe('Test Login route', it => {
  it('Route / exits and render HTML', async t => {
    let nuxt = getNuxt()
    let context = {}
    const { html, error, redirected } = await nuxt.renderRoute('/login', context)
    t.true(html.includes('<button class="button is-success">Login</button>'), 'HTML not equals')
    t.is(redirected, false)
  })
})

// Close server and ask nuxt to stop listening to file changes
test.after('Closing server and nuxt.js',  async t => {
  return await closeServer()
})
