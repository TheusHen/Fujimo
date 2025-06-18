export class Tutorial extends Phaser.Scene {
    constructor() {
        super({ key: 'Tutorial' });
    }

    preload() {
        this.load.image('heart', 'assets/heart.png');
        this.load.image('object', 'assets/object.png');
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
            "Bem-vindo ao tutorial! Clique para continuar.",
            "Você verá um coração batendo no centro, ajude Fujimo a se concentrar.",
            "Objetos vão cair do topo da tela.",
            "Alguns objetos se movem de maneiras diferentes. Preste atenção!",
            "Clique nos objetos para removê-los antes que cheguem ao chão.",
            "Se algum objeto passar, o BPM do coração aumenta!",
            "Se o BPM chegar a 200, você perde.",
            "Se clicar em 5 objetos rapidamente, ganha bônus.",
            "Sobreviva até o tempo acabar para vencer.",
            "Clique para começar!"
        ];
        this.tutorialTextObject = null;
        this.startTime = 0;
        this.scenePaused = true;

        // NOVO: contador de balões perdidos
        this.missedObjects = 0;
        this.missedText = null;
        this.missedSlowdownTriggered = false;

        // Combo
        this.comboStreak = 0;
        this.comboLastClick = 0;
        this.comboTimeWindow = 750; // ms
        this.comboText = null;

        this.cameras.main.setBackgroundColor('#111');

        this.heart = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'heart');
        this.heart.setScale(0.6);

        this.bpmText = this.add.text(
            this.cameras.main.centerX,
            this.cameras.main.centerY + 100,
            `BPM: ${this.heartBPM}`,
            { fontSize: '32px', fill: '#fff' }
        ).setOrigin(0.5);

        this.timerText = this.add.text(
            this.cameras.main.centerX,
            40,
            `Tempo restante: 1:00`,
            { fontSize: '32px', fill: '#fff' }
        ).setOrigin(0.5);

        // NOVO: Texto de balões perdidos
        this.missedText = this.add.text(
            this.cameras.main.width - 30,
            40,
            `Perdidos: 0`,
            { fontSize: '28px', fill: '#ffb3b3' }
        ).setOrigin(1, 0.5);

        // NOVO: Combo
        this.comboText = this.add.text(
            this.cameras.main.centerX,
            this.cameras.main.centerY - 200,
            "",
            { fontSize: '36px', fill: '#ff0', fontStyle: 'bold', stroke: '#000', strokeThickness: 3 }
        ).setOrigin(0.5);
        this.comboText.setAlpha(0);

        this.objects = this.physics.add.group();

        this.tutorialTextObject = this.add.text(
            this.cameras.main.centerX,
            100,
            this.tutorialTexts[this.tutorialStep],
            { fontSize: '28px', fill: '#fff', align: 'center', wordWrap: { width: 600 } }
        ).setOrigin(0.5);

        this.input.on('pointerdown', this.nextTutorialStep, this);
    }

    nextTutorialStep() {
        this.tutorialStep++;
        if (this.tutorialStep < this.tutorialTexts.length) {
            this.tutorialTextObject.setText(this.tutorialTexts[this.tutorialStep]);
        } else {
            this.tutorialTextObject.setVisible(false);
            this.input.off('pointerdown', this.nextTutorialStep, this);
            this.startGame();
        }
    }

    startGame() {
        this.scenePaused = false;
        this.startTime = this.time.now;
        this.objectTimer = this.time.now;
        this.heartBPM = 60;
        this.updateBPMText();
        this.heart.setScale(0.6);
        this.lastIncrease = this.startTime;
        this.spawnAmount = 1;
        this.objectDropInterval = 1200;
        this.objectSpeed = 120;
        this.objectScale = 0.4;
        this.updateTimerText(this.timeToWin);
        this.missedObjects = 0;
        this.missedText.setText(`Perdidos: 0`);
        this.missedSlowdownTriggered = false;
        this.comboStreak = 0;
        this.comboLastClick = 0;
        this.comboText.setAlpha(0);

        this.startHeartBeat();
    }

    startHeartBeat() {
        if (this.heartTween) this.heartTween.remove();
        const duration = (60 / this.heartBPM) * 1000 / 2;
        this.heartTween = this.tweens.add({
            targets: this.heart,
            scale: { from: 0.6, to: 0.7 },
            yoyo: true,
            duration: duration,
            repeat: -1
        });
    }

    updateBPMText() {
        this.bpmText.setText(`BPM: ${this.heartBPM}`);
    }

    updateTimerText(msLeft) {
        const seconds = Math.max(0, Math.ceil(msLeft / 1000));
        const min = Math.floor(seconds / 60);
        const sec = seconds % 60;
        this.timerText.setText(`Tempo restante: ${min}:${sec.toString().padStart(2, "0")}`);
    }

    update(time, delta) {
        if (this.scenePaused || this.gameOver || this.win) return;

        // Temporizador
        const msLeft = Math.max(0, this.timeToWin - (time - this.startTime));
        this.updateTimerText(msLeft);

        // Vitória
        if (time - this.startTime >= this.timeToWin) {
            this.scenePaused = true;
            this.win = true;
            this.showEndMessage("Você venceu!");
            return;
        }

        // Slowdown se muitos balões perdidos
        if (this.missedObjects > 2 && !this.missedSlowdownTriggered) {
            this.slowDownForMistakes();
        }

        // Dificuldade progressiva
        if (time - this.lastIncrease > this.moreObjectsEvery && this.spawnAmount < 3 && !this.missedSlowdownTriggered) {
            this.lastIncrease = time;
            this.spawnAmount = Math.min(3, this.spawnAmount + 1);
            this.objectDropInterval = Math.max(700, this.objectDropInterval - 100);
            this.objectSpeed = Math.min(220, this.objectSpeed + 25);
        }

        // Novos objetos
        if (time - this.objectTimer > this.objectDropInterval) {
            for (let i = 0; i < this.spawnAmount; i++) {
                this.spawnObject();
            }
            this.objectTimer = time;
        }

        // Atualizar objetos
        this.objects.children.iterate(obj => {
            if (!obj) return;

            // --- Comportamento: ZigZag ---
            if (obj.behavior === 'zigzag') {
                obj.zigzagTimer = (obj.zigzagTimer || 0) + delta;
                obj.x += Math.sin(obj.zigzagTimer * 0.008) * 2.8;
            }

            // --- Comportamento: Ilusão (desaparece/reaparece) ---
            if (obj.behavior === 'illusion') {
                obj.illusionTimer = (obj.illusionTimer || 0) + delta;
                if (Math.floor(obj.illusionTimer / 470) % 2 === 0) {
                    obj.setAlpha(0.15);
                    obj.input.enabled = false;
                } else {
                    obj.setAlpha(1);
                    obj.input.enabled = true;
                }
            }

            // --- Comportamento: Atenção (só clicável depois de mudar cor) ---
            if (obj.behavior === 'attention') {
                obj.attentionTimer = (obj.attentionTimer || 0) + delta;
                if (!obj.attentionReady && obj.attentionTimer > 750) {
                    obj.attentionReady = true;
                    obj.setTint(0x55ff55);
                    obj.input.enabled = true;
                } else if (!obj.attentionReady) {
                    obj.setTint(0xff5555);
                    obj.input.enabled = false;
                }
            }

            // Movimento vertical padrão
            obj.y += this.objectSpeed * (delta / 1000);

            // Se passar da tela, remove e conta erro
            if (obj.y > this.cameras.main.height + 50) {
                this.objects.remove(obj, true, true);
                this.increaseBPM();
                this.incrementMissed();
            }
        });
    }

    spawnObject() {
        const x = Phaser.Math.Between(40, this.cameras.main.width - 40);
        const obj = this.objects.create(x, -30, 'object');
        obj.setScale(this.objectScale);

        // Sorteia comportamento especial
        const behaviorType = Phaser.Math.Between(1, 6);
        if (behaviorType === 1) {
            obj.behavior = 'zigzag';
            obj.zigzagTimer = 0;
        } else if (behaviorType === 2) {
            obj.behavior = 'illusion';
            obj.illusionTimer = 0;
        } else if (behaviorType === 3) {
            obj.behavior = 'attention';
            obj.attentionReady = false;
            obj.attentionTimer = 0;
        } else {
            obj.behavior = 'normal';
        }

        // Inicialmente desativa interatividade de "attention"
        if (obj.behavior === 'attention') {
            obj.inputEnabled = false;
            obj.setTint(0xff5555);
        }

        obj.setInteractive();
        obj.on('pointerdown', () => {
            // Se for attention mas não está pronto, ignora clique
            if (obj.behavior === 'attention' && !obj.attentionReady) return;
            this.objects.remove(obj, true, true);
            this.handleCombo();
        });
    }

    handleCombo() {
        const now = this.time.now;
        if (now - this.comboLastClick <= this.comboTimeWindow) {
            this.comboStreak++;
        } else {
            this.comboStreak = 1;
        }
        this.comboLastClick = now;

        // Se atingiu combo de 5
        if (this.comboStreak >= 5) {
            this.comboStreak = 0;
            this.applyComboBonus();
        }
    }

    applyComboBonus() {
        // +1s no tempo restante (mas não passa do tempo máximo)
        this.timeToWin += 1000;
        // -10 BPM, mínimo 60
        this.heartBPM = Math.max(60, this.heartBPM - 10);
        this.updateBPMText();

        // Feedback visual
        this.comboText.setText("+1s  -10 BPM!");
        this.comboText.setAlpha(1);
        this.tweens.add({
            targets: this.comboText,
            alpha: 0,
            duration: 1100,
            ease: 'Cubic.easeOut'
        });
    }

    increaseBPM() {
        this.heartBPM += 20;
        if (this.heartBPM >= 200) {
            this.heartBPM = 200;
            this.scenePaused = true;
            this.gameOver = true;
            this.showEndMessage("Game Over");
        }
        this.updateBPMText();
        this.startHeartBeat();
    }

    incrementMissed() {
        this.missedObjects += 1;
        this.missedText.setText(`Perdidos: ${this.missedObjects}`);
    }

    slowDownForMistakes() {
        // Reduz muito a quantidade e velocidade dos objetos e mostra mensagem
        this.spawnAmount = 1;
        this.objectDropInterval = 1600;
        this.objectSpeed = 80;
        this.missedSlowdownTriggered = true;

        // Mensagem de feedback para o usuário
        const feedback = this.add.text(
            this.cameras.main.centerX,
            this.cameras.main.centerY - 180,
            "Calma! Vamos devagar para você pegar o jeito.",
            { fontSize: '28px', fill: '#fff', backgroundColor: '#000a', padding: { left: 10, right: 10, top: 6, bottom: 6 } }
        ).setOrigin(0.5);

        this.time.delayedCall(2300, () => feedback.destroy());
    }

    showEndMessage(msg) {
        if (this.heartTween) this.heartTween.remove();
        this.add.text(
            this.cameras.main.centerX,
            this.cameras.main.centerY - 100,
            msg,
            { fontSize: '56px', fill: '#f00', fontStyle: 'bold' }
        ).setOrigin(0.5);

        this.add.text(
            this.cameras.main.centerX,
            this.cameras.main.centerY + 160,
            "Clique para reiniciar",
            { fontSize: '28px', fill: '#fff' }
        ).setOrigin(0.5);

        this.input.once('pointerdown', () => this.scene.restart(), this);
    }
}