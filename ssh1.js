// import fs from 'fs'
// import path from 'path'
import node_ssh from 'node-ssh'
const ssh = new node_ssh()

export const downloadLoom = async (ipAddress) => {
  const connection = await ssh.connect({
    host: ipAddress,
    username: 'root',
    privateKey: '/Users/admin/.ssh/terraform_rsa'
  })
  console.log('connected')
  ssh.putFile('/Users/admin/Codes/thechain/loom-global-dpos-chain/init.sh', '/root/init.sh').then(function () {
    console.log('The File thing is done')
    console.log('executing init script....')
    // ssh.execCommand('. ./init.sh').then(function (result) {
    //   console.log(result.stdout)
    //   console.log(result.stderr)
    // })
    ssh.exec('. ./init.sh', [], {
      cwd: '/root',
      onStdout (chunk) {
        console.log(chunk.toString('utf8'))
      },
      onStderr (chunk) {
        console.log(chunk.toString('utf8'))
      }
    })
  }, function (error) {
    console.log("Something's wrong")
    console.log(error)
  })
}
downloadLoom('159.65.179.138')
