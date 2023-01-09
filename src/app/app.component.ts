import { Component, ViewContainerRef, ViewChild, ComponentFactoryResolver, ComponentRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'lazycomponent';
  tag: string[] = ['Album'];
  @ViewChild('example', { read: ViewContainerRef })
  viewContainer: ViewContainerRef | any;
  constructor(
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
  };
  ngOnInit(): void {
  }
  async getExample(value: string) {

    this.viewContainer.clear();
    switch (value) {
      case this.tag[0]: {
        await this.getAlbum();
        break;
      }
      default: {
        //statements; 
        break;
      }
    }
  }
  async getAlbum() {
    const { AlbumComponent } = await import("src/app/album/album.component");
    this.viewContainer.createComponent(AlbumComponent);
    const componentRef:ComponentRef<any> = this.viewContainer.createComponent(AlbumComponent);
    componentRef.location.nativeElement.classList.add('fade');
  }
}
