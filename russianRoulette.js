document.addEventListener('DOMContentLoaded', () => {
    const chamberCount = 6;
    let chambers = new Array(chamberCount).fill(false);
    let bulletPosition = -1;
    let currentChamber = 0;
    let isSpinning = false;

    const cylinder = document.getElementById('revolver-cylinder');
    const messageDisplay = document.getElementById('message-display');
    const loadButton = document.getElementById('load-button');
    const spinButton = document.getElementById('spin-button');
    const triggerButton = document.getElementById('trigger-button');
    const resetButton = document.getElementById('reset-button');

    function setupCylinder() {
        cylinder.innerHTML = '';
        const radius = 75; // 弹膛分布的半径
        for (let i = 0; i < chamberCount; i++) {
            const chamber = document.createElement('div');
            chamber.className = 'chamber';
            chamber.textContent = i + 1;
            const angle = (i / chamberCount) * 2 * Math.PI;
            // 计算每个弹膛的位置
            const x = Math.cos(angle) * (radius - 25);
            const y = Math.sin(angle) * (radius - 25);
            chamber.style.transform = `translate(${x}px, ${y}px)`;
            cylinder.appendChild(chamber);
        }
    }

    function updateMessage(msg) {
        messageDisplay.textContent = msg;
    }

    function loadBullet() {
        bulletPosition = Math.floor(Math.random() * chamberCount);
        chambers[bulletPosition] = true;
        updateMessage("子弹已装膛。现在旋转弹巢。");
        loadButton.disabled = true;
        spinButton.disabled = false;
    }

    function spin() {
        if (isSpinning) return;
        isSpinning = true;
        
        // 随机旋转一个角度，增加视觉效果
        const spinDegrees = 360 * 5 + Math.floor(Math.random() * 360);
        cylinder.style.transition = 'transform 4s cubic-bezier(0.25, 1, 0.5, 1)';
        cylinder.style.transform = `rotate(${spinDegrees}deg)`;

        updateMessage("弹巢旋转...");
        
        // 等待旋转动画结束
        setTimeout(() => {
            currentChamber = Math.floor(Math.random() * chamberCount);
            updateMessage("弹巢停下了。请扣动扳机。");
            spinButton.disabled = true;
            triggerButton.disabled = false;
            isSpinning = false;
        }, 4000);
    }

    function pullTrigger() {
        if (isSpinning) return;

        updateMessage(`对准第 ${currentChamber + 1} 个弹膛...`);

        // 将当前弹膛转到正上方，模拟瞄准
        const targetRotation = - (360 / chamberCount) * currentChamber;
        cylinder.style.transition = 'transform 0.5s ease-out';
        cylinder.style.transform = `rotate(${targetRotation}deg)`;

        setTimeout(() => {
            if (chambers[currentChamber]) {
                updateMessage("砰！你中弹了。游戏结束。");
                document.body.style.backgroundColor = '#8b0000'; // 改变背景颜色以示结束
                endGame();
            } else {
                updateMessage(`咔。你安全了...暂时。`);
                currentChamber = (currentChamber + 1) % chamberCount;
            }
        }, 1000);
    }

    function endGame() {
        loadButton.disabled = true;
        spinButton.disabled = true;
        triggerButton.disabled = true;
        resetButton.style.display = 'inline-block';
    }

    function resetGame() {
        chambers.fill(false);
        bulletPosition = -1;
        currentChamber = 0;
        isSpinning = false;

        updateMessage("欢迎来到俄罗斯转盘！");
        document.body.style.backgroundColor = '#282c34';
        
        loadButton.disabled = false;
        spinButton.disabled = true;
        triggerButton.disabled = true;
        resetButton.style.display = 'none';

        cylinder.style.transition = 'none';
        cylinder.style.transform = 'rotate(0deg)';
        
        setupCylinder();
    }

    // 绑定按钮事件
    loadButton.addEventListener('click', loadBullet);
    spinButton.addEventListener('click', spin);
    triggerButton.addEventListener('click', pullTrigger);
    resetButton.addEventListener('click', resetGame);

    // 初始化游戏
    setupCylinder();
});