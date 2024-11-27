import './style.css';
import { Neko, NekoSizeVariations } from "neko-ts";

const imageCache = new Map();
const images = [
  "/IMG_2195.JPG",
  "/IMG_5769.JPG",
  "/IMG_5783.JPG",
  "/IMG_5817.JPG",
  "/IMG_5872.JPG",
  "/IMG_5912.JPG",
  "/IMG_8909.JPG",
  "/IMG_8947.JPG",
  "/IMG_9582.JPG",
  "/IMG_9627.JPG",
  "/SAM_1349.JPG",
  "/SAM_1370.JPG",
];

images.forEach(src => {
  const img = new Image();
  img.src = src;
  imageCache.set(src, img);
});

class BouncingDVD {
  constructor(element, container) {
    if (!element || !container) return;
    
    this.element = element;
    this.container = container;
    this.x = Math.random() * (container.clientWidth - element.clientWidth);
    this.y = Math.random() * (container.clientHeight - element.clientHeight);
    this.speedX = 3;
    this.speedY = 3;
    this.currentImageIndex = 0;
    
    this.element.style.opacity = '0';
    
    const initialImage = imageCache.get(images[0]);
    if (initialImage.complete) {
      this.element.src = images[0];
      this.element.style.opacity = '1';
    } else {
      initialImage.onload = () => {
        this.element.src = images[0];
        this.element.style.opacity = '1';
      };
    }
    
    this.animate = this.animate.bind(this);
    this.handleResize = this.handleResize.bind(this);
    
    window.addEventListener('resize', this.handleResize);
  }

  handleResize() {
    const maxX = this.container.clientWidth - this.element.clientWidth;
    const maxY = this.container.clientHeight - this.element.clientHeight;
    this.x = Math.min(Math.max(this.x, 0), maxX);
    this.y = Math.min(Math.max(this.y, 0), maxY);
  }

  changeImage() {
    this.currentImageIndex = (this.currentImageIndex + 1) % images.length;
    this.element.src = images[this.currentImageIndex];
  }

  animate() {
    this.x += this.speedX;
    this.y += this.speedY;

    const maxX = this.container.clientWidth - this.element.clientWidth;
    const maxY = this.container.clientHeight - this.element.clientHeight;

    if (this.x <= 0 || this.x >= maxX) {
      this.speedX *= -1;
      this.x = Math.max(0, Math.min(this.x, maxX));
      this.changeImage();
    }

    if (this.y <= 0 || this.y >= maxY) {
      this.speedY *= -1;
      this.y = Math.max(0, Math.min(this.y, maxY));
      this.changeImage();
    }

    this.element.style.transform = `translate3d(${this.x}px, ${this.y}px, 0)`;
    requestAnimationFrame(this.animate);
  }
}

let neko;

window.addEventListener('load', () => {
  const dvdLogo = document.getElementById('dvd-logo');
  const container = document.querySelector('.container');
  
  if (dvdLogo && container) {
    const bouncingDVD = new BouncingDVD(dvdLogo, container);
    bouncingDVD.animate();
  }
  
  neko = new Neko({
    nekoSize: NekoSizeVariations.LARGE,
    speed: 10,
    origin: {
      x: 500,
      y: 500,
    },
  });
});