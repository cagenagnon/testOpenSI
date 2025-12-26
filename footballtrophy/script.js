class FootballTrophy {
    constructor() {
        this.scene = document.getElementById("scene");
        this.playerImg = document.getElementById("player");
        this.scoreEl = document.getElementById("score");
        this.finalScoreEl = document.getElementById("final-score");
        this.gameOverEl = document.getElementById("game-over");
        
        this.score = 0;
        this.running = false;
        this.balls = [];
        this.ballInterval = null;
        this.soundEnabled = true;
        
        this.bgMusic = new Audio("audio/Champions League Anthem (Full Version).mp3");
        this.bgMusic.loop = true;
        this.bgMusic.volume = 0.5;
        
        this.player = {
            x: this.scene.clientWidth / 2 - 25,
            y: this.scene.clientHeight - 50,
            width: 50,
            height: 50,
            speed: 15,
            element: this.playerImg
        };
        
        this.init();
        this.setupEventListeners();
    }
    
    init() {
        this.playerImg.style.position = "absolute";
        this.playerImg.style.left = `${this.player.x}px`;
        this.playerImg.style.bottom = "20px";
        this.playerImg.style.width = `${this.player.width}px`;
        this.playerImg.style.height = `${this.player.height}px`;
    }
    
    setupEventListeners() {
        document.addEventListener("keydown", (e) => this.handleKeyPress(e));
        
        document.getElementById("btn-start").onclick = () => this.startGame();
        document.getElementById("btn-pause").onclick = () => this.pauseGame();
        document.getElementById("btn-play").onclick = () => this.resumeGame();
        document.getElementById("btn-sound").onclick = () => this.toggleSound();
        document.getElementById("btn-best").onclick = () => this.showBestScore();
        document.getElementById("btn-help").onclick = () => this.showHelp();
    }
    
    handleKeyPress(e) {
        if (!this.running) return;
        
        if (e.key === "ArrowLeft") this.player.x -= this.player.speed;
        if (e.key === "ArrowRight") this.player.x += this.player.speed;
        
        this.player.x = Math.max(0, Math.min(this.scene.clientWidth - this.player.width, this.player.x));
        this.player.element.style.left = `${this.player.x}px`;
    }
    
    createBall() {
        const ballElement = document.createElement("img");
        ballElement.src = "images/ball.svg";
        ballElement.className = "ball";
        ballElement.style.position = "absolute";
        ballElement.style.width = "35px";
        ballElement.style.height = "35px";
        
        const ball = {
            x: Math.random() * (this.scene.clientWidth - 35),
            y: -35,
            radius: 17,
            speed: 3,
            element: ballElement
        };
        
        ballElement.style.left = `${ball.x}px`;
        ballElement.style.top = `${ball.y}px`;
        
        this.scene.appendChild(ballElement);
        this.balls.push(ball);
    }
    
    checkCollision(ball) {
        const ballCenterX = ball.x + ball.radius;
        const ballCenterY = ball.y + ball.radius;
        const playerCenterX = this.player.x + this.player.width / 2;
        
        const isWithinWidth = Math.abs(ballCenterX - playerCenterX) < (this.player.width / 2 + ball.radius);
        const isWithinHeight = ballCenterY > this.player.y && ballCenterY < this.player.y + 30;
        
        return isWithinWidth && isWithinHeight;
    }
    
    update() {
        if (!this.running) return;
        
        this.balls.forEach((ball, index) => {
            ball.y += ball.speed;
            ball.element.style.top = `${ball.y}px`;
            
            if (this.checkCollision(ball)) {
                this.catchBall(index);
            }
            
            if (ball.y > this.scene.clientHeight) {
                this.gameOver();
                return;
            }
        });
        
        requestAnimationFrame(() => this.update());
    }
    
    catchBall(index) {
        this.balls[index].element.remove();
        this.balls.splice(index, 1);
        this.score++;
        this.scoreEl.textContent = this.score;
    }
    
    startGame() {
        if (this.running) return;
        
        this.cleanupBalls();
        this.resetGameState();
        
        this.bgMusic.play();
        this.ballInterval = setInterval(() => this.createBall(), 1000);
        this.update();
    }
    
    pauseGame() {
        this.running = false;
        this.bgMusic.pause();
    }
    
    resumeGame() {
        if (!this.running && this.balls.length > 0) {
            this.running = true;
            this.bgMusic.play();
            this.update();
        }
    }
    
    gameOver() {
        this.running = false;
        clearInterval(this.ballInterval);
        
        this.bgMusic.pause();
        this.bgMusic.currentTime = 0;
        
        this.finalScoreEl.textContent = this.score;
        this.gameOverEl.classList.add("active");
        
        this.saveBestScore();
    }
    
    toggleSound() {
        this.soundEnabled = !this.soundEnabled;
        this.bgMusic.muted = !this.soundEnabled;
        document.getElementById("btn-sound").textContent = this.soundEnabled ? "Son : ON" : "Son : OFF";
    }
    
    cleanupBalls() {
        this.balls.forEach(ball => ball.element.remove());
        this.balls = [];
    }
    
    resetGameState() {
        this.running = true;
        this.score = 0;
        this.scoreEl.textContent = this.score;
        this.gameOverEl.classList.remove("active");
        
        this.player.x = this.scene.clientWidth / 2 - 25;
        this.player.element.style.left = `${this.player.x}px`;
    }
    
    saveBestScore() {
        const bestScore = localStorage.getItem('bestScore') || 0;
        if (this.score > bestScore) {
            localStorage.setItem('bestScore', this.score);
        }
    }
    
    showBestScore() {
        const bestScore = localStorage.getItem('bestScore') || 0;
        alert(`Meilleur score: ${bestScore}`);
    }
    
    showHelp() {
        alert("Utilisez les flèches gauche/droite pour déplacer le gardien. Attrapez les balles pour marquer des points!");
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const game = new FootballTrophy();
});