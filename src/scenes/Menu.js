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

        this.backgroundAnim.anims.play("title");
        this.backgroundAnim.anims.setRepeat(-1);

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    }

    update()
    {
        if(Phaser.Input.Keyboard.JustDown(keyLEFT))
        {
            this.scene.start('playScene');
        }

    }
}