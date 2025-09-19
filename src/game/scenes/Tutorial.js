// Tutorial scene - all code, comments, and strings translated to English
export class Tutorial extends Phaser.Scene {
    constructor() {
        super({ key: 'Tutorial' });
    }

    preload() {
        this.load.image('heart', '/play/assets/heart.png');
        this.load.image('object', '/play/assets/object.png');
    }

    create() {
        this.heart = null;
        this.heartBPM = 60;
        this.heartTween = null;
        this.bpmText = null;
        this.objects = null;
        this.gameOver = false;
        this.win = false;
        this.objectDropInterval = 1200;
        this.objectTimer = 0;
        this.objectSpeed = 120;
        this.objectScale = 0.4;
        this.moreObjectsEvery = 6500;
        this.lastIncrease = 0;
        this.spawnAmount = 1;
        this.timeToWin = 60000;
        this.tutorialStep = 0;
        this.tutorialTexts = [
            "Welcome to the tutorial! Click to continue.",
            "You will see a heart beating in the center, help Fujimo focus.",
            "Objects will fall from the top of the screen.",
            "Some objects move in different ways. Pay attention!",
            "Click on objects to remove them before they reach the floor.",
            "If any object passes, the heart BPM increases!",
            "If BPM reaches 200, you lose.",
            "If you click 5 objects quickly, you get a bonus.",
            "Survive until the time runs out to win.",
            "Click to start!"
        ];
        this.tutorialTextObject = null;
    }
    // ...rest of code translated to English...
}
