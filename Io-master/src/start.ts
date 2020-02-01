import Bot from './bot/bot'

const token: string = process.env.DISCORD_TOKEN || ""
if (token === "") {
  console.log("Couldn't find discord token. Exiting...")
  process.exit()
}

const bot = new Bot(token)

try {
  bot.connect()
} catch (e) {
  console.log("Received generic error! Error: ", e)
  shutdown()
}

process.on('SIGTERM', () => {
  console.info('SIGTERM signal received.')
  shutdown()
});

process.on('SIGINT', () => {
  console.info('SIGINT signal received.')
  shutdown()
})

process.on('uncaughtException', (err: Error) => {
  console.error(err)
  console.info('Uncaught exception, shutting down...')
  shutdown()
})

function shutdown() {
  try {
    bot.shutdownGracefully()
  } catch (e) {
    console.log("Couldn't do graceful shutdown! Exiting anyway...")
  }
}
