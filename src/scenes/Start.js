export class Start extends Phaser.Scene {
    constructor() {
        super('Start');
    }

    preload() {
        // Carregando assets
        this.load.image('background', '/src/scenes/assets/floor.png');
        this.load.image('floor', '/src/scenes/assets/floor.png');

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
        for (let i = 0; i <= 7; i++) {
            this.load.image(`fujimo_parada_${i}`, `/src/scenes/assets/parada/frame_${i}_delay-0.1s.png`);
        }

        // Andando (walking)
        for (let i = 1; i <= 8; i++) {
            this.load.image(`fujimo_andando_${i}`, `/src/scenes/assets/andando/fujimo_andando_${i}.png`);
        }

        // Animação especial para S (baixo)
        for (let i = 1; i <= 8; i++) {
            this.load.image(`fujimo_parada_baixo_${i}`, `/src/scenes/assets/andando/horizontal/fujimo_parada_baixo${i}.png`);
        }

        // Andando/parada para cima (idle e walk up)
        for (let i = 1; i <= 7; i++) {
            this.load.image(`fujimo_parada_cima_${i}`, `/src/scenes/assets/andando/horizontal/cima/fujimo_parada_cima${i}.png`);
        }

        // Natasha animações
        this.load.image('natasha1', '/src/scenes/assets/Natasha/natasha1.png');
        this.load.image('natasha2', '/src/scenes/assets/Natasha/natasha2.png');
        this.load.image('natasha3', '/src/scenes/assets/Natasha/natasha3.png');
        this.load.image('natasha4', '/src/scenes/assets/Natasha/natasha4.png');
        this.load.image('natasha5', '/src/scenes/assets/Natasha/natasha5.png');
        this.load.image('natasha6', '/src/scenes/assets/Natasha/natasha6.png');
    }

    create() {
        const width = this.scale.width;
        const height = this.scale.height;

        // Floor e background
        this.floor = this.add.image(width / 2, height / 2, 'floor');
        this.floor.setDisplaySize(width + 15, height + 15).setDepth(0);

        this.background = this.add.image(width / 2, height / 2, 'background');
        this.background.setDisplaySize(width, height).setDepth(1);

        // Móveis: cada item pode ter uma margem personalizada (margin: px)
        this.moveis = [
            { key: 'pc',         x: width * 0.06,    y: height * 0.35, margin: 1 },
            { key: 'esc_cadeira',x: width * 0.14,    y: height * 0.2,  margin: 1 },
            { key: 'armario',    x: width * 0.352,   y: height * 0.86, margin: 1 },
            { key: 'fogao',      x: width * 0.5,     y: height * 0.1,  margin: 1 },
            { key: 'mesa',       x: width * 0.65,    y: height * 0.85, margin: 1 },
            { key: 'pia',        x: width * 0.7,     y: height * 0.1,  margin: 1 },
            { key: 'cadeira',    x: width * 0.8,     y: height * 0.85, margin: 1 },
            { key: 'geladeira',  x: width * 0.6,     y: height * 0.1,  margin: 1 },
            { key: 'estante',    x: width * 0.25,    y: height * 0.02, margin: 1 },
            { key: 'lixeira',    x: width * 0.38,    y: height * 0.1,  margin: 1 },
            { key: 'futon',      x: width * 0.145,   y: height * 0.86, margin: 1 },
        ];
        this.moveisSprites = [];
        this.moveisRects = [];
        this.moveis.forEach((item) => {
            const sprite = this.add.image(item.x, item.y, item.key);
            sprite.setDepth(2);
            this.moveisSprites.push(sprite);
        });

        // Geração dinâmica do array 'moveis' (apenas com posição e key, para uso externo)
        this.updateMoveisList = () => {
            // Apenas retorna um array com {key, x, y, margin}
            return this.moveis.map((item, idx) => ({
                key: item.key,
                x: this.moveisSprites[idx]?.x ?? item.x,
                y: this.moveisSprites[idx]?.y ?? item.y,
                margin: item.margin
            }));
        };

        // Fujimo um pouco à esquerda do centro (ex: 30% da largura)
        const fujimoStartX = width * 0.3;
        const fujimoStartY = height / 2;
        this.fujimo = this.add.sprite(fujimoStartX, fujimoStartY, 'fujimo_parada_0').setDepth(3);

        // Cria animações
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

        // Natasha animação
        this.anims.create({
            key: 'natasha_anim',
            frames: [
                { key: 'natasha3' },
                { key: 'natasha4' },
                { key: 'natasha5' },
                { key: 'natasha6' },
                { key: 'natasha1' },
                { key: 'natasha2' }
            ],
            frameRate: 8,
            repeat: -1
        });

        // Natasha parada (idle)
        this.anims.create({
            key: 'natasha_idle',
            frames: [
                { key: 'natasha3' }
            ],
            frameRate: 1,
            repeat: -1
        });

        this.fujimo.play('idle_side');

        this.keys = this.input.keyboard.addKeys({
            up: 'W',
            left: 'A',
            down: 'S',
            right: 'D'
        });

        this.speed = 200;
        this.scale.on('resize', this.resize, this);

        this.isMoving = false;
        this.lastDirection = 'down';

        this.initMobileJoystick();

        // Controle para travar o Fujimo e input durante Natasha
        this.fujimoLocked = false;

        // NATASHA: após 5 segundos, entra animação e vai até o centro
        this.natashaSpawned = false;
        this.time.delayedCall(5000, () => {
            this.spawnNatasha();
        });
    }

    spawnNatasha() {
        if (this.natashaSpawned) return;
        this.natashaSpawned = true;

        const width = this.scale.width;
        const height = this.scale.height;

        // Natasha começa fora da tela à direita
        this.natasha = this.add.sprite(width + 100, height / 2, 'natasha3').setDepth(5);
        // Natasha idle (parada) ao vir para o centro
        this.natasha.play('natasha_idle');

        // Travar controles da Fujimo enquanto Natasha entra e fala
        this.fujimoLocked = true;

        // Move Natasha até o centro devagar, mas parada (idle)
        this.natashaWalking = true;
        this.tweens.add({
            targets: this.natasha,
            x: width / 2,
            duration: 3500, // Mais lento
            ease: 'Linear',
            onUpdate: () => {
                // Natasha permanece idle
            },
            onComplete: () => {
                this.natashaWalking = false;
                // Após chegar ao centro, troca ela para animação normal (se quiser)
                this.natasha.play('natasha_anim');
                // Após chegar ao centro, mostrar as caixas de diálogo sequenciais
                this.showNatashaDialogs();
            }
        });
    }

    showNatashaDialogs() {
        // Mensagens sequenciais animadas: "Olá", "Okey", "Começar"
        const width = this.scale.width;
        const height = this.scale.height;
        const dialogs = [
            { text: 'Olá', key: 'dialog1' },
            { text: 'Okey', key: 'dialog2' },
            { text: 'Começar', key: 'dialog3' }
        ];

        let dialogIndex = 0;
        const showDialog = () => {
            if (this.currentDialogBox) {
                this.currentDialogBox.destroy();
            }
            if (dialogIndex >= dialogs.length) {
                // Depois do último, muda para /tutorial
                this.time.delayedCall(400, () => {
                    this.scene.start('tutorial');
                });
                return;
            }
            // Cria caixa de diálogo animada com texto digitando
            this.currentDialogBox = this.createAnimatedDialogBox(dialogs[dialogIndex].text, width / 2, height * 0.7, () => {
                // Só chama o próximo após o texto aparecer completamente!
                this.time.delayedCall(900, showDialog);
            });
            dialogIndex++;
        };

        showDialog();
    }

    /**
     * Caixa de diálogo animada com efeito de "texto digitando"
     * @param {string} text O texto a ser digitado
     * @param {number} x
     * @param {number} y
     * @param {function} onComplete chamado quando o texto terminar de aparecer
     */
    createAnimatedDialogBox(text, x, y, onComplete) {
        // Caixa arredondada com animação de fade in
        const boxWidth = 220;
        const boxHeight = 60;
        const box = this.add.container(x, y);
        const bg = this.add.rectangle(0, 0, boxWidth, boxHeight, 0xffffff, 0.92)
            .setStrokeStyle(2, 0x333366, 1)
            .setOrigin(0.5);
        bg.setAlpha(0);
        const txt = this.add.text(0, 0, '', {
            fontFamily: 'Arial',
            fontSize: '32px',
            color: '#222',
            align: 'center',
            wordWrap: { width: boxWidth - 32 }
        }).setOrigin(0.5);
        txt.setAlpha(0);

        box.add([bg, txt]);
        box.setDepth(10);

        // Fade in
        this.tweens.add({
            targets: [bg, txt],
            alpha: 1,
            duration: 300,
            ease: 'Sine.easeIn',
            onComplete: () => {
                // Depois do fade in, começa o efeito de texto digitando
                this.typewriteText(txt, text, 26, onComplete);
            }
        });

        return box;
    }

    /**
     * Efeito de texto digitando
     * @param {Phaser.GameObjects.Text} textObj
     * @param {string} fullText
     * @param {number} delayMillis Por letra
     * @param {function} onComplete
     */
    typewriteText(textObj, fullText, delayMillis, onComplete) {
        textObj.setText('');
        let i = 0;
        const write = () => {
            if (i <= fullText.length) {
                textObj.setText(fullText.slice(0, i));
                i++;
                if (i <= fullText.length) {
                    this.time.delayedCall(delayMillis, write, [], this);
                } else if (onComplete) {
                    onComplete();
                }
            }
        };
        write();
    }

    // Função de colisão Fujimo x Móveis (usando bounding box, com margem customizada para cada móvel)
    checkFurnitureCollision(x, y) {
        const fujimoHalfW = this.fujimo.displayWidth / 2;
        const fujimoHalfH = this.fujimo.displayHeight / 2;
        const fujimoRect = {
            left: x - fujimoHalfW,
            right: x + fujimoHalfW,
            top: y - fujimoHalfH,
            bottom: y + fujimoHalfH
        };

        for (let i = 0; i < this.moveisSprites.length; i++) {
            const sprite = this.moveisSprites[i];
            const item = this.moveis[i];
            const margin = typeof item.margin === 'number' ? item.margin : 0;
            const halfW = sprite.displayWidth / 2;
            const halfH = sprite.displayHeight / 2;
            const objRect = {
                left: sprite.x - halfW - margin,
                right: sprite.x + halfW + margin,
                top: sprite.y - halfH - margin,
                bottom: sprite.y + halfH + margin
            };

            // Checagem simples de AABB
            if (
                fujimoRect.right > objRect.left &&
                fujimoRect.left < objRect.right &&
                fujimoRect.bottom > objRect.top &&
                fujimoRect.top < objRect.bottom
            ) {
                return true;
            }
        }
        return false;
    }

    isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    initMobileJoystick() {
        this.joystick = { up: false, down: false, left: false, right: false };
        if (!this.isMobile()) {
            this.joystickContainer && this.joystickContainer.setVisible(false);
            return;
        }
        this.joystickContainer = this.add.container();
        const Y = this.scale.height - 80;
        const X = 80;
        const size = 44;
        const alpha = 0.8;

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

        this.joystickContainer.add([btnLeft, btnRight, btnUp, btnDown]);
        this.joystickContainer.setDepth(100);

        this.scale.on('resize', (gameSize) => {
            const Y = gameSize.height - 80;
            btnLeft.setPosition(X - size, Y);
            btnRight.setPosition(X + size, Y);
            btnUp.setPosition(X, Y - size);
            btnDown.setPosition(X, Y + size);
        });
    }

    update(time, delta) {
        // Se Natasha está andando ou falando, Fujimo não pode andar
        if (this.fujimoLocked) {
            return;
        }

        var moveAmount = (this.speed * delta) / 1000;
        var width = this.scale.width;
        var height = this.scale.height;

        var prevX = this.fujimo.x;
        var prevY = this.fujimo.y;
        var newX = prevX;
        var newY = prevY;

        var isLeft = this.keys.left.isDown || (this.joystick && this.joystick.left);
        var isRight = this.keys.right.isDown || (this.joystick && this.joystick.right);
        var isUp = this.keys.up.isDown || (this.joystick && this.joystick.up);
        var isDown = this.keys.down.isDown || (this.joystick && this.joystick.down);

        var moving = isLeft || isRight || isUp || isDown;
        var direction = null;
        if (isDown) direction = 'down';
        else if (isUp) direction = 'up';
        else if (isLeft) direction = 'left';
        else if (isRight) direction = 'right';

        // Testa colisão EIXO X
        if (isLeft) {
            let candidateX = prevX - moveAmount;
            candidateX = Phaser.Math.Clamp(candidateX, this.fujimo.displayWidth / 2, width - this.fujimo.displayWidth / 2);
            if (!this.checkFurnitureCollision(candidateX, prevY)) {
                newX = candidateX;
            }
            this.fujimo.setFlipX(true);
        }
        else if (isRight) {
            let candidateX = prevX + moveAmount;
            candidateX = Phaser.Math.Clamp(candidateX, this.fujimo.displayWidth / 2, width - this.fujimo.displayWidth / 2);
            if (!this.checkFurnitureCollision(candidateX, prevY)) {
                newX = candidateX;
            }
            this.fujimo.setFlipX(false);
        }

        // Testa colisão EIXO Y
        if (isUp) {
            let candidateY = prevY - moveAmount;
            candidateY = Phaser.Math.Clamp(candidateY, this.fujimo.displayHeight / 2, height - this.fujimo.displayHeight / 2);
            if (!this.checkFurnitureCollision(newX, candidateY)) {
                newY = candidateY;
            }
        }
        else if (isDown) {
            let candidateY = prevY + moveAmount;
            candidateY = Phaser.Math.Clamp(candidateY, this.fujimo.displayHeight / 2, height - this.fujimo.displayHeight / 2);
            if (!this.checkFurnitureCollision(newX, candidateY)) {
                newY = candidateY;
            }
        }

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

        this.floor.setDisplaySize(width + 15, height + 15).setPosition(width / 2, height / 2);
        this.background.setDisplaySize(width, height).setPosition(width / 2, height / 2);

        // Redimensiona móveis SEM margem, mas respeitando índices e margin do this.moveis
        if (this.moveisSprites) {
            // Atualiza as posições de this.moveis também para manter consistência
            const moveisPos = [
                { x: width * 0.06,    y: height * 0.35 },
                { x: width * 0.14,    y: height * 0.2 },
                { x: width * 0.352,   y: height * 0.86 },
                { x: width * 0.5,     y: height * 0.1 },
                { x: width * 0.65,    y: height * 0.85 },
                { x: width * 0.7,     y: height * 0.1 },
                { x: width * 0.8,     y: height * 0.85 },
                { x: width * 0.6,     y: height * 0.1 },
                { x: width * 0.25,    y: height * 0.02 },
                { x: width * 0.38,    y: height * 0.1 },
                { x: width * 0.145,   y: height * 0.86 },
            ];
            this.moveisSprites.forEach((sprite, i) => {
                const pos = moveisPos[i];
                sprite.setPosition(pos.x, pos.y);
                if (this.moveis[i]) {
                    this.moveis[i].x = pos.x;
                    this.moveis[i].y = pos.y;
                }
            });
        }

        // Fujimo sempre um pouco à esquerda do centro ao redimensionar
        const fujimoStartX = width * 0.3;
        const fujimoStartY = height / 2;
        this.fujimo.setPosition(fujimoStartX, fujimoStartY);

        if (this.joystickContainer && this.isMobile()) {
            const X = 80;
            const Y = height - 80;
            const size = 44;
            this.joystickContainer.iterate((btn, i) => {
                if (i === 0) btn.setPosition(X - size, Y);
                if (i === 1) btn.setPosition(X + size, Y);
                if (i === 2) btn.setPosition(X, Y - size);
                if (i === 3) btn.setPosition(X, Y + size);
            });
        }

        // Natasha também deve ser centralizada se já estiver na tela
        if (this.natasha) {
            this.natasha.setY(height / 2);
        }
        if (this.currentDialogBox) {
            this.currentDialogBox.setPosition(width / 2, height * 0.7);
        }
    }
}