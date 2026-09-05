class RussianRoulette {
    constructor() {
        this.bulletPosition = 0;
        this.chamberCount = 6;
        this.isSpun = false;
    }

    spin() {
        this.bulletPosition = Math.floor(Math.random() * this.chamberCount);
        this.isSpun = true;
        return "转轮已旋转，子弹位置随机";
    }

    pullTrigger() {
        if (!this.isSpun) {
            return "请先旋转转轮！";
        }
        let current = Math.floor(Math.random() * this.chamberCount);
        if (current === this.bulletPosition) {
            return "💥 Bang！中弹！";
        } else {
            return "click……平安无事";
        }
    }
}

const game = new RussianRoulette();

document.getElementById("btnSpin").addEventListener("click", () => {
    const res = game.spin();
    document.getElementById("log").innerText = res;
});

document.getElementById("btnFire").addEventListener("click", () => {
    const res = game.pullTrigger();
    document.getElementById("log").innerText = res;
});
