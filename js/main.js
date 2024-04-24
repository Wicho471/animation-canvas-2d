const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Se obtienen las dimensiones de la pantalla actual
const window_height = window.innerHeight;
const window_width = window.innerWidth;

// Se asigna el tamaño de la pantalla al canvas
canvas.height = window_height;
canvas.width = window_width;
canvas.style.background = '#FF8'; // Color de fondo

class Circle {
    constructor(x, y, radio, color, text, speed) {
        this.posX = x;
        this.posY = y;
        this.radio = radio;
        this.color = color;
        this.text = text;
        this.speed = speed;
        this.dx = (Math.random() < 0.5 ? -1 : 1) * this.speed; // Dirección inicial aleatoria
        this.dy = (Math.random() < 0.5 ? -1 : 1) * this.speed;
    }

    update(Context) {
        this.draw(Context);
        this.posX += this.dx;
        this.posY += this.dy;
        
        // Ajustar posición y dirección si excede los límites
        if (this.posX + this.radio > window_width) {
            this.posX = window_width - this.radio; // Ajusta la posición justo dentro del borde
            this.dx = -this.dx;
        }
        if (this.posX - this.radio < 0) {
            this.posX = this.radio; // Evita que el círculo se quede atorado en el borde
            this.dx = -this.dx;
        }
        if (this.posY + this.radio > window_height) {
            this.posY = window_height - this.radio;
            this.dy = -this.dy;
        }
        if (this.posY - this.radio < 0) {
            this.posY = this.radio;
            this.dy = -this.dy;
        }
    }

    draw(Context) {
        Context.beginPath();
        Context.font = "20px Arial"; // Tamaño de fuente más pequeño para evitar superposición
        Context.textAlign = "center";
        Context.textBaseline = "middle";
        Context.fillText(this.text, this.posX, this.posY);
        Context.strokeStyle = this.color;
        Context.lineWidth = 5;
        Context.arc(this.posX, this.posY, this.radio, 0, Math.PI * 2, false);
        Context.stroke();
        Context.closePath();
    }
}

function radioRandom() {
    return Math.floor(Math.random() * 50 + 10); // Radio más pequeño para manejar más círculos
}

function randomPosX() {
    return Math.random() * window_width;
}

function randomPosY() {
    return Math.random() * window_height;
}

function randomColor() {
    // Retorna un color aleatorio en formato hexadecimal
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

// Crear un arreglo de 10 círculos
let circles = [];
for (let i = 0; i < 10; i++) {
    circles.push(new Circle(randomPosX(), randomPosY(), radioRandom(), randomColor(), "Tec " + i, Math.random() * 4 + 1));
}

function updateCircle() {
    ctx.clearRect(0, 0, window_width, window_height);
    circles.forEach(circle => circle.update(ctx));
    requestAnimationFrame(updateCircle);
}

updateCircle(); // Llama a la función para iniciar la animación
