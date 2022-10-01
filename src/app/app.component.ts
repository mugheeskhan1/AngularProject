import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // component to be displayed on start
  loadedFeature = 'recipe';

  // load the component according to the button clicked
  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
