import { Component, Input, ViewChild, ElementRef, Directive, AfterViewInit } from '@angular/core';
import { BattlemapShape } from '../../../models/battlemap/shape'

@Directive({selector: 'bt-battlemap-draw-layer'})

export class BtBattlemapDrawLayer { }

@Component({
  selector: 'bt-battlemap-shape-drawing',
  templateUrl: './shape-drawing.component.html',
  styleUrls: ['./shape-drawing.component.scss']
})

export class BattlemapShapeDrawingComponent implements AfterViewInit {
  @Input() public self: any
  @Input() public shape: any
  @ViewChild(BtBattlemapDrawLayer, { static: true }) public layer

  private element: ElementRef
  private canvas
  private canvas_buffer
  private ctx
  private buffer_ctx
  private drawing_was_on = false
  private mouse = { x: 0, y: 0 };
  private ppts = [];

  ngAfterViewInit() {
    this.element = this.layer.nativeElement
    this.createCanvases()
    this.buffer_ctx.lineJoin = 'round';
    this.buffer_ctx.lineCap = 'round';
    this.initialize();
  }

  // $scope.$watch(() => self.locals.drawing.active, () => {
  //   self.locals.drawing.active ? addListeners() : removeListeners();
  // });

  // $scope.$watch(() => self.locals.drawing.cleared, () => {
  //   if (self.locals.drawing.cleared > 0) {
  //     onClear();
  //   }
  // });

  // $scope.$watch(() => self.locals.drawing.color, setDrawingStyles);
  // $scope.$watch(() => self.locals.map.zoom, onZoom);
  // $scope.$watch(() => this.shape.size, onResize, true);

  private createCanvases() {
    this.canvas = document.createElement('canvas');
    this.canvas.id = 'canvas';
    this.canvas.width = this.shape.size.width * this.self.locals.map.zoom;
    this.canvas.height = this.shape.size.height * this.self.locals.map.zoom;
    this.element[0].appendChild(this.canvas);

    // Creating a tmp canvas
    this.canvas_buffer = document.createElement('canvas');
    this.canvas_buffer.className = 'canvas-buffer';
    this.canvas_buffer.width = this.canvas.width;
    this.canvas_buffer.height = this.canvas.height;
    this.element[0].appendChild(this.canvas_buffer);

    this.ctx = this.canvas.getContext('2d');
    this.buffer_ctx = this.canvas_buffer.getContext('2d');
    if (this.drawing_was_on) {
      this.self.locals.drawing.active = true
      this.addListeners()
    }
  }

  private removeCanvases() {
    this.drawing_was_on = this.self.locals.drawing.active
    this.self.locals.drawing.active = false
    this.removeListeners()
    this.element[0].removeChild(this.canvas);
    this.element[0].removeChild(this.canvas_buffer);
  }

  private addListeners() {
    this.canvas_buffer.addEventListener('mousemove', this.onMouseMove, false);
    this.canvas_buffer.addEventListener('mousedown', this.onMouseDown, false);
    this.canvas_buffer.addEventListener('mouseup', this.onMouseUp, false);
  };

  private removeListeners() {
    this.canvas_buffer.removeEventListener('mousemove', this.onMouseMove, false);
    this.canvas_buffer.removeEventListener('mousedown', this.onMouseDown, false);
    this.canvas_buffer.removeEventListener('mouseup', this.onMouseUp, false);
  };

  private onMouseMove(e) {
    this.mouse.x = typeof e.offsetX !== 'undefined' ? e.offsetX : e.layerX;
    this.mouse.y = typeof e.offsetY !== 'undefined' ? e.offsetY : e.layerY;
  };

  private onMouseDown(e) {
    e.stopPropagation();
    this.canvas_buffer.addEventListener('mousemove', this.onPaint, false);

    this.mouse.x = typeof e.offsetX !== 'undefined' ? e.offsetX : e.layerX;
    this.mouse.y = typeof e.offsetY !== 'undefined' ? e.offsetY : e.layerY;

    this.ppts.push({ x: this.mouse.x, y: this.mouse.y });

    this.onPaint();
  };

