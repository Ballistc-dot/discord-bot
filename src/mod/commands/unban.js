const mysql = require("mysql")

module.exports = (client,message,args,embed,db) =>{
  let id = args[1]
  embed
    .setTitle("Unban")
    .setColor("#0099ff")
    .attachFiles(['./src/assets/logo.png'])
    .setThumbnail('attachment://logo.png')
    .setDescription(`
    O id:**${id}** foi **DESBANIDO** com sucesso
    pelo staff **${message.author.username}**
    `)
 
  const banned = 0
  db.query(`UPDATE vrp_users SET banned = ${banned} WHERE id = ${id}`, function (error, results, fields) {
    if (error) throw error;
    message.reply(embed)  
  });
  
}