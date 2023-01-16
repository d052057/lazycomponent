import { Component, ViewContainerRef, ViewChild, ComponentRef, ElementRef } from '@angular/core';
import { OnDestroy } from '@angular/core'
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  value: string = '';
  title = 'lazycomponent';
  tag: string[] = ['Album', 'Carousel'];
  @ViewChild('example', { read: ViewContainerRef })
  viewContainer: ViewContainerRef | any;
  componentRef!: ComponentRef<any>;

  ngOnDestroy(): void {
    this.componentRef.location.nativeElement.removeEventListener('animationstart');
    this.componentRef.location.nativeElement.removeEventListener('animationend');
    this.componentRef.location.nativeElement.removeEventListener('animationiteration');
  }

  listenToAnimationStart(): void {
    this.componentRef.location.nativeElement.addEventListener('animationstart', () => {
      console.log('animation started');
    })
  }
  loadEventListener(): void {
    this.listenToAnimationStart();
    this.listenToAnimationEnd();
    this.listenToAnimationIteration();
  }
  listenToAnimationEnd(): void {

    this.componentRef.location.nativeElement.addEventListener('animationend', () => {
      console.log('animation ended');
      var cl = this.componentRef.location.nativeElement.classList;
      if (cl == 'fadeMeOut') {
        this.loadExample();
      }
    })
  }

  listenToAnimationIteration(): void {
    this.componentRef.location.nativeElement.addEventListener('animationiteration', () => {
      console.log('animation iteration');
    })
  }
  constructor(
    private viewContainerRef: ViewContainerRef
  ) {
  };

  async getExample(value: string) {
    this.value = value;
    if (this.componentRef) {
      this.componentRef.location.nativeElement.classList.replace('fadeMeIn', 'fadeMeOut');
    } else {
      this.loadExample();
    }
    //this.doSomething(value)
    //  .then((res: any) => {
    //    this.componentRef.location.nativeElement.classList.replace('fadeMeIn', 'fadeMeOut');
    //  })
    //  .then((newResult: any) => this.loadExample())
    //  .catch((error: Error) => console.error(error));
  }
  //doSomething(value: string): any {
  //  this.value = value;
  //  return 'done';
  //}
  async loadExample() {
    this.viewContainer.clear();
    switch (this.value) {
      case this.tag[0]: {
        await this.getAlbum();
        break;
      }
      case this.tag[1]: {
        await this.getCarousel();
        break;
      }
      default: {
        //statements; 
        break;
      }
    }
    this.componentRef.location.nativeElement.classList.add('fadeMeIn');
    this.loadEventListener();
    this.componentRef.location.nativeElement.detectChanges();
  }
  async getAlbum() {
    const { AlbumComponent } = await import("src/app/album/album.component");
    this.componentRef = this.viewContainer.createComponent(AlbumComponent);    
  }
  async getCarousel() {
    const { CarouselComponent } = await import("src/app/carousel/carousel.component");
    this.componentRef = this.viewContainer.createComponent(CarouselComponent);
  }
}