  private onMouseUp(e) {
    this.canvas_buffer.removeEventListener('mousemove', this.onPaint, false);
    e.stopPropagation();

    // Saving points to shape
    this.self.methods.addShapeLine(this.shape, {
      color: this.buffer_ctx.strokeStyle,
      width: this.buffer_ctx.lineWidth,
      points: this.ppts,
    });

    this.onFinish();
  };

  private onPaint() {
    // Saving all the points in an array
    this.ppts.push({ x: this.mouse.x, y: this.mouse.y });
    this.writeToBuffer();
  };

  private onClear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private onFinish() {
    // Writing down to real canvas now
    this.ctx.drawImage(this.canvas_buffer, 0, 0);
    // Clearing tmp canvas
    this.buffer_ctx.clearRect(0, 0, this.canvas_buffer.width, this.canvas_buffer.height);

    // Emptying up Pencil Points
    this.ppts = [];
  };

  private writeToBuffer() {
    if (this.ppts.length < 3) {
      var b = this.ppts[0];
      this.buffer_ctx.beginPath();
      this.buffer_ctx.arc(b.x, b.y, this.buffer_ctx.lineWidth / 2, 0, Math.PI * 2, !0);
      this.buffer_ctx.fill();
      this.buffer_ctx.closePath();

      return;
    }

    // Tmp canvas is always cleared up before drawing.
    this.buffer_ctx.clearRect(0, 0, this.canvas_buffer.width, this.canvas_buffer.height);

    this.buffer_ctx.beginPath();
    this.buffer_ctx.moveTo(this.ppts[0].x, this.ppts[0].y);

    for (var i = 1; i < this.ppts.length - 2; i++) {
      var c = (this.ppts[i].x + this.ppts[i + 1].x) / 2;
      var d = (this.ppts[i].y + this.ppts[i + 1].y) / 2;

      this.buffer_ctx.quadraticCurveTo(this.ppts[i].x, this.ppts[i].y, c, d);
    }

    // For the last 2 points
    this.buffer_ctx.quadraticCurveTo(
      this.ppts[i].x,
      this.ppts[i].y,
      this.ppts[i + 1].x,
      this.ppts[i + 1].y
    );
    this.buffer_ctx.stroke();
  };

  private onResize() {
    if (!!this.shape.lines) {
      this.onClear()
      this.removeCanvases()
      this.createCanvases()
      this.initialize()
    }
  }

  private onZoom() {
    if (!!this.shape.lines) {
      this.onClear()
      this.removeCanvases()
      this.createCanvases()
      this.shape.lines.forEach(line => {
        this.ppts = line.points.map(point => {
          return { x: point.x * this.self.locals.map.zoom, y: point.y * this.self.locals.map.zoom }
        })

        this.buffer_ctx.lineWidth = line.width;
        this.buffer_ctx.strokeStyle = line.color;
        this.buffer_ctx.fillStyle = line.color;

        this.writeToBuffer();
        this.onFinish();
      })
    }
  }

  private initialize() {
    if (!!this.shape.lines) {
      for (var l in this.shape.lines) {
        var line = this.shape.lines[l];
        this.ppts = line.points;

        this.buffer_ctx.lineWidth = line.width;
        this.buffer_ctx.strokeStyle = line.color;
        this.buffer_ctx.fillStyle = line.color;

        this.writeToBuffer();
        this.onFinish();
      }
    }
    this.setDrawingStyles()
  };

  private setDrawingStyles() {
    this.buffer_ctx.lineWidth = this.self.locals.drawing.width;
    this.buffer_ctx.strokeStyle = this.self.locals.drawing.color;
    this.buffer_ctx.fillStyle = this.self.locals.drawing.color;
  };
}
