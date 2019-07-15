import { Component, AfterViewInit, OnInit } from '@angular/core';
import 'ol/ol.css';
import Map from 'ol/Map';
import OlXYZ from 'ol/source/XYZ';
import OlTileLayer from 'ol/layer/Tile';
import OlView from 'ol/View';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnInit {
  title = 'Light Way';
  public map: Map;
  public source: OlXYZ;
  public layer: OlTileLayer;
  public view: OlView;

  ngOnInit() {
    this.source = new OlXYZ({
      url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      });
      
      this.layer = new OlTileLayer({
        source: this.source
      });
      
      this.view = new OlView({
        center: [6.661594, 50.433237],
        zoom: 3
      });
      
      this.map = new Map({
        target: 'map',
        layers: [this.layer],
        view: this.view
      });
  }

  ngAfterViewInit() {
    this.map.setTarget('map');
  }

}
