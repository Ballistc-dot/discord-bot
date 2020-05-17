module.exports = (client,message,args,embed,db) =>{
  console.log(args[1])
  var id = args[1]
  const whitelisted = 1
  db.query(`UPDATE vrp_users SET whitelisted = ${whitelisted} WHERE id = ${id}`, function (error, results, fields) {
    if (error) throw error;
    message.reply(embed) 
    message.reply('mafia é gay e viado')
  });
}