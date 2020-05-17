const fs = require("fs")
const path = "./src/cassinoadm/commands/"

module.exports = (prefix) => {
      const commands = {}
      
      const scripts = fs.readdirSync(path)
      console.log(scripts)
      scripts.forEach(script => {
        commands[prefix+script.split(".")[0]] = require("../../../"+path+script)
      });

    return commands
}