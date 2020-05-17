const connection = require('../models/database/connection')

module.exports = class Cassino{
  constructor(user,message){
      this.user = user
      this.message = message
  }
  
  async getUserMoney(value,sum) {
    await connection('money')
      .where('uid',this.user.id)
      .then(r => this.setUserMoney(r[0].quantidade,value,sum,false))    
  }
  
  async setUserMoney(value,valueSum,sum,first){
    var addSum = 0
    sum ? addSum = value + valueSum : addSum = value - valueSum
    if(first){
      await connection('money').insert({
        uid:this.user.id,
        quantidade:addSum
      })
    }else{
      await connection('money').where('uid',this.user.id)
      .update({
        quantidade:addSum
      })
    }
  }
  async winnerPrize(value){
    await connection('money')
    .where('uid',this.user.id)
    .then(r => this.setUserMoney(r[0].quantidade,value,true,false))    
  }
  
  async createAccount() {
    const sucess = true
    try{
      await connection('users').insert({
        user_id:this.user.id,
        game_id:this.user.game_id,
        username:this.user.username
      })
      this.setUserMoney(1000,0,true,true)
    return sucess
    }catch(err){
      console.log("aqui bb",err)
    return err
    }
  }

  async addBet(bet) {
    await connection('apostas')
    .where('match_id',bet.match_id)
    .then(r =>{
      console.log(r)
      if(r[0].no_more_bets == 0 ){
        this.validBet(bet,true)
      }else{
        this.validBet(bet,false) 
      }
    }).catch(err => this.message.reply(`**ocorreu um erro! por favor verifique o id e tente novamente! codigo do erro: ${err.code}**`))
    
  }
  async validBet(bet,isValid){
    if(isValid){
      this.getBets()
      await connection('bets').insert({
        bet:bet.team,
        bet_id:bet.id,
        bet_value:bet.value,
        user_id:bet.user_id,
        match_id:bet.match_id
      })
      this.getUserMoney(bet.value,false)
      this.message.reply(`você apostou **${bet.value}** em **${bet.team.toUpperCase()}**, boa sorte!`)
    }else{
      this.message.reply('Esse jogo não pode mais receber apostas ou já terminou!')
    }
  }
  async createBet(bet){
    var sucess = true
    try {
    await connection('apostas')
      .insert({
        time_1:bet.time_1,
        time_2:bet.time_2,
        link:bet.link,
        match_id:bet.match_id,
        create_user_id:bet.create_user_id,
        create_user_name:bet.create_user_name,
      }).then(r =>console.log(r))
      console.log('funfa')
      return sucess
    }catch (err) {
      console.log(err)
      return err
    }
  }
      
  
  async setBets(total){
   await connection('users')
      .where('user_id',this.user.id)
      .update({
        total_bets: total + 1
      })
  }
  async getBets(){
    await connection('users')
      .where('user_id',this.user.id)
      .then(r=>this.setBets(r[0].total_bets))
  }
}
