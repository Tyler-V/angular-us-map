import { Component, OnInit, Input, Output, Renderer2 } from '@angular/core';
import { MapsSVG } from './maps';

declare var Raphael;

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  @Input() width: number = 950;
  @Input() height: number = 600;

  private paper: any;
  private states: Map<any, any> = new Map<any, any>();

  private options = {
    "fill": "#d3d3d3",
    "stroke": "#fff",
    "stroke-opacity": "1",
    "stroke-linejoin": "round",
    "stroke-miterlimit": "4",
    "stroke-width": "0.75",
    "stroke-dasharray": "none"
  }

  constructor(private renderer2: Renderer2) { }

  ngOnInit() {
    this.paper = Raphael("container", this.width, this.height), {
      attr: this.options
    }
    for (let state in MapsSVG.USA) {
      let path = this.paper.path(MapsSVG.USA[state]).attr(this.options);
      this.states.set(state, path);
    }
    this.states.forEach((state, key) => {
      state.color = Raphael.getColor();
      state[0].style.cursor = "pointer";
      this.renderer2.listen(state[0], "mouseover", () => {
        state.animate({
          fill: state.color
        }, 500);
        state.toFront();
        this.paper.safari();
      });
      this.renderer2.listen(state[0], "mouseout", () => {
        state.animate({
          fill: "#d3d3d3"
        }, 500);
        state.toFront();
        this.paper.safari();
      });
    });
  }
}