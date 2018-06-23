if (!process.env.API_KEY) {
  console.error('missing API_KEY')
  process.exit(1)
}

const DigitalOcean = require('do-wrapper').default
const api = new DigitalOcean(process.env.API_KEY, 0)
const getAllQ = {
  tag_name: '',
  per_page: 25,
  page: 1
}

const dropletsStatus = async () => {
  const accountInfo = await api.account()
  console.log('connecting to account')
  if (!accountInfo.body.account.uuid) {
    return console.log("can't connect to account")
  }

  const getAllDroplets = await api.dropletsGetAll(getAllQ)
  const dropletIds = getAllDroplets.body.droplets.map(droplet => droplet.id)

  const statusOfDeletedDroplets = await Promise.all(dropletIds.map(id => api.dropletsGetById(id)))
  console.log('all droplet status', statusOfDeletedDroplets.map(res => res.body).map(droplet => droplet.droplet).map(droplet => ({id: droplet.id, status: droplet.status, ip4: droplet.networks.v4[0].ip_address})))
}

dropletsStatus()
