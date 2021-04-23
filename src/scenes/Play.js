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
                    start: 119,
                    end: 1,
                }),
                frameRate: 30,
            });
            this.backgroundAnim.play("spinning_planet_anim");
            this.backgroundAnim.anims.setRepeat(-1);
    }

    update(time, delta)
    {
        let deltaMultiplier = (delta/16.66667); //for refresh rate indepence.
        /*
        Please multiply any movements that are happening in the update function by this variable.
        That way they don't speed up on high refresh rate displays. Ask Ethan for more help/info
        if you are unsure.
        */
    }
}