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
        this.play('idle');
        this.MAX_VEL = 2000;
        this.JUMP_VEL = -600;
        this.MAX_JUMPS = 1;

        // adding sprite and physics object to scene
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setMaxVelocity(0, this.MAX_VEL);
        
        // setting up variables
        this.isJumping = false;
        this.onGround = true;
        this.jumps = 1;

        //this.setScale(.3);
        // this.body.setSize(this.width*.7, this.height*.7);
        // this.body.setOffset(50, 45);
        this.body.width

        this.play('player_idle_anim');
        this.body.onOverlap = true;

        // currently for debugging purposes
        this.setCollideWorldBounds(true);
    }
    
    update() {
        // checking if player is on the ground
        this.onGround = (this.y >= game.config.height * .595); //this.body.touching.down;
        //if player on ground, and jump button held, jump
        if(Phaser.Input.Keyboard.DownDuration(keyUP, 150) && !this.isJumping
           && this.jumps > 0){
            this.isJumping = true;
            this.play('jump',true);
            //console.log("Scale: " + this.body.sourceHeight + ", " + this.body.sourceWidth);
            this.body.velocity.y = this.JUMP_VEL;
            this.body.allowGravity = true;
        }
        //if player in midair
        if(!this.onGround && this.isJumping){
            this.play('jumphold',true);
            this.isJumping = false;
            this.jumps--;
        }
        // if player has landed, go back to idle sprite, reset number of jumps
        // NOTE: currently broken due to lack of item to collide with
        if(!this.isJumping && this.onGround){
            this.play('idle',true);
            this.body.velocity.y = 0;
            this.body.allowGravity = false;
            //console.log("Scale: " + this.body.sourceHeight + ", " + this.body.sourceWidth);
            this.jumps = this.MAX_JUMPS;
        }
    }
}