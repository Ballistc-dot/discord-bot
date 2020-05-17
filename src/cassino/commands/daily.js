const connection = require('../../models/database/connection')
const Cassino = require('../../functions/index')


module.exports = (client,message) =>{
  console.log(message)
  const userId = message.author.id 
  const date = new Date()
  const day = date.getDate()
  const user = {
    id:userId
  } 
  const cassino = new Cassino(user,message)
  
  connection('daily')
  .where("user_id",userId)
  .then(async (r) => {
      if(r[0]){
        if(r[0].last_daily != day){
          cassino.getUserMoney(100,true)
          await connection('daily').where('user_id',userId).update({
            last_daily:day
          })
          message.reply('você recebeu suas **100** corongas volte amanhã para retira-lás novamente!')
        }else{
          message.reply('você só pode receber uma vez por dia!')
        }
      }else{
        console.log("Not exists")
        await connection('daily').insert({
          user_id:userId,
      })
      cassino.getUserMoney(100,true)
      message.reply('você recebeu suas **100** corongas, volte amanhã para retira-lás novamente!')
    }
  })
  .catch(err => message.reply(`ocorreu um erro tente novamente codigo do err: ${err.code}`))
}

