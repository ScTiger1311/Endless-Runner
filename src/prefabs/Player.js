class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y){
        super(scene, x, y, 'cycle');
        // setting up animations
        scene.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNames('cycle',
            {
                prefix: "Idle",
                start: 1,
                end: 4,
                zeroPad: 4,
            }),
            frameRate: 15,
            repeat: -1
        });
        scene.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNames('cycle',
            {
                prefix: "Jump",
                start: 1,
                end: 4,
                zeroPad: 4,
            }),
            frameRate: 15
        });
        scene.anims.create({
            key: 'jumphold',
            frames: this.anims.generateFrameNames('cycle', 
            {
                prefix: "jumploop",
                start: 1,
                end: 4,
                zeroPad: 4,
            }),
            frameRate: 15
        });
        scene.anims.create({
            key: 'land',
            frames: this.anims.generateFrameNames('cycle',
            {
                prefix: "PlayerLand",
                start: 1,
                end: 4,
                zeroPad: 4,
            }),
            frameRate: 15
        });
        scene.anims.create({
            key: 'die',
            frames: this.anims.generateFrameNames('Explosion_Sheet',
            {
                start: 1,
                end: 7,
            }),
            frameRate: 15
        });
        this.play('idle');
        this.MAX_VEL = 800;
        this.JUMP_VEL = -900;
        this.MAX_JUMPS = 2;
        this.MAX_OBS = 3;

        // adding sprite and physics object to scene
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setMaxVelocity(0, this.MAX_VEL);
        
        // setting up variables
        this.isJumping = false;
        this.onGround = true;
        this.jumps = this.MAX_JUMPS;
        this.obsThisJump = this.MAX_OBS;
        this.horiSpeed = 1000;
        this.landed = false;
        this.dead = false;

        //this.setScale(.3);
        this.setScale(.4)
        this.body.setSize(this.width*.7, this.height*.7);
        this.body.setOffset(50, 45);

        this.play('player_idle_anim');
        this.body.onOverlap = true;

        // currently for debugging purposes
        this.setCollideWorldBounds(true);
    }

    die() {
        this.dead = true;
        this.setScale(.7)
        this.body.enable = false;
        this.scene.sound.stopAll();
        this.play("die");
        this.scene.explosion.play();
        this.on('animationcomplete', () =>{
            this.disableBody(true, true);
            //this.destroy();
        });

        this.gameOverTimer = this.scene.time.addEvent({
            delay: 1000,
            repeat: 4,
            callback: ()=>{
                this.scene.scene.start('menuScene', {score: this.scene.timeScore});
                if(this.scene.timeScore > highscore)
                    highscore = this.scene.timeScore;
            }
        });
    }
    
    update(time, delta) {
        let deltaMultiplier = (delta/16.66667); //for refresh rate indepence.

        if(!this.dead) {

            // checking if player is on the ground
            this.onGround = (this.y >= game.config.height * .6); //this.body.touching.down;

            if(keyRIGHT.isDown) {
                this.x += this.horiSpeed * deltaMultiplier;
            }
            //if player on ground, and jump button held, jump
            if(Phaser.Input.Keyboard.JustDown(keyUP) && !this.isJumping
            && this.jumps > 0){
                this.jumps -= 1;
                this.obsThisJump -= 1;
                this.isJumping = true;
                this.play('jump',true);
                this.playAfterDelay({key:'jumphold', repeat:-1}, 1600);
                console.log("Jumps: " + this.jumps + "obs: " + this.obsThisJump);
                if(this.obsThisJump > 0)
                    this.scene.addPlayerObstacle();
                this.body.velocity.y += this.JUMP_VEL;
                this.body.allowGravity = true;
                this.landed = false;
                this.body.setSize(this.width*.5, this.height*.5);
                this.scene.jump.play();
            }
            //if player in midair
            if(!this.onGround && this.isJumping){
                // /this.play('jumphold',true);
                this.isJumping = false;
            }
            // if player has landed, go back to idle sprite, reset number of jumps
            // NOTE: currently broken due to lack of item to collide with
            if(!this.isJumping && this.onGround){
                this.body.velocity.y = 0;
                this.y = game.config.height * .6;
                this.body.allowGravity = false;
                //console.log("Scale: " + this.body.sourceHeight + ", " + this.body.sourceWidth);
                this.jumps = this.MAX_JUMPS;
                this.obsThisJump = this.MAX_OBS
                if(!this.landed) {
                    this.play('land', true);
                    this.landed = true;
                    this.body.setSize(this.width*.7, this.height*.7);
                }
                
                    this.playAfterDelay('idle', 1600);
                /*this.on('animationcomplete', () =>{
                    this.play('idle',true);
                });*/
            }

        }

    }
}