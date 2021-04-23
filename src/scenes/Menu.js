class Menu extends Phaser.Scene
{
    constructor()
    {
       super("menuScene"); 
    }

    preload()
    {
        this.load.spritesheet("titleBG", "./assets/title.png", 
        {   
            frameWidth: 640,
            frameHeight: 480,
            startFrame: 1,
            endFrame: 59,
        });
        console.log("Enter Menu Scene");
    }

    create()
    {

        this.anims.create(
            {
                key: "title", 
                frames: this.anims.generateFrameNumbers("titleBG", 
                {
                    start: 1,
                    end: 59,
                    nextAnim: "title",
                }),
                frameRate: 10,
            });

        this.menuText = this.add.text(game.config.width/2, game.config.height/2, 'Left/Right arrow to play scene')

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    }

    update()
    {
        if(Phaser.Input.Keyboard.JustDown(keyLEFT))
        {
            //easyMode
            this.scene.start('playScene');

        }
    }
}