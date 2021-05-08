class basicObstacle extends Phaser.GameObjects.PathFollower {
    constructor(scene, curve, x, y, texture, frame, first) {
        super(scene, curve, x, y, texture, frame, first);
        scene.add.existing(this);

        this.firstSpawn = first;
        this.spawnedThisLoop = false;
        this.distanceAlongCurve = 0;
        this.totalFollowDuration = 4000;
        this.expired = false; //If this is true, the next time this resets it is destroyed
        this.fullScale = .4;
        
        //Setup path follow config
        this.pathFollowConfig = {
            duration: 4000,
            from: 0,
            to: 1,
            startAt: 0

        };

        this.offset = new Phaser.Math.Vector2(0, 0);

        this.startFollow(this.pathFollowConfig)

        this.pathTween.setTimeScale(this.scene.speedIncreasePoint);

        //Enable physics
        scene.physics.world.enable(this);
        this.body.onOverlap = true;
        this.body.setSize(this.width*.5, this.height*.5);
        this.body.immovable = true;
        this.body.allowGravity = false;

        //Create planet mask
        this.shape = scene.make.graphics();

        this.shape.fillStyle(0xffffff);
        this.shape.beginPath();
        this.shape.fillRect(0, 0, 385, 720)
        this.shape.fillRect(game.config.width - 385, 0, 385, 720)
        this.shape.fillRect(0, game.config.height/2, 1280, 360)
        this.onMask = this.shape.createGeometryMask();
 
        this.shape = scene.make.graphics();

        this.shape.fillStyle(0xffffff);
        this.shape.beginPath();
        this.shape.fillRect(0, 0, 1280, 720)

        this.offMask = this.shape.createGeometryMask();

        this.setMask(this.onMask);

        this.setScale(this.fullScale)
        this.play('bObstacleAnim');

        scene.physics.overlap(this, scene.player)

        this.csLogTimer = scene.time.addEvent({
            delay: 1000,
            repeat: 60
        });
    }

    reset() {
        let oldTimeScale = this.pathTween.timeScale;
        this.spawnedThisLoop = false;
        this.setMask(this.onMask);
        this.stopFollow();
        this.setPosition(this.path.curves[0].points[0].x, this.path.curves[0].points[0].y);
        this.startFollow(this.pathFollowConfig, 0)
        this.pathTween.setTimeScale(oldTimeScale);
        if(!this.firstSpawn == true) {
            this.offset.y = 0
            this.offset.y -= Math.floor(Math.random() * 151)
        }
        this.pathOffset = this.offset;
        this.body.enable = true;
        //console.log(this.distanceAlongCurve);
    }

    update() {

        this.distanceAlongCurve = this.pathTween.elapsed / this.totalFollowDuration;

        if(this.distanceAlongCurve > .4 && this.scene.basicObsGroup.getLength() < 3 && !this.spawnedThisLoop) {
            //Create enemy follower
            this.spawnedThisLoop = true;
            let obs = new basicObstacle(this.scene, this.scene.testPath, this.scene.testCurve.points[0].x, this.scene.testCurve.points[0].y, 'basicObstacleSpritesheet', 0, false).setOrigin(.5);
            this.scene.basicObsGroup.add(obs);
        }

        if (this.scene.gameSpeedTimer.getOverallProgress() > this.scene.speedIncreasePoint) {
            this.pathTween.setTimeScale(this.scene.gameSpeedTimer.getOverallProgress());
        }

        //Scale objects up as they approach the front section
        //Scale them down as they wrap around the back
        if(this.distanceAlongCurve < .4) {
            this.setScale(this.fullScale * (1-Math.abs(.4 - this.distanceAlongCurve)));
        }
        else if (this.distanceAlongCurve > .6) {
            this.setScale(this.fullScale * (1-Math.abs(.6 - this.distanceAlongCurve)));
        }
        

        if(this.x < this.scene.player.x - this.scene.player.width/2)
        this.body.enable = false;

        if(!this.isFollowing()) {
            this.reset()
        }

        if(this.x > game.config.width * (1-.12)) {
            //console.log("Off")
            this.setMask(this.offMask);
            //console.log(this.distanceAlongCurve);
        }

        if(this.x < game.config.width * (.16)) {
            //console.log("On")
            this.setMask(this.onMask);
            //console.log(this.distanceAlongCurve);
        }

        if(!this.isFollowing()) {
            this.reset()
        }
    }   

}