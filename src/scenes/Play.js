class Play extends Phaser.Scene
{
    constructor()
    {
       super("playScene"); 
    }

    preload()
    {
        this.load.spritesheet("spinning_planet_spritesheet", "./assets/spritesheets/spinning_planet.png",
        {
            frameWidth: 1280,
            frameHeight: 720,
            startFrame: 1,
            endFrame: 120,
        });
    }

    create()
    {
        this.backgroundAnim = this.add.sprite(0,0, "spinning_planet_spritesheet").setOrigin(0,0);
        this.anims.create(
            {
                key: "spinning_planet_anim",
                frames: this.anims.generateFrameNumbers("spinning_planet_spritesheet", 
                {
                    start: 1,
                    end: 119,
                }),
                frameRate: 30,
            });
            this.backgroundAnim.play("spinning_planet_anim");
            this.backgroundAnim.anims.setRepeat(-1);
    }

    update(time, delta)
    {

    }
}