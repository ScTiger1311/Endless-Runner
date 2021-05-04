class basicObstacle extends Phaser.GameObjects.PathFollower {
    constructor(scene, curve, x, y, texture, frame,) {
        super(scene, curve, x, y, texture, frame);
        scene.add.existing(this);
        
        //Enable physics
        scene.physics.world.enable(this);
        this.body.onOverlap = true;
    }

}