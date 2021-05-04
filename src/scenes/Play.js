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
        this.load.image("tempPlayer", "./assets/sprites/TempPlayer.png");
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


        //Setup graphics
         this.curveGraphics = this.add.graphics();

         this.curveGraphics.lineStyle(10, 0xFF0000);
         this.curveGraphics.beginPath();
         this.curveGraphics.closePath();

         //Create actual spline points
        let testCurve = new Phaser.Curves.Spline([
            [game.config.width * .500,     game.config.height * .422], //[0]
            [game.config.width * (1-.300),     game.config.height * .432], //[1]
            [game.config.width * (1-.156),     game.config.height * .479], //[2]
            [game.config.width * (1-.109),     game.config.height * .528], //[3]
            [game.config.width * (1-.156),     game.config.height * .585], //[4]
            [game.config.width * (1-.262),     game.config.height * .605], //[5]
            //[game.config.width * (1-.500),     game.config.height * .595], //[6]
            [game.config.width * (.262),       game.config.height * .605], //[7]
            [game.config.width * (.156),       game.config.height * .585], //[8]
            [game.config.width * (.109),       game.config.height * .528], //[9]
            [game.config.width * (.156),       game.config.height * .479], //[10]
            [game.config.width * (.300),       game.config.height * .432], //[11]
        ]);

        //Create path using spline
        this.testPath = this.add.path(testCurve.points[0].x, testCurve.points[0].y);
        this.testPath.add(testCurve);
        this.testPath.closePath()

        //Draw the new path
        this.curveGraphics.strokePoints(this.testPath.curves[0].points);


        //Create enemy follower
        this.obs1 = new basicObstacle(this, this.testPath, testCurve.points[0].x, testCurve.points[0].y, 'obstacle');

        //Create temp physics body to test collision
        this.testPlayer = this.physics.add.sprite(testCurve.points[7].x, testCurve.points[7].y, 'tempPlayer');
        this.testPlayer.body.onOverlap = true;

        //Setup physics world overlap event between player and obstacle
        this.physics.world.on('overlap', (obj1, obj2, bod1, bod2)=>{
            console.log(`${obj1.texture.key} is colliding with ${obj2.texture.key} body`);
        });

        //Setup path follow config
        this.pathFollowConfig = {
            duration: 4000,
            from: 0,
            to: 1

        };

        this.obs1.startFollow(this.pathFollowConfig);

    }

    update(time, delta)
    {
        let deltaMultiplier = (delta/16.66667); //for refresh rate indepence.
        /*
        Please multiply any movements that are happening in the update function by this variable.
        That way they don't speed up on high refresh rate displays. Ask Ethan for more help/info
        if you are unsure.
        */
        this.physics.overlap(this.obs1, this.testPlayer)

        if(!this.obs1.isFollowing()) {
           this.obs1.startFollow(this.pathFollowConfig);
        }
    }
}