class basicObstacle extends Phaser.GameObjects.PathFollower {
    constructor(scene, curve, x, y, texture, frame,) {
        super(scene, curve, x, y, texture, frame);
        scene.add.existing(this);
        
        //Setup path follow config
        this.pathFollowConfig = {
            duration: 4000,
            from: 0,
            to: 1,
            startAt: 0

        };

        this.offset = new Phaser.Math.Vector2(0, 0);

        this.startFollow(this.pathFollowConfig)

        //Enable physics
        scene.physics.world.enable(this);
        this.body.onOverlap = true;
        this.body.setSize(this.width*.5, this.height*.5);

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
    }

    reset() {
        this.stopFollow();
        this.setPosition(this.path.curves[0].points[0].x, this.path.curves[0].points[0].y);
        this.startFollow(this.pathFollowConfig, 0)
        this.offset.y = 0
        this.offset.y -= Math.floor(Math.random() * 81)
        this.pathOffset = this.offset;
        this.body.enable = true;
    }

    update() {
        if(this.x > game.config.width * (1-.12)) {
            console.log("Off")
            this.setMask(this.offMask);
        }

        if(this.x < game.config.width * (.16)) {
            console.log("On")
            this.setMask(this.onMask);
        }
    }   

}