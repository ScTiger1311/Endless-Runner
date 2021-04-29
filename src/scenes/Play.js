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
        console.log("Entered play scene");

        this.backgroundAnim = this.add.sprite(0,0, "spinning_planet_spritesheet").setOrigin(0,0);
        this.anims.create(
            {
                key: "spinning_planet_anim",
                frames: this.anims.generateFrameNumbers("spinning_planet_spritesheet", 
                {
                    start: 1,
                    end: 120,
                }),
                frameRate: 30,
            });
            this.backgroundAnim.play("spinning_planet_anim");
            this.backgroundAnim.anims.setRepeat(-1);

         this.curveGraphics = this.add.graphics();

         this.curveGraphics.lineStyle(10, 0xFF0000);
         this.curveGraphics.beginPath();
         this.curveGraphics.closePath();

        let testCurve = new Phaser.Curves.Spline([
            [game.config.width * .500,     game.config.height * .422],
            [game.config.width * .300,     game.config.height * .432],
            [game.config.width * .156,     game.config.height * .479],
            [game.config.width * .109,     game.config.height * .528],
            [game.config.width * .156,     game.config.height * .585],
            [game.config.width * .262,     game.config.height * .605],
            [game.config.width * .500,     game.config.height * .595],

        ]);

        this.curveGraphics.strokePoints(testCurve.points);
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