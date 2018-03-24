const exec = require('child_process').exec

const result = (command, cb) => {
  exec(command, (err, stdout, stderr) => {
    if (err != null) {
      return cb(new Error(err), null)
    } else if (typeof (stderr) !== 'string') {
      return cb(new Error(stderr), null)
    }
    return cb(null, stdout)
  })
}

module.exports = result
