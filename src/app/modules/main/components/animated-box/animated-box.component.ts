import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-animated-box',
  standalone: true,
  imports: [],
  templateUrl: './animated-box.component.html',
  styleUrl: './animated-box.component.scss',
})
export class AnimatedBoxComponent implements OnInit, OnDestroy {
  ngOnInit(): void {
    window.addEventListener('mousemove', this.onWindowScroll);
  }

  ngOnDestroy(): void {
    window.removeEventListener('mousemove', this.onWindowScroll);
  }

  onWindowScroll = (event: MouseEvent): void => {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const z = event.clientX - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const centerZ = rect.height / 2;

    const deltaX = x - centerX;
    const deltaY = y - centerY;
    const deltaZ = z - centerZ;

    const rotateX = (deltaY / centerY) * 10; // Угол поворота по оси X
    const rotateY = (deltaX / centerX) * -10; // Угол поворота по оси Y
    const rotateZ = (deltaZ / centerX) * -10; // Угол поворота по оси Y
    const image = document.querySelector('.animated-image') as HTMLElement;
    // image.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) `;
  };
}
