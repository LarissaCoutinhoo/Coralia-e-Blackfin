const { createApp } = Vue;

createApp({
    data() {
        return {
            heroi: { vida: 100 },
            vilao: { vida: 100 },
            gameOver: false,
            winner: '',
            logsHeroi: [],
            logsVilao: [],
            potions: 3
        };
    },
    methods: {
        atacar(isHeroi) {
            if (!this.gameOver) {
                if (isHeroi) {
                    this.vilao.vida -= 10;
                    this.logAction("Herói atacou");
                    this.logAction("Vilão sofreu 10% de dano");
                    this.heroi.vida -= 5;
                    this.logAction("Herói sofreu 5% de dano");
                    this.checkHealth();
                }
            }
        },
        vilaoAtacar() {
            if (!this.gameOver) {
                this.heroi.vida -= 10;
                this.logAction("Vilão atacou");
                this.logAction("Herói sofreu 10% de dano");
                this.vilao.vida -= 5;
                this.logAction("Vilão sofreu 5% de dano");
                this.checkHealth();
            }
        },

        vilaoDefender() {
            if (!this.gameOver) {
                this.heroi.vida -= 5;
                this.vilao.vida -= 2;
                this.logAction("Vilão defendeu");
                this.logAction("Herói sofreu 5% de dano após a defesa do Vilão");
                this.logAction("Vilão sofreu 2% de dano ao defender");
                this.checkHealth();
            }
        },

        defender() {
            if (!this.gameOver) {
                this.vilao.vida -= 5;
                this.heroi.vida -= 2;
                this.logAction("Herói defendeu");
                this.logAction("Vilão sofreu 5% de dano após a defesa do Herói");
                this.logAction("Herói sofreu 2% de dano ao defender");
                this.checkHealth();
            }
        },
        usarPocao() {
            if (!this.gameOver) {
                if (this.potions > 0) {
                    this.heroi.vida += 20;
                    if (this.heroi.vida > 100) {
                        this.heroi.vida = 100;
                    }
                    this.potions--;
                    this.logAction("Herói usou poção e recuperou 20% de vida");
                    this.logAction("Poção de cura restantes: " + this.potions);
                    this.vilaoAction();
                } else {
                    this.logAction("Você não tem mais poções de cura!");
                }
            }
        },
        correr() {
            if (!this.gameOver) {
                if (this.heroi.vida <= 50) {
                    this.heroi.vida -= 10;
                    this.logAction("Herói correu e perdeu 10% de vida");
                    this.checkHealth();
                }
                this.vilaoAction();
            }
        },
        vilaoAction() {
            if (!this.gameOver) {
                const actions = ['vilaoAtacar', 'vilaoAtacar', 'vilaoDefender'];
                const randomAction = actions[Math.floor(Math.random() * actions.length)];
                this[randomAction]();
            }
        },
        checkHealth() {
            if (this.heroi.vida <= 0) {
                this.gameOver = true;
                this.winner = 'Vilão';
                this.heroi.vida = 0;
                this.logAction("Game Over! Vilão venceu!");
            }
            if (this.vilao.vida <= 0) {
                this.gameOver = true;
                this.winner = 'Herói';
                this.vilao.vida = 0;
                this.logAction("Game Over! Herói venceu!");
            }
        },
        logAction(action) {
            if (action.includes("Game Over")) {
                this.logsHeroi.push(action);
                this.logsVilao.push(action);
            } else {
                if (this.logsHeroi.length >= 5) {
                    this.logsHeroi.shift(); 
                }
                if (this.logsVilao.length >= 5) {
                    this.logsVilao.shift(); 
                }
                this.logsHeroi.push(action);
                this.logsVilao.push(action);
            }
        }
    }
}).mount("#app");
