// Start scene - all code, comments, and strings translated to English
export class Start extends Phaser.Scene {
    constructor() {
        super('Start');
    }

    preload() {
        // Loading assets
        this.load.image('background', '/src/game/assets/floor.png');
        this.load.image('floor', '/src/game/assets/floor.png');

        this.load.image('pc', '/src/game/assets/Furniture/pc.png');
        this.load.image('ladder_chair', '/src/game/assets/Furniture/ladder_chair.png');
        this.load.image('wardrobe', '/src/game/assets/Furniture/wardrobe.png');
        this.load.image('stove', '/src/game/assets/Furniture/stove.png');
        this.load.image('table', '/src/game/assets/Furniture/table.png');
        this.load.image('sink', '/src/game/assets/Furniture/sink.png');
        this.load.image('chair', '/src/game/assets/Furniture/chair.png');
        this.load.image('fridge', '/src/game/assets/Furniture/fridge.png');
        this.load.image('bookshelf', '/src/game/assets/Furniture/bookshelf.png');
        this.load.image('trash_bin', '/src/game/assets/Furniture/trash_bin.png');
        this.load.image('futon', '/src/game/assets/Furniture/futon.png');

        // Idle
        for (let i = 0; i <= 7; i++) {
            this.load.image(`fujimo_idle_${i}`, `/src/game/assets/idle/frame_${i}_delay-0.1s.png`);
        }

        // Walking
        for (let i = 1; i <= 8; i++) {
            this.load.image(`fujimo_walk_${i}`, `/src/game/assets/walk/fujimo_walk_${i}.png`);
        }

        // Special animation for S (down)
        for (let i = 1; i <= 8; i++) {
            this.load.image(`fujimo_idle_down_${i}`, `/src/game/assets/walk/horizontal/fujimo_idle_down${i}.png`);
        }

        // Idle/walk up
        for (let i = 1; i <= 7; i++) {
            this.load.image(`fujimo_idle_up_${i}`, `/src/game/assets/walk/horizontal/up/fujimo_idle_up${i}.png`);
        }
    }
    // ...rest of code translated to English...
}
