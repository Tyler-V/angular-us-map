import { Component, OnInit, OnDestroy, Input, Output, HostBinding, Renderer2 } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MapsSVG } from './maps';

declare var Raphael;

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnDestroy {

  @Input() width: number = 950;
  @Input() height: number = 600;

  @HostBinding('style.width.px') _width = this.width;
  @HostBinding('style.height') _height = 'initial';

  private paper: any;
  private states: Map<any, any> = new Map<any, any>();
  private listeners: Array<Function> = [];

  private options = {
    "fill": "#d3d3d3",
    "stroke": "#fff",
    "stroke-opacity": "1",
    "stroke-linejoin": "round",
    "stroke-miterlimit": "4",
    "stroke-width": "0.75",
    "stroke-dasharray": "none"
  }

  constructor(private renderer2: Renderer2, private toastr: ToastrService) {}

  ngOnInit() {
    this.paper = Raphael("map"), { attr: this.options };
    this.paper.setViewBox(0, 0, this.width, this.height, true);
    var svg = document.querySelector("svg");
    svg.removeAttribute("width");
    svg.removeAttribute("height");

    this.paper.text(this.width / 2, 15, "Select a state!").attr("font", "30px Caveat Brush").attr("fill", "black");

    for (let state in MapsSVG.USA) {
      let path = this.paper.path(MapsSVG.USA[state]).attr(this.options);
      this.states.set(state, path);
    }

    this.states.forEach((state, key) => {
      state.color = Raphael.getColor();
      state.name = key;
      state[0].style.cursor = "pointer";
      this.listeners.push(this.renderer2.listen(state[0], "mouseover", (e) => {
        this.onMouseOver(e, state)
      }));
      this.listeners.push(this.renderer2.listen(state[0], "mouseout", (e) => {
        this.onMouseOut(e, state)
      }));
      this.listeners.push(this.renderer2.listen(state[0], "click", (e) => {
        this.onClick(e, state);
      }));
    });

  }

  ngOnDestroy() {
    for (let listener of this.listeners)
      listener();
  }

  onMouseOver(e: any, state: any) {
    state.animate({
      fill: state.color
    }, 500);
    state.toFront();
  }

  onMouseOut(e: any, state: any) {
    state.animate({
      fill: "#d3d3d3"
    }, 500);
    state.toFront();
  }

  onClick(e: any, state: any) {    
    this.toastr.info("Hello from " + state.name + "!");
  }
}