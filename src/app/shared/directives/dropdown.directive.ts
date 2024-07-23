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
    setTimeout(() => {
      dropdown.style.maxHeight = dropdown.offsetHeight + 60 + 'px';
    }, 1000);

    this.mainElement.children.item(0)?.addEventListener('click', () => {
      // let dropdownStatus = (
      //   JSON.parse(
      //     localStorage.getItem('dropdownStatus') as string,
      //   ) as IDropdownStatuses[]
      // ).map((el) => {
      //   if (el.id === this.mainElement.id) {
      //     el.hidden = !el.hidden;
      //   }
      //   return el;
      // });
      // localStorage.setItem('dropdownStatus', JSON.stringify(dropdownStatus));

      dropdown?.classList.toggle('hidden');
      this.mainElement
        .querySelector('.down_arrow')
        ?.classList.toggle('rotate180');
      // setTimeout(() => {
      //   dropdown.style.maxHeight = dropdown.offsetHeight + 60 + 'px';
      // }, 500);
    });

    // if (!localStorage.getItem('dropdownStatus')) {
    //   localStorage.setItem(
    //     'dropdownStatus',
    //     JSON.stringify([
    //       { id: 'info', hidden: false },
    //       { id: 'appInfo', hidden: false },
    //       { id: 'bonuses', hidden: false },
    //     ]),
    //   );
    // } else {
    //   (
    //     JSON.parse(
    //       localStorage.getItem('dropdownStatus') as string,
    //     ) as IDropdownStatuses[]
    //   ).forEach((el) => {
    //     if (el.hidden) {
    //       document
    //         .getElementById(el.id)
    //         ?.children.item(1)
    //         ?.classList.add('hidden');
    //     }
    //   });
    // }
  }
}
