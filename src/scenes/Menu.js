class Menu extends Phaser.Scene
{
    constructor()
    {
       super("menuScene"); 
    }

    preload()
    {
        this.load.spritesheet("titleBG", "./assets/spritesheets/spinning_planet.png", 
        {   
            frameWidth: 1280,
            frameHeight: 720,
            startFrame: 1,
            endFrame: 120,
        });
        console.log("Enter Menu Scene");
    }

    create()
    {
        this.backgroundAnim = this.add.sprite(0, 0, "titleBG").setOrigin(0,0);
        this.anims.create(
            {
                key: "title", 
                frames: this.anims.generateFrameNumbers("titleBG", 
                {
                    start: 1,
                    end: 119,
                    nextAnim: "title",
                }),
                frameRate: 170,
            });

        this.menuText = this.add.text(game.config.width/2, game.config.height/2, 'Left/Right arrow to play scene');
        this.backgroundAnim.anims.play("title");
        this.backgroundAnim.anims.setRepeat(-1);

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