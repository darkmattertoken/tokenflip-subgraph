import { GameCreated, GameDeleted, GameChallenged, GameRevealed, Deposit } from '../generated/TokenFlip/TokenFlip'
import { DayData, Game, OverallData, User } from '../generated/schema'
import { BigInt, BigDecimal } from '@graphprotocol/graph-ts'

// const tokenMapping = {
//   '0x0000000000000000000000000000000000000000': 'MATIC',
//   '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619': 'ETH'
// }


const WETH = '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619'

let ONE_BI = BigInt.fromI32(1)

export function handleGameCreated(event: GameCreated): void {
  let game = new Game(event.params.gameID.toString())
  game.status = 'created'
  game.creator = event.params.creator
  game.token = event.params.token
  // game.tokenSymbol = tokenMapping[event.params.token.toString()]
  game.amount = event.params.amount
  game.lastChangeTimestamp = event.block.timestamp
  game.save()
}

export function handleGameDeleted(event: GameDeleted): void {
  let game = Game.load(event.params.gameID.toString())
  game.status = 'deleted'
  game.lastChangeTimestamp = event.block.timestamp
  game.save()
}

export function handleGameChallenged(event: GameChallenged): void {
  let game = Game.load(event.params.gameID.toString())
  game.status = 'challenged'
  game.challenger = event.params.challenger
  game.lastChangeTimestamp = event.block.timestamp
  game.save()
}

export function handleGameRevealed(event: GameRevealed): void {
  let game = Game.load(event.params.gameID.toString())
  game.status = 'revealed'
  game.winner = event.params.winner
  if (event.params.winner.equals(game.creator)) {
    let winner = User.load(game.creator.toHexString())
    if (winner == null) {
      winner = new User(game.creator.toHexString())
    }
    winner.wins = winner.wins.plus(ONE_BI)
    winner.save()
    let loser = User.load(game.challenger.toHexString())
    if (loser == null) {
      loser = new User(game.challenger.toHexString())
    }
    loser.losses = loser.losses.plus(ONE_BI)
    loser.save()
  } else {
    let winner = User.load(game.challenger.toHexString())
    if (winner == null) {
      winner = new User(game.challenger.toHexString())
    }
    winner.wins = winner.wins.plus(ONE_BI)
    winner.save()
    let loser = User.load(game.creator.toHexString())
    if (loser == null) {
      loser = new User(game.creator.toHexString())
    }
    loser.losses = loser.losses.plus(ONE_BI)
    loser.save()
  }
  game.lastChangeTimestamp = event.block.timestamp
  game.save()
}

export function handleDeposit(event: Deposit): void {
  let stats = OverallData.load('0');
  if (!stats) {
    stats = new OverallData('0')
    stats.totalETH = BigDecimal.fromString('0')
  }

  if (event.params.token === WETH) {
    stats.totalETH = stats.totalETH.plus(event.params.amount)
  }
  stats.save()

  let timestamp = event.block.timestamp.toI32()
  let dayID = timestamp / 86400
  let dayStartTimestamp = dayID * 86400
  let day = DayData.load(dayID.toString());
  if (!day) {
    day = new DayData(dayID.toString());
    day.date = dayStartTimestamp;
    day.dailyETH = BigDecimal.fromString('0')
    day.totalETH = BigDecimal.fromString('0')
  }
  if (event.params.token === WETH) {
    day.dailyETH = day.dailyETH.plus(event.params.amount)
  }
  day.totalETH = stats.totalETH;
  day.save();
}