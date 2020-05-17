const selenium = require('selenium-webdriver')

module.exports = async(client,message,args,embed,db,driver) =>{
await driver.findElement(selenium.By.xpath("/html/body/app-root/div/div[2]/servers/app-servers-detail/div[3]/div"))
  .getText().then(text => {
  message.reply(`${text} Players`)
  })
}