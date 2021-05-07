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
        this.load.atlas("cycle", "./assets/spritesheets/Player_atlas.png", "./assets/spritesheets/Player_Atlas.json");
    }

    create()
    {
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

        // gravity in pixels/sec
        this.physics.world.gravity.y = 2600;
        // creating 🏍
        this.player = new Player(this,game.config.width/3, game.config.height/2);

        // defining key
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);

        // create ground object here
        let testObj = this.add.rectangle(0, this.game.config.height-game.config.height/15, game.config.width, game.config.height/15, 0x000000);
        this.physics.add.existing(testObj);
        testObj.body.immovable = true;
        testObj.body.allowGravity = false;
        
        //create collider w/ ground
        this.physics.add.collider(this.player, this.testObj);
    }

    update(time, delta)
    {
        let deltaMultiplier = (delta/16.66667); //for refresh rate indepence.
        /*
        Please multiply any movements that are happening in the update function by this variable.
        That way they don't speed up on high refresh rate displays. Ask Ethan for more help/info
        if you are unsure.
        */
       this.player.update();
    }
}