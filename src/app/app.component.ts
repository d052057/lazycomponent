import { Component, ViewContainerRef, ViewChild, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'lazycomponent';
  tag: string[] = ['Album','Carousel'];
  @ViewChild('example', { read: ViewContainerRef })
  viewContainer: ViewContainerRef | any;
  componentRef!: ComponentRef<any>;
  constructor(
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
  };
  ngOnInit(): void {
  }
  fadeout(): void {
    if (this.componentRef) {
      this.componentRef.location.nativeElement.classList.add('fadeMeOut');
    }
  }

  async getExample(value: string) {
    //const animation = (value: string, callback: any): any => {
    //  this.loadObject(value);
    //  callback();
      
    //};
    //animation(value, this.fadeout());
    
    // this must be done first
    if (this.componentRef) {
      this.componentRef.location.nativeElement.classList.add('fadeMeOut');
      await this.timeout(1000);
    }
    // this must be done second
    switch (value) {
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
  }
  timeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  async getAlbum() {
    const { AlbumComponent } = await import("src/app/album/album.component");
    this.viewContainer.clear();
    this.componentRef = this.viewContainer.createComponent(AlbumComponent);
    this.componentRef.location.nativeElement.classList.add('fadeMeIn');
  }
  async getCarousel() {
    const { CarouselComponent } = await import("src/app/carousel/carousel.component");
    this.viewContainer.clear();
    this.componentRef = this.viewContainer.createComponent(CarouselComponent);
    this.componentRef.location.nativeElement.classList.add('fadeMeIn');
  }
}
