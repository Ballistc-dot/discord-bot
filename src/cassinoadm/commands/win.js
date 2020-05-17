const connection = require('../../models/database/connection')
const Cassino = require('../../functions/index')
module.exports = async(client,message,args,embed) =>{
  
  const winner = args[1].toLowerCase();
  const matchId = args[2];
  
  
  if(winner && matchId){

    connection('apostas')
    .where('match_id',matchId)
    .then(r =>{
      if(r[0].isEnded !=1){
        setWinner() 
      }else{
        message.reply('esse jogo ja possui um ganhador definido')
      }
  
    })
    async function setWinner(){
  
      await connection('bets')
        .where({
          match_id:matchId,
          bet:winner
       }).then(r =>r.map(value =>{
        const user ={
          id:value.user_id
        }
        var moneyValue = value.bet_value * 2
        const cassino = new Cassino(user)
        cassino.winnerPrize(moneyValue)
       }))
       /*.then(r =>{
         const user ={
           id:r[0].user_id
         }
         console.log(user)
         var value = r[0].bet_value * 2
         //const cassino = new Cassino(user)
         //cassino.winnerPrize(value)
       })*/
       .catch(err => console.log("puta q parió"))
  
      
       await connection('apostas')
          .where({
            match_id:matchId,
            isEnded:0
          })
          .update({
            winner:winner,
            isEnded:1
          })
          .then(r => console.log(r))
    }
  }else{
    message.reply('faltam informações por favor tente novamente!')
  }
  
}