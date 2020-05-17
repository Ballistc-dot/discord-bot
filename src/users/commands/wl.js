const mysql = require("mysql")
module.exports = (client,message,args,embed,db) =>{
  let id = args[1]
  embed
    .setTitle("APROVADO")
    .setColor("#7ec699")
    .attachFiles(['./src/assets/logo.png'])
    .setThumbnail('attachment://logo.png')
    .setDescription(`
     O id:**${id}** foi **APROVADO** com sucesso pelo
     staff **${message.author.username}**
    `)
  
  const whitelisted = 1
  db.query(`UPDATE vrp_users SET whitelisted = ${whitelisted} WHERE id = ${id}`, function (error, results, fields) {
    if (error) throw error;
    message.reply("você é gay,'digo' foi aprovado") 
  });
}