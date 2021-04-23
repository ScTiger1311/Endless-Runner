class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }

    preload() {
        console.log("Enter Play Scene");

    }

    create() {
        this.playText = this.add.text(game.config.width/2, game.config.height/2, 'In play scene')

    }

}