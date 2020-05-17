const connection = require('../../models/database/connection');
const Cassino = require('../../functions/index');
const cy =  require('crypto')

module.exports = async(client,message,args,embed) => {
  const bet = {
    team:args[2].toLowerCase(),
    id:cy.randomBytes(8).toString('HEX'),
    value:args[1],
    user_id: message.author.id,
    match_id:args[3]
  }
  const user = {
    id:message.author.id,
    username:message.author.username
  }
  try{ 
    if(bet.value <= 300){
      const cassino = new Cassino(user,message)
      if(bet.id && bet.team && bet.value){
          connection('bets').where({
            'user_id':user.id,
            'match_id':bet.match_id
          }).then(r => {
            if(r != []){
              cassino.addBet(bet)
            }else{
              message.reply('você só pode apostar uma vez por partida!')
            }
          })
          .catch(()=>message.reply('Ocorreu um erro verifique se ja se registrou'))
        }else{
          message.reply('faltam informações!') 
        }
    }else{
       message.reply('você só pode apostar no máximo 300 corongas')
    }
  }catch{
    message.reply('Ocorreu um erro verifique se ja se registrou')
  }
}
        
