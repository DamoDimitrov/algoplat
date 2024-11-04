import {Component, ElementRef, NgZone, ViewChild} from '@angular/core';
import * as THREE from 'three';
import {Mesh, PerspectiveCamera, PointLight, Scene, WebGLRenderer} from 'three';

@Component({
  selector: 'stack-animation',
  templateUrl: './stack-animation.component.html',
  styleUrl: './stack-animation.component.scss'
})
export class StackAnimationComponent {
  @ViewChild('canvasElement')
  canvasRef: ElementRef;

  canvas;
  sizes;

  defaultStackSize = 4;
  sqArr: Mesh[] = [];
  borderPadding = 0.1;
  rectWidth = 2;
  next: number = 0;
  isStackEmpty = true;

  scene: Scene;
  camera: PerspectiveCamera;
  light: PointLight;
  renderer: WebGLRenderer;

  activeAnimation = false;
  peekGoingUp = true;

  constructor(private ngZone: NgZone) {
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.canvas = this.canvasRef.nativeElement;
    this.setCanvasDimensions();

    this.sizes = {
      width: this.canvas.width,
      height: this.canvas.height
    };

    this.setup();
    this.drawStackBorders();

    this.renderer.render(this.scene, this.camera);
  }

  setup(): void {
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(45, this.sizes.width / this.sizes.height);
    this.camera.position.z = 20;

    this.light = new THREE.PointLight(0xffffff, 70, 100);
    this.light.position.set(0, 10, 10);
    this.scene.add(this.light);

    this.renderer = new THREE.WebGLRenderer({canvas: this.canvas});
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(2)
    this.renderer.setClearColor(0xffffff, 1);
  }

  private setCanvasDimensions() {
    this.canvas.width = this.canvas.parentElement.clientWidth;
    this.canvas.height = this.canvas.parentElement.clientHeight;
  }

  private drawStackBorders() {
    const lineMaterial = new THREE.LineBasicMaterial({color: 0x000000});
    let points = [];
    points.push(new THREE.Vector2(-this.rectWidth / 2 - this.borderPadding, this.rectWidth));
    points.push(new THREE.Vector2(-this.rectWidth / 2 - this.borderPadding, this.rectWidth - this.defaultStackSize * (this.rectWidth + this.borderPadding)));
    points.push(new THREE.Vector2(this.rectWidth / 2 + this.borderPadding, this.rectWidth - this.defaultStackSize * (this.rectWidth + this.borderPadding)));
    points.push(new THREE.Vector2(this.rectWidth / 2 + this.borderPadding, this.rectWidth));
    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    const line = new THREE.Line(geometry, lineMaterial);
    this.scene.add(line);
  }

  drawRectangle() {
    if (this.sqArr.length === this.defaultStackSize) {
      this.activeAnimation = false;
      return;
    }
    const geometry = new THREE.PlaneGeometry(this.rectWidth, this.rectWidth);
    const mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({color: 0x000000}))

    mesh.position.setY(this.rectWidth * 1.5)
    this.sqArr.push(mesh)
    this.scene.add(mesh);
    this.pushToStack(mesh);
  }

  pushToStack(rectangle): void {
    if (!this.activeAnimation ||
      rectangle === undefined ||
      this.next >= this.defaultStackSize) {
      return;
    }
    (rectangle.material as THREE.MeshBasicMaterial).color.set(0xeb4034);

    let xAxis = Number(rectangle.position.x.toFixed(1));
    let yAxis = Number(rectangle.position.y.toFixed(1));

    //Moves the rectangle to the left until it's above the cup
    if (xAxis !== 0) {
      rectangle.position.x -= 0.1;
      for (let i = this.next + 1; i < this.sqArr.length; i++) {
        this.sqArr[i].position.x -= 0.1;
      }
    }

    //Moves the rectangle down until it reaches bottom or previous rectangle
    if (xAxis === 0
      && yAxis !==
      (Number(((this.rectWidth * 1.5 + this.borderPadding) - (this.defaultStackSize - this.next) *
        (this.rectWidth + this.borderPadding)).toFixed(1)))) {
      rectangle.position.y -= 0.1;
    } else if (xAxis === 0 && yAxis === (Number(((this.rectWidth * 1.5 + this.borderPadding) -
      (this.defaultStackSize - this.next) * (this.rectWidth + this.borderPadding)).toFixed(1)))) {
      this.activeAnimation = false;
      (rectangle.material as THREE.MeshBasicMaterial).color.set(0x000000);

      if (this.defaultStackSize !== this.next) {
        this.next++;
      }
      this.renderer.render(this.scene, this.camera);

      return;
    }

    this.renderer.render(this.scene, this.camera);

    this.ngZone.runOutsideAngular(() => {
      requestAnimationFrame(() => {
        this.pushToStack(rectangle);
      });
    });
  }

  popFromStack() {
    if (!this.activeAnimation || this.next === 0) {
      this.activeAnimation = false;
      return;
    }

    const sq = this.sqArr[this.next - 1];
    (sq.material as THREE.MeshBasicMaterial).color.set(0xeb4034);


    if (Number(sq.position.y.toFixed(1)) !== this.rectWidth * 1.5 + this.borderPadding) {
      sq.position.y += 0.1;
    } else if ((sq.material as THREE.MeshBasicMaterial).opacity > 0) {
      (sq.material as THREE.MeshBasicMaterial).opacity -= 0.1;
      (sq.material as THREE.MeshBasicMaterial).needsUpdate = true;
    } else {
      this.activeAnimation = false;
      this.scene.remove(sq);
      this.sqArr.splice(this.next - 1, 1);
      this.next--;
      this.renderer.render(this.scene, this.camera);

      return
    }

    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.popFromStack.bind(this));
  }

  peekFromStack() {
    if (!this.activeAnimation || this.next === 0) {
      this.activeAnimation = false;

      return;
    }

    requestAnimationFrame(this.peekFromStack.bind(this));
    const sq = this.sqArr[this.next - 1];
    (sq.material as THREE.MeshBasicMaterial).color.set(0xeb4034);

    if (this.isAtTop(sq)) {
      this.peekGoingUp = false;
    }

    const yAxis = Number(sq.position.y.toFixed(1));
    if (!this.isAtTop(sq) && this.peekGoingUp) {
      sq.position.y += 0.1;
    } else if (yAxis !==
      (Number(((this.rectWidth * 1.5 + this.borderPadding) - (this.defaultStackSize - this.next + 1) *
        (this.rectWidth + this.borderPadding)).toFixed(1))) && !this.peekGoingUp) {
      sq.position.y -= 0.1;
    } else {
      this.activeAnimation = false;
      (sq.material as THREE.MeshBasicMaterial).color.set(0x000000);
      this.renderer.render(this.scene, this.camera);

      return
    }

    this.renderer.render(this.scene, this.camera);
  }

  private isAtTop(sq) {
    const yAxis = Number(sq.position.y.toFixed(1));
    const yCoordinatesAboveBorder = this.rectWidth * 1.5 + this.borderPadding;

    return yAxis === yCoordinatesAboveBorder;
  }
  }
