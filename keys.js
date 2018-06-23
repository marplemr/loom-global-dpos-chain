if (!process.env.API_KEY) {
  console.error('missing API_KEY')
  process.exit(1)
}

const DigitalOcean = require('do-wrapper').default
const api = new DigitalOcean(process.env.API_KEY, 0)

const getRegions = async () => {
  const accountInfo = await api.account()
  console.log('connecting to account')
  if (!accountInfo.body.account.uuid) {
    return console.log("can't connect to account")
  }
  const keyz = await api.accountGetKeys()
  console.log('keys', keyz.body.ssh_keys.map(key => ({name: key.name, id: key.id})))
}

getRegions()
