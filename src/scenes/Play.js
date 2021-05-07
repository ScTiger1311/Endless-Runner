class Play extends Phaser.Scene
{
    constructor()
    {
       super("playScene"); 
    }

    init (data) {
        this.menuData = data.menuTime;
    }

    preload()
    {
        this.load.atlas("planet_sheet", "./assets/spritesheets/spinning_planet.png", "./assets/spritesheets/spinning_planet.json");
        this.load.atlas("planet_top_sheet", "./assets/spritesheets/planet_toplayer.png", "./assets/spritesheets/planet_toplayer.json");
        this.load.image("gridBG", "./assets/single_sprites/grid_bg.png");
        this.load.image("obstacle", "./assets/sprites/TempEnemy.png");
        
        this.load.spritesheet("tempPlayer", "./assets/spritesheets/Player_Idle_Sheet.png", {frameWidth: 416, frameHeight: 222, startFrame: 0, endFrame: 3});
        this.load.spritesheet('basicObstacleSpritesheet', './assets/spritesheets/Obstacle_Blue_Sheet.png', {frameWidth: 156, frameHeight: 148, startFrame: 0, endFrame: 16})
        this.load.spritesheet('player_obstacle_sheet', './assets/spritesheets/Obstacle_Red_Sheet.png', {frameWidth: 156, frameHeight: 148, startFrame: 0, endFrame: 16})
        //this.load.plugin('rexpathfollowerplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexpathfollowerplugin.min.js', true);
        this.load.atlas("cycle", "./assets/spritesheets/Player_atlas.png", "./assets/spritesheets/Player_Atlas.json");
    }

    create()
    {
        console.log("Entered play scene");
        console.log(this.menuData)

        this.anims.create({
            key: 'bObstacleAnim',
            frames: this.anims.generateFrameNumbers('basicObstacleSpritesheet',
            {
                start: 0,
                end: 15,
                first: 0
            }),
            frameRate: 15,
            repeat: -1

        });

        this.anims.create({
            key: 'player_obstacle_anim',
            frames: this.anims.generateFrameNumbers('player_obstacle_sheet',
            {
                start: 0,
                end: 15,
                first: 0
            }),
            frameRate: 12,
            repeat: -1

        });

        this.anims.create({
            key: 'player_idle_anim',
            frames: this.anims.generateFrameNumbers('tempPlayer',
            {
                start: 0,
                end: 3,
                first: 0
            }),
            frameRate: 15,
            repeat: -1

        });

        this.backgroundStatic = this.add.sprite(0,0, "gridBG").setOrigin(0,0);
        this.backgroundAnim = this.add.sprite(0,0, "planet_sheet").setOrigin(0,0);
        this.speedIncreasePoint = .3;
        this.bgMaxPlaySpeed = 240;
        this.bgConfig = this.anims.create(
            {
                key: "spinning_planet_anim",
                frames: this.anims.generateFrameNames("planet_sheet", 
                {
                    prefix: "",
                    start: 1,
                    end: 120,
                    zeroPad: 4,
                }),
                frameRate: this.bgMaxPlaySpeed,
            });




        //Setup graphics
         this.curveGraphics = this.add.graphics();

         this.curveGraphics.lineStyle(10, 0xFF0000);
         this.curveGraphics.beginPath();
         this.curveGraphics.closePath();

         //Create actual spline points
        this.testCurve = new Phaser.Curves.Spline([
            [game.config.width * .500,     game.config.height * .422], //[0]
            [game.config.width * (1-.280),     game.config.height * .432], //[1]
            [game.config.width * (1-.156),     game.config.height * .479], //[2]
            [game.config.width * (1-.109),     game.config.height * .528], //[3]
            [game.config.width * (1-.156),     game.config.height * .585], //[4]
            [game.config.width * (1-.262),     game.config.height * .605], //[5]
            //[game.config.width * (1-.500),     game.config.height * .595], //[6]
            [game.config.width * (.262),       game.config.height * .605], //[7]
            [game.config.width * (.156),       game.config.height * .585], //[8]
            [game.config.width * (.109),       game.config.height * .528], //[9]
            [game.config.width * (.156),       game.config.height * .479], //[10]
            [game.config.width * (.280),       game.config.height * .432], //[11]
        ]);

        //Create path using spline
        this.testPath = this.add.path(this.testCurve.points[0].x, this.testCurve.points[0].y);
        this.testPath.add(this.testCurve);
        this.testPath.closePath()

        //Draw the new path
        //this.curveGraphics.strokePoints(this.testPath.curves[0].points);

        //Create temp physics body to test collision
        /*
        this.testPlayer = this.physics.add.sprite(this.testCurve.points[6].x + 150, this.testCurve.points[6].y, 'tempPlayer').setOrigin(.5, 1);
        this.testPlayer.setScale(.3);
        this.testPlayer.body.setSize(this.testPlayer.width*.7, this.testPlayer.height*.7);
        this.testPlayer.body.setOffset(50, 45);
        this.testPlayer.play('player_idle_anim');
        this.testPlayer.body.onOverlap = true;
        */

        //Setup world physics and player

        // gravity in pixels/sec
        this.physics.world.gravity.y = 2600;
        // creating 🏍
        this.player = new Player(this,game.config.width/3, game.config.height/2);

        // defining key
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);

        // create ground object here
        this.testObj = this.add.rectangle(0, this.game.config.height-game.config.height/15, game.config.width, game.config.height/10, 0x000000);
        this.physics.add.existing(this.testObj);
        this.testObj.body.immovable = true;
        this.testObj.body.allowGravity = false;
        
        //create collider w/ ground
        this.physics.add.collider(this.player, this.testObj);

        //Setup physics world overlap event between player and obstacle
        this.physics.world.on('overlap', (obj1, obj2, bod1, bod2)=>{
            //Reset obj position on path
            obj2.reset()
        });

        //Setup player obstacle group
        this.playerObsGroup = this.add.group({
            runChildUpdate: true
        })

        //Setup basic obstacle group
        this.basicObsGroup = this.add.group({
            runChildUpdate: true
        })

        //Create enemy follower
        let obs1 = new basicObstacle(this, this.testPath, this.testCurve.points[0].x, this.testCurve.points[0].y, 'basicObstacleSpritesheet', 0).setOrigin(.5);
        this.basicObsGroup.add(obs1);

        //Display score
        let gameUIConfig = {
            fontFamily: 'RocketRinder',
            fontSize: '32px',
            color: '#C9E2FF',
            stroke: '#ff002c',
            strokeThickness: '2',
            shadow: {
                color: '#ff004c',
                fill: 'true',
                blur: '20'
            },
            align: 'center',
            baselineX: 3,
            padding: {
                top: 1,
                bottom: 1,
                left: 1,
                right: 1            
            },
            fixedWidth: 0,
        }

        //Place text
        this.scoreText = this.add.text(30, game.config.height * .73, "Hello World", gameUIConfig);




        //Setup keyboard control
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

        //Set up game progress timer event
        //After this event ends the speed will be at its max
        this.gameSpeedTimer = this.time.addEvent({
            delay: 1000,
            repeat: 60

        });

        //Start scoring timer event
        this.timer = this.time.addEvent({
            delay: 1,
            callback: () => {this.timeScore += 1},
            loop: true
        });

        this.timeScore = 0;

        //Illegal animation fuckery
        this.bgConfig.frameRate = this.bgMaxPlaySpeed * this.speedIncreasePoint;
        this.backgroundAnim.anims.stopOnFrame(120)
        this.backgroundAnim.play("spinning_planet_anim");
        //this.backgroundAnim.anims.setRepeat(-1)
        //console.log("Bg Loop: " + this.gameSpeedTimer.getOverallProgress() + "\nFPS: " + this.backgroundAnim.anims.frameRate);
    }

    addPlayerObstacle() {
        if(this.playerObsGroup.getLength() > 2) {
            let dObs = this.playerObsGroup.getLast(true, false)
            dObs.expired = true;
        }
        let pObs = new playerObstacle(this, this.testPath, this.testCurve.points[0].x, this.testCurve.points[0].y, 'player_obstacle_sheet', 0).setOrigin(.5);
        this.playerObsGroup.add(pObs);

    }

    update(time, delta)
    {
        let deltaMultiplier = (delta/16.66667); //for refresh rate indepence.
        /*
        Please multiply any movements that are happening in the update function by this variable.
        That way they don't speed up on high refresh rate displays. Ask Ethan for more help/info
        if you are unsure.
        */

        //more illegal animation fuckery
        if(!this.backgroundAnim.anims.isPlaying) {
             if (this.gameSpeedTimer.getOverallProgress() > this.speedIncreasePoint){
                this.bgConfig.frameRate = this.bgMaxPlaySpeed * this.gameSpeedTimer.getOverallProgress();
             }
            this.backgroundAnim.play("spinning_planet_anim");
            //this.backgroundAnim.anims.stopOnFrame(120)

           // console.log("Bg Loop: " + this.gameSpeedTimer.getOverallProgress() + "\nFPS: " + this.backgroundAnim.anims.frameRate);
        }

        /*if(this.gameSpeedTimer.getOverallProgress() > .3) {
            this.backgroundAnim.anims.currentAnim.frameRate = this.bgMaxPlaySpeed * this.gameSpeedTimer.getOverallProgress();
        }*/

        

        this.scoreText.setText("Hyperseconds Drifted: " + this.timer.elapsed.toFixed(0) );

        if(Phaser.Input.Keyboard.JustDown(keyUP))
        {         
            this.player.y -= 100
            this.addPlayerObstacle()
        }

        if(Phaser.Input.Keyboard.JustDown(keyDOWN))
        {         
            this.player.y += 100
        }

        this.physics.overlap(this.player, this.playerObsGroup);
        this.physics.overlap(this.player, this.basicObsGroup);
        // /this.physics.collide(this.player, this.testObj);
        this.player.update();
    }
}