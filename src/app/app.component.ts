import { Component, AfterViewInit, OnInit } from '@angular/core';
import Geolocation from 'ol/Geolocation';
import Projection from 'ol/proj/Projection';
import Proj from 'ol/proj.js';
import 'ol/ol.css';
import Map from 'ol/Map';
import OlXYZ from 'ol/source/XYZ';
import OlTileLayer from 'ol/layer/Tile';
import OlView from 'ol/View';
declare var ol: any;
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
  public geo: Geolocation;
  public projection: Projection;
  public proj: Proj;
  public display_toast : boolean = false;
  public autohide = true;
  latitude: number = 45.188529;
  longitude: number = 5.724524;

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
      
      this.geo = new Geolocation({
        trackingOptions: {
          enableHighAccuracy: true
        },
        projection: this.view.getProjection()
      })
  }

  ngAfterViewInit() {
    this.map.setTarget('map');
    this.geo.setTracking(true);
    this.setCenter();
    console.log(this.proj);
  }

  getPosition() {
    console.log(this.geo.getPosition());
  }

  setCenter() {
    console.log(this.proj);
    var view = this.map.getView();
    view.setCenter(this.proj.fromLonLat([this.longitude, this.latitude]));
    view.setZoom(8);
  }
}
