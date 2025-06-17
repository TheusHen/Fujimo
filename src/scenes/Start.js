export class Start extends Phaser.Scene {
    constructor() {
        super('Start');
    }

    preload() {
        // Carregar o "floor" como novo background
        this.load.image('background', '/src/scenes/assets/floor.png');
        // Floor agora é só o chão base, por baixo de tudo
        this.load.image('floor', '/src/scenes/assets/floor.png');

        // Móveis para ficarem acima do novo fundo (floor.png)
        this.load.image('pc', '/src/scenes/assets/Moveis/pc.png');
        this.load.image('esc_cadeira', '/src/scenes/assets/Moveis/esc_cadeira.png');
        this.load.image('armario', '/src/scenes/assets/Moveis/armario.png');
        this.load.image('fogao', '/src/scenes/assets/Moveis/fogao.png');
        this.load.image('mesa', '/src/scenes/assets/Moveis/mesa.png');
        this.load.image('pia', '/src/scenes/assets/Moveis/pia.png');
        this.load.image('cadeira', '/src/scenes/assets/Moveis/cadeira.png');
        this.load.image('geladeira', '/src/scenes/assets/Moveis/geladeira.png');
        this.load.image('estante', '/src/scenes/assets/Moveis/estante.png');
        this.load.image('lixeira', '/src/scenes/assets/Moveis/lixeira.png');
        this.load.image('futon', '/src/scenes/assets/Moveis/futon.png');

        // Parada (idle)
        this.load.image('fujimo_parada_1', '/src/scenes/assets/parada/frame_1_delay-0.1s.png');
        this.load.image('fujimo_parada_2', '/src/scenes/assets/parada/frame_2_delay-0.1s.png');
        this.load.image('fujimo_parada_3', '/src/scenes/assets/parada/frame_3_delay-0.1s.png');
        this.load.image('fujimo_parada_4', '/src/scenes/assets/parada/frame_4_delay-0.1s.png');
        this.load.image('fujimo_parada_5', '/src/scenes/assets/parada/frame_5_delay-0.1s.png');
        this.load.image('fujimo_parada_6', '/src/scenes/assets/parada/frame_6_delay-0.1s.png');
        this.load.image('fujimo_parada_7', '/src/scenes/assets/parada/frame_7_delay-0.1s.png');
        this.load.image('fujimo_parada_0', '/src/scenes/assets/parada/frame_0_delay-0.1s.png');

        // Andando (walking)
        this.load.image('fujimo_andando_1', '/src/scenes/assets/andando/fujimo_andando_1.png');
        this.load.image('fujimo_andando_2', '/src/scenes/assets/andando/fujimo_andando_2.png');
        this.load.image('fujimo_andando_3', '/src/scenes/assets/andando/fujimo_andando_3.png');
        this.load.image('fujimo_andando_4', '/src/scenes/assets/andando/fujimo_andando_4.png');
        this.load.image('fujimo_andando_5', '/src/scenes/assets/andando/fujimo_andando_5.png');
        this.load.image('fujimo_andando_6', '/src/scenes/assets/andando/fujimo_andando_6.png');
        this.load.image('fujimo_andando_7', '/src/scenes/assets/andando/fujimo_andando_7.png');
        this.load.image('fujimo_andando_8', '/src/scenes/assets/andando/fujimo_andando_8.png');

        // Animação especial para S (baixo)
        this.load.image('fujimo_parada_baixo_3', '/src/scenes/assets/andando/horizontal/fujimo_parada_baixo3.png');
        this.load.image('fujimo_parada_baixo_4', '/src/scenes/assets/andando/horizontal/fujimo_parada_baixo4.png');
        this.load.image('fujimo_parada_baixo_5', '/src/scenes/assets/andando/horizontal/fujimo_parada_baixo5.png');
        this.load.image('fujimo_parada_baixo_6', '/src/scenes/assets/andando/horizontal/fujimo_parada_baixo6.png');
        this.load.image('fujimo_parada_baixo_7', '/src/scenes/assets/andando/horizontal/fujimo_parada_baixo7.png');
        this.load.image('fujimo_parada_baixo_8', '/src/scenes/assets/andando/horizontal/fujimo_parada_baixo8.png');
        this.load.image('fujimo_parada_baixo_1', '/src/scenes/assets/andando/horizontal/fujimo_parada_baixo1.png');
        this.load.image('fujimo_parada_baixo_2', '/src/scenes/assets/andando/horizontal/fujimo_parada_baixo2.png');

        // Andando/parada para cima (idle e walk up)
        this.load.image('fujimo_parada_cima_1', '/src/scenes/assets/andando/horizontal/cima/fujimo_parada_cima1.png');
        this.load.image('fujimo_parada_cima_2', '/src/scenes/assets/andando/horizontal/cima/fujimo_parada_cima2.png');
        this.load.image('fujimo_parada_cima_3', '/src/scenes/assets/andando/horizontal/cima/fujimo_parada_cima3.png');
        this.load.image('fujimo_parada_cima_4', '/src/scenes/assets/andando/horizontal/cima/fujimo_parada_cima4.png');
        this.load.image('fujimo_parada_cima_5', '/src/scenes/assets/andando/horizontal/cima/fujimo_parada_cima5.png');
        this.load.image('fujimo_parada_cima_6', '/src/scenes/assets/andando/horizontal/cima/fujimo_parada_cima6.png');
        this.load.image('fujimo_parada_cima_7', '/src/scenes/assets/andando/horizontal/cima/fujimo_parada_cima7.png');
    }

    create() {
        var width = this.scale.width;
        var height = this.scale.height;

        // Tamanhos finais para background (agora floor.png) e floor original (ainda mais embaixo)
        var floorDisplayWidth = width + 15;
        var floorDisplayHeight = height + 15;

        // Floor embaixo de tudo
        this.floor = this.add.image(width / 2, height / 2, 'floor');
        this.floor.setDisplaySize(floorDisplayWidth, floorDisplayHeight);
        this.floor.setDepth(0);

        // Novo background (floor.png) acima do chão base
        this.background = this.add.image(width / 2, height / 2, 'background');
        this.background.setDisplaySize(width, height);
        this.background.setDepth(1);

        // Margem em px dos móveis
        const margem = 20;

        // Móveis com margens aplicadas
        const moveis = [
            { key: 'pc',         x: width * 0.06    + margem, y: height * 0.35    + margem },
            { key: 'esc_cadeira',x: width * 0.14    + margem, y: height * 0.2     + margem },
            { key: 'armario',    x: width * 0.352   + margem, y: height * 0.86    - margem },
            { key: 'fogao',      x: width * 0.5     + margem, y: height * 0.1     + margem },
            { key: 'mesa',       x: width * 0.65    - margem, y: height * 0.55    - margem },
            { key: 'pia',        x: width * 0.7     - margem, y: height * 0.1     + margem },
            { key: 'cadeira',    x: width * 0.8     - margem, y: height * 0.56    - margem },
            { key: 'geladeira',  x: width * 0.6     - margem, y: height * 0.1     + margem },
            { key: 'estante',    x: width * 0.25    + margem, y: height * 0.02    + margem },
            { key: 'lixeira',    x: width * 0.38    + margem, y: height * 0.1     + margem },
            { key: 'futon',      x: width * 0.145   + margem, y: height * 0.86    - margem },
        ];
        this.moveisSprites = [];
        moveis.forEach((item) => {
            const sprite = this.add.image(item.x, item.y, item.key);
            sprite.setDepth(2); // Todos os móveis acima do background
            this.moveisSprites.push(sprite);
        });

        // Sprite inicial em idle/parada
        this.fujimo = this.add.sprite(width / 2, height / 2, 'fujimo_parada_0');
        this.fujimo.setDepth(3);

        // Animação parada (idle) - LADO
        this.anims.create({
            key: 'idle_side',
            frames: [
                { key: 'fujimo_parada_1' },
                { key: 'fujimo_parada_2' },
                { key: 'fujimo_parada_3' },
                { key: 'fujimo_parada_4' },
                { key: 'fujimo_parada_5' },
                { key: 'fujimo_parada_6' },
                { key: 'fujimo_parada_7' },
                { key: 'fujimo_parada_0' }
            ],
            frameRate: 10,
            repeat: -1
        });

        // Animação parada (idle) - BAIXO
        this.anims.create({
            key: 'idle_down',
            frames: [
                { key: 'fujimo_parada_baixo_1' },
                { key: 'fujimo_parada_baixo_2' },
                { key: 'fujimo_parada_baixo_3' },
                { key: 'fujimo_parada_baixo_4' },
                { key: 'fujimo_parada_baixo_5' },
                { key: 'fujimo_parada_baixo_6' },
                { key: 'fujimo_parada_baixo_7' },
                { key: 'fujimo_parada_baixo_8' }
            ],
            frameRate: 10,
            repeat: -1
        });

        // Animação parada (idle) - CIMA
        this.anims.create({
            key: 'idle_up',
            frames: [
                { key: 'fujimo_parada_cima_1' },
                { key: 'fujimo_parada_cima_2' },
                { key: 'fujimo_parada_cima_3' },
                { key: 'fujimo_parada_cima_4' },
                { key: 'fujimo_parada_cima_5' },
                { key: 'fujimo_parada_cima_6' },
                { key: 'fujimo_parada_cima_7' }
            ],
            frameRate: 10,
            repeat: -1
        });

        // Animação andando (walking) - LADO
        this.anims.create({
            key: 'walk_side',
            frames: [
                { key: 'fujimo_andando_1' },
                { key: 'fujimo_andando_2' },
                { key: 'fujimo_andando_3' },
                { key: 'fujimo_andando_4' },
                { key: 'fujimo_andando_5' },
                { key: 'fujimo_andando_6' },
                { key: 'fujimo_andando_7' },
                { key: 'fujimo_andando_8' }
            ],
            frameRate: 10,
            repeat: -1
        });

        // Animação andando (walking) - BAIXO
        this.anims.create({
            key: 'walk_down',
            frames: [
                { key: 'fujimo_parada_baixo_3' },
                { key: 'fujimo_parada_baixo_4' },
                { key: 'fujimo_parada_baixo_5' },
                { key: 'fujimo_parada_baixo_6' },
                { key: 'fujimo_parada_baixo_7' },
                { key: 'fujimo_parada_baixo_8' },
                { key: 'fujimo_parada_baixo_1' },
                { key: 'fujimo_parada_baixo_2' }
            ],
            frameRate: 10,
            repeat: -1
        });

        // Animação andando (walking) - CIMA
        this.anims.create({
            key: 'walk_up',
            frames: [
                { key: 'fujimo_parada_cima_1' },
                { key: 'fujimo_parada_cima_2' },
                { key: 'fujimo_parada_cima_3' },
                { key: 'fujimo_parada_cima_4' },
                { key: 'fujimo_parada_cima_5' },
                { key: 'fujimo_parada_cima_6' },
                { key: 'fujimo_parada_cima_7' }
            ],
            frameRate: 10,
            repeat: -1
        });

        this.fujimo.play('idle_side');

        // Atalhos para teclas W A S D
        this.keys = this.input.keyboard.addKeys({
            up: 'W',
            left: 'A',
            down: 'S',
            right: 'D'
        });

        this.speed = 200;

        this.scale.on('resize', this.resize, this);

        // Estado de movimento
        this.isMoving = false;
        this.lastDirection = 'down'; // Começa olhando pra baixo

        // JOYSTICK MOBILE
        this.initMobileJoystick();
    }

    // Função para detectar mobile (simples)
    isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    initMobileJoystick() {
        this.joystick = {
            up: false,
            down: false,
            left: false,
            right: false
        };
        if (!this.isMobile()) {
            this.joystickContainer && this.joystickContainer.setVisible(false);
            return;
        }
        // Cria um container para o joystick
        this.joystickContainer = this.add.container();
        const Y = this.scale.height - 80;
        const X = 80;
        const size = 44;
        const alpha = 0.8;

        // Círculos de direção
        const btnLeft = this.add.circle(X - size, Y, size, 0xaaaaaa, alpha)
            .setInteractive()
            .on('pointerdown', () => this.joystick.left = true)
            .on('pointerup', () => this.joystick.left = false)
            .on('pointerout', () => this.joystick.left = false);
        const btnRight = this.add.circle(X + size, Y, size, 0xaaaaaa, alpha)
            .setInteractive()
            .on('pointerdown', () => this.joystick.right = true)
            .on('pointerup', () => this.joystick.right = false)
            .on('pointerout', () => this.joystick.right = false);
        const btnUp = this.add.circle(X, Y - size, size, 0xaaaaaa, alpha)
            .setInteractive()
            .on('pointerdown', () => this.joystick.up = true)
            .on('pointerup', () => this.joystick.up = false)
            .on('pointerout', () => this.joystick.up = false);
        const btnDown = this.add.circle(X, Y + size, size, 0xaaaaaa, alpha)
            .setInteractive()
            .on('pointerdown', () => this.joystick.down = true)
            .on('pointerup', () => this.joystick.down = false)
            .on('pointerout', () => this.joystick.down = false);

        // Pequenos ícones ou setas opcionais (desenhe usando graphics se quiser)

        this.joystickContainer.add([btnLeft, btnRight, btnUp, btnDown]);
        this.joystickContainer.setDepth(100);

        // Responsivo
        this.scale.on('resize', (gameSize) => {
            const Y = gameSize.height - 80;
            btnLeft.setPosition(X - size, Y);
            btnRight.setPosition(X + size, Y);
            btnUp.setPosition(X, Y - size);
            btnDown.setPosition(X, Y + size);
        });
    }

    update(time, delta) {
        var moveAmount = (this.speed * delta) / 1000;
        var width = this.scale.width;
        var height = this.scale.height;

        var newX = this.fujimo.x;
        var newY = this.fujimo.y;

        // Checa se está andando
        var isLeft = this.keys.left.isDown || (this.joystick && this.joystick.left);
        var isRight = this.keys.right.isDown || (this.joystick && this.joystick.right);
        var isUp = this.keys.up.isDown || (this.joystick && this.joystick.up);
        var isDown = this.keys.down.isDown || (this.joystick && this.joystick.down);

        var moving = isLeft || isRight || isUp || isDown;

        // Detecção de direção prioritária (vertical > horizontal)
        var direction = null;
        if (isDown) direction = 'down';
        else if (isUp) direction = 'up';
        else if (isLeft) direction = 'left';
        else if (isRight) direction = 'right';

        // Movimento físico
        if (isLeft) {
            newX -= moveAmount;
            this.fujimo.setFlipX(true);
        }
        else if (isRight) {
            newX += moveAmount;
            this.fujimo.setFlipX(false);
        }

        if (isUp) {
            newY -= moveAmount;
        }
        if (isDown) {
            newY += moveAmount;
        }

        // Colisão com bordas
        var halfWidth = this.fujimo.displayWidth / 2;
        var halfHeight = this.fujimo.displayHeight / 2;

        newX = Phaser.Math.Clamp(newX, halfWidth, width - halfWidth);
        newY = Phaser.Math.Clamp(newY, halfHeight, height - halfHeight);

        this.fujimo.x = newX;
        this.fujimo.y = newY;

        // Troca animação conforme movimento e direção
        if (moving) {
            if (direction === 'down') {
                if (!this.fujimo.anims.currentAnim || this.fujimo.anims.currentAnim.key !== 'walk_down') {
                    this.fujimo.play('walk_down');
                }
            } else if (direction === 'up') {
                if (!this.fujimo.anims.currentAnim || this.fujimo.anims.currentAnim.key !== 'walk_up') {
                    this.fujimo.play('walk_up');
                }
            } else if (direction === 'left' || direction === 'right') {
                if (!this.fujimo.anims.currentAnim || this.fujimo.anims.currentAnim.key !== 'walk_side') {
                    this.fujimo.play('walk_side');
                }
                this.fujimo.setFlipX(direction === 'left');
            }
            this.isMoving = true;
            this.lastDirection = direction;
        } else {
            if (this.isMoving) {
                if (this.lastDirection === 'down') {
                    this.fujimo.play('idle_down');
                } else if (this.lastDirection === 'up') {
                    this.fujimo.play('idle_up');
                } else if (this.lastDirection === 'left' || this.lastDirection === 'right') {
                    this.fujimo.play('idle_side');
                    this.fujimo.setFlipX(this.lastDirection === 'left');
                }
                this.isMoving = false;
            }
        }
    }

    resize(gameSize) {
        var width = gameSize.width;
        var height = gameSize.height;

        // floor tem +15 em cada dimensão, centralizado
        var floorDisplayWidth = width + 15;
        var floorDisplayHeight = height + 15;

        this.floor.setDisplaySize(floorDisplayWidth, floorDisplayHeight);
        this.floor.setPosition(width / 2, height / 2);

        this.background.setDisplaySize(width, height);
        this.background.setPosition(width / 2, height / 2);

        // Redimensiona móveis com margem (deve ser igual ao create)
        const margem = 20;
        if (this.moveisSprites) {
            const moveis = [
                { x: width * 0.06    + margem, y: height * 0.35    + margem },   // pc
                { x: width * 0.14    + margem, y: height * 0.2     + margem },   // esc_cadeira
                { x: width * 0.352   + margem, y: height * 0.86    - margem },   // armario
                { x: width * 0.5     + margem, y: height * 0.1     + margem },   // fogao
                { x: width * 0.65    - margem, y: height * 0.55    - margem },   // mesa
                { x: width * 0.7     - margem, y: height * 0.1     + margem },   // pia
                { x: width * 0.8     - margem, y: height * 0.56    - margem },   // cadeira
                { x: width * 0.6     - margem, y: height * 0.1     + margem },   // geladeira
                { x: width * 0.25    + margem, y: height * 0.02    + margem },   // estante
                { x: width * 0.38    + margem, y: height * 0.1     + margem },   // lixeira
                { x: width * 0.145   + margem, y: height * 0.86    - margem },   // futon
            ];
            this.moveisSprites.forEach((sprite, i) => {
                sprite.setPosition(moveis[i].x, moveis[i].y);
            });
        }

        this.fujimo.setPosition(width / 2, height / 2);

        // Redimensiona joystick se existir
        if (this.joystickContainer && this.isMobile()) {
            const X = 80;
            const Y = height - 80;
            const size = 44;
            this.joystickContainer.iterate((btn, i) => {
                // ordem: 0=left, 1=right, 2=up, 3=down
                if (i === 0) btn.setPosition(X - size, Y);
                if (i === 1) btn.setPosition(X + size, Y);
                if (i === 2) btn.setPosition(X, Y - size);
                if (i === 3) btn.setPosition(X, Y + size);
            });
        }
    }
}