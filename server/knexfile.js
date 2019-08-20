module.exports = {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    searchPath: ['app_hidden', 'app_private', 'app_public', 'app_runtime']
}
