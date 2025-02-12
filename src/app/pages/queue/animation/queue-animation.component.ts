import {Component, ElementRef, NgZone, ViewChild} from '@angular/core';
import {Mesh, PerspectiveCamera, PointLight, Scene, WebGLRenderer} from "three";
import * as THREE from "three";

@Component({
  selector: 'queue-animation',
  templateUrl: './queue-animation.component.html',
  styleUrl: './queue-animation.component.scss'
})
export class QueueAnimationComponent {
  @ViewChild('canvasElement')
  canvasRef: ElementRef;

  canvas;
  sizes;

  defaultStackSize = 4;
  sqArr: Mesh[] = [];
  borderPadding = 0.1;
  rectWidth = 2;
  next: number = 0;
  isQueueEmpty = true;

  scene: Scene;
  camera: PerspectiveCamera;
  light: PointLight;
  renderer: WebGLRenderer;

  activeAnimation = false;
  peekGoingDown = true;

  constructor(private ngZone: NgZone) {
  }

  ngOnInit() {

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

  pushToQueue(rectangle): void {
    if (!this.activeAnimation ||
      rectangle === undefined ||
      this.next >= this.defaultStackSize) {
      return;
    }
    (rectangle.material as THREE.MeshBasicMaterial).color.set(0xeb4034);

    let yAxis = Number(rectangle.position.y.toFixed(1));

    //Moves the rectangle down until it reaches bottom or previous rectangle
    if (yAxis !== (Number(((this.rectWidth * 2.5 + this.borderPadding) - (this.defaultStackSize - this.next) *
        (this.rectWidth + this.borderPadding)).toFixed(1)))) {
      rectangle.position.y -= 0.1;
    } else if (yAxis === (Number(((this.rectWidth * 2.5 + this.borderPadding) -
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
        this.pushToQueue(rectangle);
      });
    });
  }

  popFromQueue(): void {
    if (!this.activeAnimation || this.next === 0) {
      this.activeAnimation = false;
      return;
    }

    const sq = this.sqArr[0];
    (sq.material as THREE.MeshBasicMaterial).color.set(0xeb4034);

    if (Number(sq.position.y.toFixed(1)) !==
      Number((this.rectWidth * 1.5 - this.defaultStackSize * (this.rectWidth + this.borderPadding)).toFixed(1))) {
      sq.position.y -= 0.1;
      for (let i = 1; i < this.sqArr.length; i++) {
        if(this.sqArr[i] !== undefined) {
          this.sqArr[i].position.y -= 0.1;
        }
      }
    } else if ((sq.material as THREE.MeshBasicMaterial).opacity > 0) {
      (sq.material as THREE.MeshBasicMaterial).opacity -= 0.1;
      (sq.material as THREE.MeshBasicMaterial).needsUpdate = true;
    } else {
      this.activeAnimation = false;
      this.scene.remove(sq);
      this.sqArr.shift();
      this.next--;
      this.renderer.render(this.scene, this.camera);

      return
    }

    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.popFromQueue.bind(this));
  }

  peekFromQueue() {
    if (!this.activeAnimation || this.next === 0) {
      this.activeAnimation = false;

      return;
    }
    requestAnimationFrame(this.peekFromQueue.bind(this));
    const sq = this.sqArr[0];
    (sq.material as THREE.MeshBasicMaterial).color.set(0xeb4034);

    if (this.isAtBottom(sq)) {
      this.peekGoingDown = false;
    }

    const yAxis = Number(sq.position.y.toFixed(1));
    if (!this.isAtBottom(sq) && this.peekGoingDown) {
      sq.position.y -= 0.1;
    } else if (yAxis !== (Number(((this.rectWidth * 1.5) - (this.defaultStackSize - 1) *
      (this.rectWidth + this.borderPadding)).toFixed(1))) && !this.peekGoingDown) {
      sq.position.y += 0.1;
    } else {
      this.activeAnimation = false;
      (sq.material as THREE.MeshBasicMaterial).color.set(0x000000);
      this.renderer.render(this.scene, this.camera);

      return
    }

    this.renderer.render(this.scene, this.camera);
  }

  private isAtBottom(sq) {
    const yAxis = Number(sq.position.y.toFixed(1));
    const yCoordinatesAboveBorder = Number((this.rectWidth * 1.5 - this.borderPadding - this.defaultStackSize
      * (this.rectWidth + this.borderPadding)).toFixed(1));

    return yAxis === yCoordinatesAboveBorder;


  }

  drawRectangle() {
    if (this.sqArr.length === this.defaultStackSize) {
      this.activeAnimation = false;
      return;
    }
    const geometry = new THREE.PlaneGeometry(this.rectWidth, this.rectWidth);
    const mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({color: 0x000000}))

    mesh.position.setY(this.rectWidth * 3)
    this.sqArr.push(mesh)
    this.scene.add(mesh);
    this.pushToQueue(mesh);
  }

  private setCanvasDimensions() {
    this.canvas.width = this.canvas.parentElement.clientWidth;
    this.canvas.height = this.canvas.parentElement.clientHeight;
  }

  private drawStackBorders() {
    const lineMaterial = new THREE.LineBasicMaterial({color: 0x000000});

    let pointsLeft = [];
    let pointsRight = [];
    pointsLeft.push(new THREE.Vector2(-this.rectWidth / 2 - this.borderPadding, this.rectWidth * 2));
    pointsLeft.push(new THREE.Vector2(-this.rectWidth / 2 - this.borderPadding, this.rectWidth * 2 - this.defaultStackSize * (this.rectWidth + this.borderPadding)));
    pointsRight.push(new THREE.Vector2(this.rectWidth / 2 + this.borderPadding, this.rectWidth * 2 - this.defaultStackSize * (this.rectWidth + this.borderPadding)));
    pointsRight.push(new THREE.Vector2(this.rectWidth / 2 + this.borderPadding, this.rectWidth * 2));

    const geometryLeft = new THREE.BufferGeometry().setFromPoints(pointsLeft);
    const geometryRight = new THREE.BufferGeometry().setFromPoints(pointsRight);

    const leftLine = new THREE.Line(geometryLeft, lineMaterial);
    const rightLine = new THREE.Line(geometryRight, lineMaterial);
    this.scene.add(leftLine);
    this.scene.add(rightLine);
  }

}
