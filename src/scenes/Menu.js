class Menu extends Phaser.Scene
{
    constructor()
    {
       super("menuScene");
    }

    init(data){
        this.menuScore = 0;
        if(data.score > 0){
            this.score = data.score;
        }
    }

    preload()
    {
        this.load.atlas("menuAtlas", "./assets/spritesheets/Menu_Atlas.png", "./assets/spritesheets/Menu_Atlas.json");
        console.log("Enter Menu Scene");
    }

    create()
    {
        this.background = this.add.image(this.game.config.width/2, this.game.config.height/2,'menuAtlas', 'MenuBase0001');
        // home menu screen
        this.home = this.add.sprite(this.game.config.width/2, this.game.config.height*.39, 'menuAtlas', 'Menu0001');
        this.anims.create({
            key: "home",
            frames: this.anims.generateFrameNames("menuAtlas",
            {
                prefix: "Menu",
                start: 1, 
                end: 2,
                zeroPad: 4,
            }),
            frameRate: 2,
            repeat: (-1),
        })
        // credits screen
        this.credits = this.add.sprite(this.game.config.width/2, this.game.config.height*.39, 'menuAtlas', 'Credits0001').setAlpha(0);        
        this.anims.create({
            key: "credit",
            frames: this.anims.generateFrameNames("menuAtlas",
            {
                prefix: "Credits",
                start: 1, 
                end: 2,
                zeroPad: 4,
            }),
            frameRate: 2,
            repeat: (-1),
        });
        // instructions screen
        this.instructions = this.add.sprite(this.game.config.width/2, this.game.config.height*.39, 'menuAtlas', 'Instruction0001').setAlpha(0);
        this.anims.create({
            key: "instructions",
            frames: this.anims.generateFrameNames("menuAtlas",
            {
                prefix: "Instructions",
                start: 1, 
                end: 2,
                zeroPad: 4,
            }),
            frameRate: 2,
            repeat: (-1),
        });
        // game over screen
        this.end = this.add.sprite(this.game.config.width/2, this.game.config.height*.39, 'menuAtlas', 'GameOver0001').setAlpha(0);
        this.anims.create({
            key: "gameover",
            frames: this.anims.generateFrameNames("menuAtlas",
            {
                prefix: "GameOver",
                start: 1, 
                end: 2,
                zeroPad: 4,
            }),
            frameRate: 2,
            repeat: (-1),
        });
        // creating screen flicker
        this.screen = this.add.sprite(this.game.config.width/2, this.game.config.height*.39, 'menuAtlas', 'ScreenEffect0001');
        this.anims.create({
            key: "flicker",
            frames: this.anims.generateFrameNames("menuAtlas",
            {
                prefix: "ScreenEffect",
                start: 1,
                end: 8,
                zeroPad: 4,
            }),
            frameRate: 5,
            repeat: -1,
        });
        this.home.play("home", true);
        this.screen.play("flicker");

        // variables to check what screen is active
        this.begin = true;
        this.cred = false;
        this.inst = false;
        this.ending = false;

        // score variable
        this.highScore = 0;

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        keyBACK = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.BACKSPACE);
    }

    update(time, delta)
    {
        let deltaMultiplier = (delta/16.66667); //for refresh rate indepence.
        /*
        Please multiply any movements that are happening in the update function by this variable.
        That way they don't speed up on high refresh rate displays. Ask Ethan for more help/info
        if you are unsure.
        */
        // if game over, view game over screen
        if(this.score > 0){
            this.home.setAlpha(0);
            this.end.setAlpha(1);
            this.end.play("gameover");
            this.begin = false;
            this.ending = true;
            this.score = 0;
        }

        // view instructions
        if(this.begin){
            if(Phaser.Input.Keyboard.JustDown(keyLEFT)){
                // view instructions
                this.home.setAlpha(0);
                this.instructions.setAlpha(1);
                this.instructions.play("instructions");
                this.begin = false;
                this.inst = true;
            }
            if(Phaser.Input.Keyboard.JustDown(keyRIGHT)){
                // view credits
                this.home.setAlpha(0);
                this.credits.setAlpha(1);
                this.credits.play("credit");
                this.begin = false;
                this.cred = true;
            }
            if(Phaser.Input.Keyboard.JustDown(keyENTER)){
                // start game
                this.scene.start('Play');
            }
        }

        else{
            if(Phaser.Input.Keyboard.JustDown(keyBACK)){
                this.begin = true;
                if(this.inst){
                    this.instructions.setAlpha(0);
                }
                if(this.cred){
                    this.credits.setAlpha(0)
                }
                if(this.ending){
                    this.end.setAlpha(0);
                }
                this.home.setAlpha(1);
            }
            if(this.ending && Phaser.Input.Keyboard.JustDown(keyENTER)){
                this.scene.start('Play');
            }
        }
    }
}