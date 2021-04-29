class Play extends Phaser.Scene
{
    constructor()
    {
       super("playScene"); 
    }

    preload()
    {
        this.load.atlas("planet_sheet", "./assets/spritesheets/spinning_planet.png", "./assets/spritesheets/spinning_planet.json");
        this.load.image("gridBG", "./assets/single_sprites/grid_bg.png");
        this.load.image("obstacle", "./assets/sprites/TempEnemy.png");
        //this.load.plugin('rexpathfollowerplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexpathfollowerplugin.min.js', true);
    }

    create()
    {
        console.log("Entered play scene");

        this.backgroundStatic = this.add.sprite(0,0, "gridBG").setOrigin(0,0);
        this.backgroundAnim = this.add.sprite(0,0, "planet_sheet").setOrigin(0,0);
        this.anims.create(
            {
                key: "spinning_planet_anim",
                frames: this.anims.generateFrameNames("planet_sheet", 
                {
                    prefix: "",
                    start: 1,
                    end: 120,
                    zeroPad: 4,
                }),
                frameRate: 30,
            });
            this.backgroundAnim.play("spinning_planet_anim");
            this.backgroundAnim.anims.setRepeat(-1);


        //Setup curve
         this.curveGraphics = this.add.graphics();

         this.curveGraphics.lineStyle(10, 0xFF0000);
         this.curveGraphics.beginPath();
         this.curveGraphics.closePath();

         //Create actual spline points
        let testCurve = new Phaser.Curves.Spline([
            [game.config.width * .500,     game.config.height * .422], //[0]
            [game.config.width * .300,     game.config.height * .432], //[1]
            [game.config.width * .156,     game.config.height * .479], //[2]
            [game.config.width * .109,     game.config.height * .528], //[3]
            [game.config.width * .156,     game.config.height * .585], //[4]
            [game.config.width * .262,     game.config.height * .605], //[5]
            [game.config.width * .500,     game.config.height * .595], //[6]

        ]);

        //Create path using spline
        this.testPath = this.add.path();
        this.testPath.add(testCurve);       

        this.curveGraphics.strokePoints(this.testPath.curves[0].points);

        //this.pathFollower = new Phaser.GameObjects.PathFollower();

        this.testEnemy = this.physics.add.sprite(
            this.testPath.curves[0].points[6].x,
            this.testPath.curves[0].points[6].y,
            'obstacle'
        ).setOrigin(.5);

        

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