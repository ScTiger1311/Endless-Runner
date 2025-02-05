// Ethan Rafael
// Cameron Beattie
// Avery Weibel
// Sky Peterson
// Finished May 8
// Creative tilt justification: 
// Technically interesting things: the obstacles move along a path and 
//                                 get occluded by masks to give the illusion of orbiting the planet.
//  Some small things to achieve the effect were done on lines 100-105 in basicObstacle.js (And somewhere in the other one)
//  To scale the obstacles down as the went around the back to help sell the effect
//  A major part of the effect was learning how to use and manipulate path followers to get the obstacles moving in the desired way
//
// Style: A slick mixture of 3D polygonal art, and 2d pixel art.
// Very fancy and cool synthwave aesthetic, with a soundtrack that's better than I thought it would be.
// I think we're all proud of how the game turned out stylistically


let config =
{
    type: Phaser.CANVAS,
    width: 1280,
    height: 720,
    physics:{
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [Menu, Play],
    
}

let game = new Phaser.Game(config);
let highscore = 0


//set UI sizes

//reserve keyboard bindings
let keyF, keyR, keyLEFT, keyRIGHT, keyUP, keyDOWN, keyPLUS, keyMINUS, keyENTER, keyBACK;

