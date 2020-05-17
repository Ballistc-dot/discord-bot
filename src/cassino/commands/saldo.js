const connection = require('../../models/database/connection');


module.exports = async(client,message,args,embed) => {
  const user = {
    id:message.author.id
  }
  
  await connection('money')
    .where('uid',user.id)
      .then(r => message.reply(`seu saldo é de **${r[0].quantidade} corongas**`))
      .catch(()=>message.reply('ocorreu um erro tente se registrar com o comando **"!create "seu id""**'))
} 