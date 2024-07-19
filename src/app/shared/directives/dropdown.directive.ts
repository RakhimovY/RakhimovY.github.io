import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appDropdown]',
  standalone: true,
})
export class DropdownDirective implements AfterViewInit, OnDestroy {
  @Input() open!: boolean;
  mainElement = this._elem.nativeElement as HTMLElement;

  constructor(
    private _renderer: Renderer2,
    private _elem: ElementRef,
  ) {}

  ngOnDestroy(): void {
    this.mainElement.children.item(0)?.removeEventListener('click', () => {
      this.mainElement.children.item(1)?.classList.toggle('hidden');
    });
  }

  ngAfterViewInit(): void {
    const dropdown = this.mainElement.querySelector('.dropdown') as HTMLElement;

    dropdown.style.maxHeight = dropdown.offsetHeight + 30 + 'px';

    this.mainElement.children.item(0)?.addEventListener('click', () => {
      dropdown?.classList.toggle('hidden');
      this.mainElement
        .querySelector('.down_arrow')
        ?.classList.toggle('rotate180');
    });
  }

  toggleDropdown() {}
}
