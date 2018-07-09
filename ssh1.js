import fs from 'fs'
// import path from 'path'
import node_ssh from 'node-ssh'

export const downloadLoom = async (ipAddress) => {
  const ssh = new node_ssh() // constructor needs to be here or else connection is reused
  const connection = await ssh.connect({
    host: ipAddress,
    username: 'root',
    privateKey: '/Users/admin/.ssh/terraform_rsa'
  })
  console.log('connected')
  return ssh.putFile('/Users/admin/Codes/thechain/loom-global-dpos-chain/init-multi.sh', '/root/init.sh').then(function () {
    console.log('initialization file copied to droplet')
    console.log('executing init script....')
    return ssh.execCommand('. ./init.sh').then(function (result) {
      console.log(result.stdout)
      console.log(result.stderr)
      console.log('attempting to get public key')
      return ssh.execCommand('./loom nodekey').then(function (result) {
        const pubKey = result.stdout
        const data = {
          ip: ipAddress,
          pubKey: pubKey,
          type: 'AC26791624DE60',
          run: '',
          genesisWorking: {},
          genesisChain: {}
        }
        let publicKeys = JSON.parse(fs.readFileSync('/Users/admin/Codes/thechain/loom-global-dpos-chain/output/public-keys.json', 'utf8'))
        publicKeys = JSON.stringify(publicKeys.concat(data))
        return fs.writeFile('/Users/admin/Codes/thechain/loom-global-dpos-chain/output/public-keys.json', publicKeys, function (err) {
          if (err) throw err
          console.log('public key saved!', data)
          return Promise.resolve()
        })
      })
    })
    // ssh.exec('. ./init.sh', [], {
    //   cwd: '/root',
    //   onStdout (chunk) {
    //     console.log(chunk.toString('utf8'))
    //   },
    //   onStderr (chunk) {
    //     console.log(chunk.toString('utf8'))
    //   }
    // })
  }, function (error) {
    console.log("Something's wrong")
    console.log(error)
  })
}
// downloadLoom('165.227.126.39')
