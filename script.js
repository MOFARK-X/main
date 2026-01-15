class SnowAnimation {
    constructor() {
        this.canvas = document.getElementById('snow-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 100;
        this.maxParticles = 150;
        this.lastTime = 0;
        this.fps = 60;
        this.fpsInterval = 1000 / this.fps;
        
        this.init();
        this.animate = this.animate.bind(this);
    }

    init() {
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        
        // Создаем частицы снега
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push(this.createParticle());
        }
        
        requestAnimationFrame(this.animate);
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        // Адаптивное количество частиц
        const screenSize = this.canvas.width * this.canvas.height;
        this.maxParticles = Math.min(200, Math.floor(screenSize / 8000));
        
        if (this.particles.length < this.maxParticles && this.particles.length < this.maxParticles) {
            for (let i = this.particles.length; i < this.maxParticles; i++) {
                this.particles.push(this.createParticle());
            }
        }
    }

    createParticle() {
        return {
            x: Math.random() * this.canvas.width,
            y: Math.random() * this.canvas.height - this.canvas.height,
            size: Math.random() * 3 + 1,
            speed: Math.random() * 1 + 0.5,
            opacity: Math.random() * 0.5 + 0.3,
            sway: Math.random() * 0.5 - 0.25
        };
    }

    animate(currentTime) {
        requestAnimationFrame(this.animate);
        
        if (!this.lastTime) this.lastTime = currentTime;
        const elapsed = currentTime - this.lastTime;
        
        if (elapsed > this.fpsInterval) {
            this.lastTime = currentTime - (elapsed % this.fpsInterval);
            
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            
            // Обновляем и рисуем частицы
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            
            for (let i = 0; i < this.particles.length; i++) {
                const p = this.particles[i];
                
                // Обновляем позицию
                p.y += p.speed;
                p.x += p.sway;
                
                // Если частица ушла за экран, создаем новую
                if (p.y > this.canvas.height || p.x > this.canvas.width || p.x < 0) {
                    this.particles[i] = this.createParticle();
                    this.particles[i].y = 0;
                }
                
                // Рисуем частицу
                this.ctx.beginPath();
                this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                this.ctx.fill();
            }
        }
    }
}

// Запускаем анимацию при загрузке страницы
window.addEventListener('load', () => {
    new SnowAnimation();
});
