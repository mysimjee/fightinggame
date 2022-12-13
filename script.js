let playButton = document.getElementById('play')
let resultDiv = document.getElementById('result')
let p1NameDiv = document.getElementById('p1Name')
let p2NameDiv = document.getElementById('p2Name')
let p1HealthDiv = document.getElementById('p1Health')
let p2HealthDiv = document.getElementById('p2Health')

class player {
    constructor(name, health, attackDamage) {
        this.name = name
        this.health = health
        this.attackDamage = attackDamage
    }

    strike(player, enemy) {
        player.attackDamage = Math.ceil(Math.random() * 4)
        enemy.health -= player.attackDamage
        updategame()
        document.getElementById('result').innerHTML = "<h2>" + game.declarewinner() + "</h2>"
        

    }


    heal(player) {
        if (player.health < 100) {
            player.health += Math.ceil(Math.random() * 2)
            updategame()
        } else if (player.health == 101) {
            player.health = 100
            updategame()
        } else {
            return "You cannot heal"
        }
    }
}

class Game {
    constructor() {
        this.isover = false
    }


    reset(playerone, playertwo) {
        playerone.health = 100
        playertwo.health = 100
        this.isover = false
        document.getElementById('attack').style.visibility = 'visible'
        document.getElementById('heal').style.visibility = 'visible'
        document.getElementById('attack1').style.visibility = 'visible'
        document.getElementById('heal1').style.visibility = 'visible'
        document.getElementById('result').innerHTML = "<h2>  </h2>"
        updategame()
    }

    declarewinner() {
        let message = "Fight Going On!"
        if (player1.health <= 0) {
            this.isover = true
            if (player1.health < 0) {
                player1.health = 0
                updategame()
            }
            message = "Player Two Won"
            document.getElementById('victory').play()
            document.getElementById('attack').style.visibility = 'hidden'
            document.getElementById('heal').style.visibility = 'hidden'
            document.getElementById('attack1').style.visibility = 'hidden'
            document.getElementById('heal1').style.visibility = 'hidden'
        } else if (player2.health <= 0) {
            this.isover = true
            message = "Player One Won"
            if (player2.health < 0) {
                player2.health = 0
                updategame()
            }
            document.getElementById('victory').play()
            document.getElementById('attack').style.visibility = 'hidden'
            document.getElementById('heal').style.visibility = 'hidden'
            document.getElementById('attack1').style.visibility = 'hidden'
            document.getElementById('heal1').style.visibility = 'hidden'
        }
        return message
    }

    simulate() {
        this.reset(player1, player2)
        while (!this.isover) {
            let playerturn = [0, 1][Math.floor(Math.random() * 2)]
            let player = playerturn
            if (player == 0) {
                player1.strike(player1, player2)
                player1.heal(player1)
                player2.heal(player2)
                player1.strike(player1, player2)
                player1.strike(player1, player2)
                player1.strike(player1, player2)
                player2.strike(player2, player1)
            } else {
                player2.strike(player2, player1)
                player2.heal(player2)
                player1.heal(player1)
                player2.strike(player2, player1)
                player2.strike(player2, player1)
                player2.strike(player2, player1)
                player1.strike(player1, player2)

            }
            
        }
        return this.declarewinner()
    }
}
let game = new Game()
let player1 = new player("Mohamed", 100, 0)
let player2 = new player("Yusuf", 100, 0)



game.declarewinner()

function updategame() {
    p1HealthDiv.innerText = player1.health
    p2HealthDiv.innerText = player2.health
}


document.addEventListener('keyup', function(e){
    if (e.key == "a") {
        player1.strike(player1, player2)
        document.getElementById('p1attack').play()
    }
})

document.addEventListener('keydown', function(e){
    if (e.key == "h") {
        player1.heal(player1)
        document.getElementById('p1heal').play()
    }
})


document.addEventListener('keyup', function(e){
    if (e.key == "1") {
        player2.strike(player2, player1)
        document.getElementById('p2attack').play()
    }
})



document.addEventListener('keydown', function(e){
    if (e.key == "2") {
        player2.heal(player2)
        document.getElementById('p2heal').play()
    }
})


document.addEventListener('keydown', function(e){
    if (e.key == "r") {
        game.reset(player1, player2)
        document.getElementById('p2heal').play()
        document.getElementById('p1heal').play()
    }
})