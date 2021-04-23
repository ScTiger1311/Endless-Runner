class Menu extends Phaser.Scene
{
    constructor()
    {
       super("menuScene"); 
    }

    preload()
    {
        console.log("Enter Menu Scene");

        //load audio
    }

    create()
    {

        this.menuText = this.add.text(game.config.width/2, game.config.height/2, 'Left/Right arrow to play scene')

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update()
    {
        if(Phaser.Input.Keyboard.JustDown(keyLEFT))
        {
            //easyMode
            this.scene.start('playScene');

        }
        else if (Phaser.Input.Keyboard.JustDown(keyRIGHT))
        {
            //hard mode
            this.scene.start('playScene');
        }
    }
}