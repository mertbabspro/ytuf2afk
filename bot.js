const mineflayer = require('mineflayer')
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function oncePromise(emitter, event) {
  return new Promise(resolve => emitter.once(event, resolve))
}

async function runSetup(bot) {
  console.log('Setup başlıyor...')
  await sleep(3000)

  bot.chat('/login benbitben')
  console.log('Login atıldı')
  await sleep(3000)

  // 5. slot
  bot.setQuickBarSlot(4)
  console.log('5. slot seçildi.')
  await sleep(3000)

  bot.activateItem()
  bot.swingArm('right')
  console.log('5. slota tık atıldı.')
  await sleep(5000)


  // 24. slot
  bot.clickWindow(23, 0, 0)
  console.log('24. slota tıklandı.')
  await sleep(5000)

  bot.chat('/afk')
  bot.chat('sa nabiounz gencler')
  console.log('AFK ve mesaj atıldı.')
}

function startBot() {
  const bot = mineflayer.createBot({
    host: 'zurnacraft.net',
    username: 'ytufgeasx2',
    version: false
  })

  bot.once('spawn', async () => {
    console.log('Sunucuya girildi.')
    try {
      await runSetup(bot)
      console.log('Hazır. Konsoldan yaz → oyuna gider 👇')
    } catch (e) {
      console.log('Setup patladı:', e.message)
    }
  })

  rl.removeAllListeners('line')
  rl.on('line', (line) => {
    if (!line) return
    bot.chat(line)
    console.log('[SEN -> OYUN]:', line)
  })

  bot.on('chat', (username, message) => {
    console.log(`[CHAT] ${username}: ${message}`)
  })

  bot.on('error', err => {
    console.log('Hata:', err.message)
  })

  bot.on('kicked', reason => {
    console.log('Kick yedi:', reason)
  })

  bot.on('end', async () => {
    console.log('Bağlantı koptu. 3 saniye sonra tekrar...')
    await sleep(3000)
    startBot()
  })
}

startBot()

