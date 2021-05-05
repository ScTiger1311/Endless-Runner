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

        this.startFollow(this.pathFollowConfig)

        //Enable physics
        scene.physics.world.enable(this);
        this.body.onOverlap = true;
        this.body.setSize(this.width*.5, this.height*.5);

        //Create planet mask
        const shape = scene.make.graphics();
        shape.fillStyle(0xffffff);
        shape.beginPath();
        shape.fillRect(0, 0, 385, 720)
        shape.fillRect(game.config.width - 385, 0, 385, 720)
        shape.fillRect(0, game.config.height/2, 1280, 360)
        let mask = shape.createGeometryMask();

        this.setMask(mask);
    }

    reset() {
        this.stopFollow();
        this.setPosition(this.path.curves[0].points[0].x, this.path.curves[0].points[0].y);
        this.startFollow(this.pathFollowConfig, 0)
        this.body.enable = true;
    }

}