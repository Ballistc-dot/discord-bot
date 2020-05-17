
module.exports = (client,message,args,embed,db) =>{
  let id = args[1]
  embed
    .setTitle('Banimento')
    .setColor('#ea3434')
    .attachFiles(['./src/assets/logo.png'])
    .setThumbnail('attachment://logo.png')
    .setDescription(`
      O id:**${id}** foi **BANIDO** com sucesso
      pelo staff **${message.author.username}**
    `)
  
  const banned = 1
  db.query(`UPDATE vrp_users SET banned = ${banned} WHERE id = ${id}`, function (error, results, fields) {
    if (error) throw error;
    message.reply(embed) 
  });
  
}