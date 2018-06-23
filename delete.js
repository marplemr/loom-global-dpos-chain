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

const deleteAllDroplets = async () => {
  const accountInfo = await api.account()
  console.log('connecting to account')
  if (!accountInfo.body.account.uuid) {
    return console.log("can't connect to account")
  }

  const getAllDroplets = await api.dropletsGetAll(getAllQ)
  const dropletIds = getAllDroplets.body.droplets.map(droplet => droplet.id)
  console.log('all-droplets', dropletIds)

  console.log('deleting all droplets')
  const deletedDroplets = await api.tagsDeleteDroplets('loom')
  console.log('Delete all droplets by tag returns 204?? (success): ', deletedDroplets.response.statusCode === 204)
}

deleteAllDroplets()
