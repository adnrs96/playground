import Server from './server';
import Database from './database';

async function start() {
    await Database.connect()
    const server = new Server()
    await server.start()
    const stop = async () => {
        await server.stop()
    }
    process.on('SIGTERM', stop)
    process.on('SIGINT', stop)
}

start().then(() => {
    console.log('🚀 Yay! The server is running.')
}).catch(e => {
    console.log('💥 Oops! An error occurred.')
    console.log(e)
})
