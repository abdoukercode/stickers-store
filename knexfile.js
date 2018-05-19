// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://127.0.0.1/stickers-store'
  },

  test: {
    client: 'pg',
    connection: 'postgres://127.0.0.1/test-stickers-store'
  }
}
