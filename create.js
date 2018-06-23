import {dropletConfig} from './utils/configs.js'
if (!process.env.API_KEY) {
  console.error('missing API_KEY')
  process.exit(1)
}
// function to(promise) {
//    return promise.then(data => {
//       return [null, data];
//    })
//    .catch(err => [err]);
// }
const DigitalOcean = require('do-wrapper').default
const api = new DigitalOcean(process.env.API_KEY, 0)

const createDroplets = async () => {
  const accountInfo = await api.account()
  console.log('connecting to account')
  if (!accountInfo.body.account.uuid) {
    return console.log("can't connect to account")
  }

  console.log('creating droplets')
  const createDropletsNYC = await api.dropletsCreate(dropletConfig.NYC)
  const createDropletsSFO = await api.dropletsCreate(dropletConfig.SFO)
  const createDropletsTOR = await api.dropletsCreate(dropletConfig.TOR)
  if (!createDropletsNYC.body) {
    return console.log('error creating droplet NYC', createDropletsNYC.body)
  }
  if (!createDropletsSFO.body) {
    return console.log('error creating droplet SFO', createDropletsSFO.body)
  }
  if (!createDropletsTOR.body) {
    return console.log('error creating droplet TOR', createDropletsTOR.body)
  }

  console.log('droplet create success NYC', createDropletsNYC.body.droplets.map(droplet => ({id: droplet.id, name: droplet.name, region: droplet.region.slug, ip: 'ip provisioning...'})))
  console.log('droplet create success SFO ', createDropletsSFO.body.droplets.map(droplet => ({id: droplet.id, name: droplet.name, region: droplet.region.slug, ip: 'ip provisioning...'})))
  console.log('droplet create success TOR', createDropletsTOR.body.droplets.map(droplet => ({id: droplet.id, name: droplet.name, region: droplet.region.slug, ip: 'ip provisioning...'})))
}

createDroplets()
