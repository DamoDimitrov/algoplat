import { Component, ElementRef, ViewChild } from '@angular/core';
import * as THREE from 'three';
import {
  Mesh,
  PerspectiveCamera,
  PointLight,
  Scene,
  Vector2,
  Vector3,
  WebGLRenderer,
} from 'three';
import { Font, FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { SortDataModel } from '../models/SortDataModel';
import { SquareModel } from '../models/SquareModel';

@Component({
  selector: 'quick-sort-animation',
  templateUrl: './quick-sort-animation.component.html',
  styleUrl: './quick-sort-animation.component.scss',
})
export class QuickSortAnimationComponent {
  @ViewChild('canvasElement')
  canvasRef: ElementRef;

  // Canvas data start
  canvas;
  sizes;
  font: Font;

  scene: Scene;
  camera: PerspectiveCamera;
  light: PointLight;
  renderer: WebGLRenderer;
  // Canvas data end

  sqArr: SquareModel[] = [];
  rectWidth = 2;
  spacing = 0.2;

  sortData: SortDataModel;

  ngOnInit() {}

  ngAfterViewInit() {
    this.canvas = this.canvasRef.nativeElement;
    this.setCanvasDimensions();

    this.sizes = {
      width: this.canvas.width,
      height: this.canvas.height,
    };

    this.setup();

    this.renderer.render(this.scene, this.camera);
  }

  setup(): void {
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      45,
      this.sizes.width / this.sizes.height
    );
    this.camera.position.z = 20;

    this.light = new THREE.PointLight(0xffffff, 70, 100);
    this.light.position.set(0, 10, 10);
    this.scene.add(this.light);

    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(2);
    this.renderer.setClearColor(0xffffff, 1);
  }

  private setCanvasDimensions() {
    this.canvas.width = this.canvas.parentElement.clientWidth;
    this.canvas.height = this.canvas.parentElement.clientHeight;
  }

  drawData() {
    this.scene.clear();
    this.sqArr = [];

    const fontLoader = new FontLoader();
    fontLoader.load('assets/fonts/helvetiker_regular.typeface.json', (font) => {
      this.font = font;
      // Draw cells after the font is loaded
      for (let i = 0; i < this.sortData.data.length; i++) {
        this.drawCell(i, this.sortData.data[i]);
      }

      this.renderer.render(this.scene, this.camera);
    });

    setTimeout(() => {
      this.moveSquareUp(0);
      this.moveSquareUp(2)
        .then(() => this.exchangeSquaresPositions(0, 2))
        .then(() => {
          this.moveSquareDown(0);
          this.moveSquareDown(2);
        });
    }, 2000);

    setTimeout(() => {
      this.moveSquareUp(0);
      this.moveSquareUp(1)
        .then(() => this.exchangeSquaresPositions(0, 1))
        .then(() => {
          this.moveSquareDown(0);
          this.moveSquareDown(1);
        });
    }, 10000);
  }

  private drawCell(index: number, number: string): void {
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });

    let points = this.getPointsOfSquare(index);

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(geometry, lineMaterial);

    // Add the number in the cell
    const text = this.addNumberInCell(number, index);

    // Creates the new Square and adds it to the array
    const square = new SquareModel();
    square.square = line;
    square.numberInSquare = text;
    square.originalPosition = {
      x: this.getXCenterPositionOfRectangle(index),
      y: 0,
    };
    this.sqArr.push(square);

    this.scene.add(this.sqArr[index].square);
    this.renderer.render(this.scene, this.camera);
  }

  moveSquareUp(index: number): Promise<void> {
    return new Promise((resolve) => {
      const sq = this.sqArr[index];
      if (!sq) {
        console.error(`Square at index ${index} does not exist.`);
        resolve();
        return;
      }

      const elevatedPosition = this.rectWidth + this.spacing;

      const animate = () => {
        if (Number(sq.square.position.y.toFixed(1)) < elevatedPosition) {
          sq.square.position.y += 0.04;
          sq.numberInSquare.position.y += 0.04;
          this.renderer.render(this.scene, this.camera);
          requestAnimationFrame(animate);
        } else {
          // Ensure position is set exactly to avoid precision issues
          sq.square.position.y = elevatedPosition;
          sq.numberInSquare.position.y = elevatedPosition;
          this.renderer.render(this.scene, this.camera);
          resolve(); // Resolve the promise when the square reaches the target position
        }
      };

      animate(); // Start the animation loop
    });
  }

  moveSquareDown(index: number): Promise<void> {
    return new Promise((resolve) => {
      const sq = this.sqArr[index];
      if (!sq) {
        console.error(`Square at index ${index} does not exist.`);
        resolve();
        return;
      }

      const elevatedPosition = this.rectWidth;

      const animate = () => {
        if (Number(sq.square.position.y.toFixed(1)) != 0) {
          sq.square.position.y -= 0.04;
          sq.numberInSquare.position.y -= 0.04;
          this.renderer.render(this.scene, this.camera);
          requestAnimationFrame(animate);
        } else {
          // Ensure position is set exactly to avoid precision issues
          sq.square.position.y = 0;
          sq.numberInSquare.position.y = 0;
          this.renderer.render(this.scene, this.camera);
          resolve(); // Resolve the promise when the square reaches the target position
        }
      };

      animate(); // Start the animation loop
    });
  }

  exchangeSquaresPositions(index1: number, index2: number): Promise<void> {
    return new Promise((resolve) => {
      const sq1 = this.sqArr[index1];
      const sq2 = this.sqArr[index2];

      this.sqArr[index1] = sq2;
      this.sqArr[index2] = sq1;

      if (!sq1 || !sq2) {
        console.error(`Square at index ${index1} or ${index2} does not exist.`);
        resolve();
        return;
      }
      const originalPositionSq1 = this.sqArr[index1].originalPosition;
      const originalPositionSq2 = this.sqArr[index2].originalPosition;

      let xLeftToMove = Math.abs(originalPositionSq1.x - originalPositionSq2.x);

      const animate = () => {
        if (Number(xLeftToMove.toFixed(2)) != 0) {
          sq1.square.position.x += 0.04;
          sq1.numberInSquare.position.x += 0.04;
          sq2.square.position.x -= 0.04;
          sq2.numberInSquare.position.x -= 0.04;
          xLeftToMove = Number((xLeftToMove - 0.04).toFixed(2));

          this.renderer.render(this.scene, this.camera);
          requestAnimationFrame(animate);
        } else {
          // Ensure position is set exactly to avoid precision issues
          sq1.originalPosition.x = Number(sq1.square.position.x.toFixed(2));
          sq2.originalPosition.x = Number(sq2.square.position.x.toFixed(2));

          console.log(sq1);
          console.log(sq2);

          this.renderer.render(this.scene, this.camera);
          resolve(); // Resolve the promise when the square reaches the target position
        }
      };

      animate(); // Start the animation loop
    });
  }

  private addNumberInCell(number: string, index: number): Mesh {
    const textGeometry = new TextGeometry(
      number === undefined ? '' : number.toString(),
      {
        font: this.font,
        size: 1.3,
        height: 0,
      }
    );

    textGeometry.computeBoundingBox();

    const textWidth =
      textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x;
    const textHeight =
      textGeometry.boundingBox.max.y - textGeometry.boundingBox.min.y;
    const xPositionOfLeftPoints = this.getPositionOfSquareLeftPoints(
      this.sortData.data.length,
      index
    );

    const xOffset = xPositionOfLeftPoints + (this.rectWidth - textWidth) / 2;
    const yOffset = -this.rectWidth / 2 + (this.rectWidth - textHeight) / 2;
    textGeometry.translate(xOffset, yOffset, 0);

    const material = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const textMesh = new Mesh(textGeometry, material);

    // let rect = this.sqArr[index];

    this.scene.add(textMesh);
    return textMesh;
  }

  private getPointsOfSquare(index: number): Vector2[] {
    const dataArraySize = this.sortData.data.length;
    const xPositionOfLeftPoints = this.getPositionOfSquareLeftPoints(
      dataArraySize,
      index
    );
    const xPositionOfRightPoints = this.getPositionOfSquareRightPoints(
      dataArraySize,
      index
    );
    const yPositionOfUpperPoints = this.rectWidth / 2;
    const yPositionOfLowerPoints = -this.rectWidth / 2;

    let points = [];
    points.push(
      new THREE.Vector2(xPositionOfLeftPoints, yPositionOfUpperPoints)
    );
    points.push(
      new THREE.Vector2(xPositionOfLeftPoints, yPositionOfLowerPoints)
    );
    points.push(
      new THREE.Vector2(xPositionOfRightPoints, yPositionOfLowerPoints)
    );
    points.push(
      new THREE.Vector2(xPositionOfRightPoints, yPositionOfUpperPoints)
    );
    points.push(
      new THREE.Vector2(xPositionOfLeftPoints, yPositionOfUpperPoints)
    );

    return points;
  }

  private getPositionOfSquareRightPoints(dataArraySize: number, index: number) {
    return (
      (-dataArraySize / 2 + index + 1) * this.rectWidth +
      ((-dataArraySize - 1) / 2 + index) * this.spacing
    );
  }

  private getPositionOfSquareLeftPoints(dataArraySize: number, index: number) {
    return (
      (-dataArraySize / 2 + index) * this.rectWidth +
      ((-dataArraySize - 1) / 2 + index) * this.spacing
    );
  }

  private getXCenterPositionOfRectangle(index: number) {
    return (
      (-(this.sortData.data.length - 1) / 2 + index) *
      (this.rectWidth + this.spacing)
    );
  }
}
