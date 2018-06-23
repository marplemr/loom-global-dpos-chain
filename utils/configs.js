export const dropletConfigNYC = {
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
export const dropletConfigSFO = {
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
export const dropletConfigTOR = {
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
export const getAllQ = {
  tag_name: '',
  per_page: 25,
  page: 1
}
