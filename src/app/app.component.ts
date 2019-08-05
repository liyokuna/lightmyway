import { Component, AfterViewInit, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Warning } from './warning';
import Geolocation from 'ol/Geolocation';
import Projection from 'ol/proj/Projection';
import Proj from 'ol/proj.js';
import 'ol/ol.css';
import Map from 'ol/Map';
import OlXYZ from 'ol/source/XYZ';
import OlTileLayer from 'ol/layer/Tile';
import OlView from 'ol/View';
import OSM from 'ol/source/OSM';

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
  public osm: OSM;
  public display_toast : boolean = false;
  public autohide = true;
  public form;
  public destination;
  latitude: number = 45.188529;
  longitude: number = 5.724524;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      peopleSwitch: '',
      lightSwitch: '',
      securePlaceSwitch: '',
      messageText: '',
      long: '',
      lat: ''
    });
  }

  ngOnInit() {
    this.source = new OlXYZ({
      url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      });
      
      this.layer = new OlTileLayer({
        source: this.source
      });
      
      this.view = new OlView({
        projection: 'EPSG:4326',
        center: [6.661594, 50.433237],
        zoom: 15
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
    this.setCenter(this.longitude, this.latitude);
  }

  getPosition() {
    console.log(this.geo.getPosition());
    this.setCenter(this.geo.getPosition()[0], this.geo.getPosition()[1]);
  }

  setCenter(long, lat) {
    var view = this.map.getView();
    view.setCenter([long, lat]);
    view.setZoom(25);
  }

  onSubmit(Datas) {
    // Process checkout data here
    console.warn('Your order has been submitted', Datas);
    
    this.form.reset();
  }
}
