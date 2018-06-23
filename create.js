if (!process.env.API_KEY) {
  console.error('missing API_KEY')
  return process.exit(1)
}
// function to(promise) {
//    return promise.then(data => {
//       return [null, data];
//    })
//    .catch(err => [err]);
// }
const DigitalOcean = require('do-wrapper').default
const  api = new DigitalOcean(process.env.API_KEY, 0)
const dropletConfigNYC = {
  names: [
    'dpos-nyc-1',
    'dpos-nyc-2',
    'dpos-nyc-3'
  ],
  region: 'nyc3',
  size: 's-1vcpu-1gb',
  image: 'ubuntu-16-04-x64',
  ssh_keys: [13409306],
  backups: false,
  ipv6: true,
  user_data: null,
  private_networking: null,
  tags: [
    'loom'
  ]
}
const dropletConfigSFO = {
  names: [
    'dpos-sfo-1',
    'dpos-sfo-2',
    'dpos-sfo-3'
  ],
  region: 'sfo2',
  size: 's-1vcpu-1gb',
  image: 'ubuntu-16-04-x64',
  ssh_keys: [13409306],
  backups: false,
  ipv6: true,
  user_data: null,
  private_networking: null,
  tags: [
    'loom'
  ]
}
const dropletConfigTOR = {
  names: [
    'dpos-tor-1',
    'dpos-tor-2',
    'dpos-tor-3'
  ],
  region: 'tor1',
  size: 's-1vcpu-1gb',
  image: 'ubuntu-16-04-x64',
  ssh_keys: [13409306],
  backups: false,
  ipv6: true,
  user_data: null,
  private_networking: null,
  tags: [
    'loom'
  ]
}
const getAllQ = {
  tag_name: '',
  per_page: 25,
  page: 1
}



const createDroplets = async () => {
  const accountInfo = await api.account()
  console.log('connecting to account')
  if (!accountInfo.body.account.uuid) {
    return console.log("can't connect to account")
  }

  console.log('creating droplets')
  const createDropletsNYC = await api.dropletsCreate(dropletConfigNYC)
  const createDropletsSFO = await api.dropletsCreate(dropletConfigSFO)
  const createDropletsTOR = await api.dropletsCreate(dropletConfigTOR)
  if (!createDropletsNYC.body) {
    return console.log("error creating droplet NYC", createDropletsNYC.body)
  }
  if (!createDropletsSFO.body) {
    return console.log("error creating droplet SFO", createDropletsSFO.body)
  }
  if (!createDropletsTOR.body) {
    return console.log("error creating droplet TOR", createDropletsTOR.body)
  }

  console.log('droplet create success NYC', createDropletsNYC.body.droplets.map(droplet => ({id: droplet.id, name: droplet.name, region: droplet.region.slug, ip: 'ip provisioning...'})))
  console.log('droplet create success SFO ', createDropletsSFO.body.droplets.map(droplet => ({id: droplet.id, name: droplet.name, region: droplet.region.slug, ip: 'ip provisioning...'})))
  console.log('droplet create success TOR', createDropletsTOR.body.droplets.map(droplet => ({id: droplet.id, name: droplet.name, region: droplet.region.slug, ip: 'ip provisioning...'})))
}

createDroplets()
