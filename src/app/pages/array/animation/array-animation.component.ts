import {Component, ElementRef, Input, SimpleChanges, ViewChild} from '@angular/core';
import * as THREE from "three";
import {
  BufferGeometry,
  LineSegments, Material,
  Mesh, Object3DEventMap,
  PerspectiveCamera,
  PlaneGeometry,
  PointLight,
  Scene,
  WebGLRenderer
} from "three";
import { Font, FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

@Component({
  selector: 'animation',
  templateUrl: './array-animation.component.html',
  styleUrl: './array-animation.component.scss'
})
export class ArrayAnimationComponent {
  // Canvas properties
  @ViewChild('canvasElement')
  canvasRef: ElementRef;

  canvas;
  sizes;

  scene: Scene;
  camera: PerspectiveCamera;
  light: PointLight;
  renderer: WebGLRenderer;

  // Data properties
  @Input() arrayData: number[];
  @Input() setNumberByIndexData;

  borderPadding = 0.2;
  rectWidth = 2;
  numbersGeometryArray: Mesh[] = [];
  tempNumberGeometry: Mesh = null;
  font: Font;
  sqArr: Mesh[] = []
  borderArr: LineSegments[] = [];
  tempRect: Mesh = null;
  tempBorder: LineSegments = null;

  afterViewInitExecuted = false;
  activeAnimation = false;

  defaultYCellPosition = -(this.rectWidth / 2 + this.borderPadding);
  defaultYRectanglePosition = -(this.rectWidth / 2 + this.borderPadding);

  ngOnInit() {}

  ngOnChanges(change: SimpleChanges) {
    if (this.afterViewInitExecuted) {
      if (change['arrayData']) {
        this.drawArrayOfCells();
      } else if (change['setNumberByIndexData']) {
        // this.activeAnimation = true;
        this.setNumberToIndexInCells();
        this.drawArrayOfRectangles();
      } else if (change['setNumberByIndexData']) {
        // this.activeAnimation = true;
        this.setNumberToIndexInRectangles();
      }
    }
  }

  ngAfterViewInit() {
    this.canvas = this.canvasRef.nativeElement;
    this.setCanvasDimensions();

    this.sizes = {
      width: this.canvas.width,
      height: this.canvas.height
    };

    this.setup();

    this.renderer.render(this.scene, this.camera);
    this.afterViewInitExecuted = true;
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

  private setCanvasDimensions(): void {
    this.canvas.width = this.canvas.parentElement.clientWidth;
    this.canvas.height = this.canvas.parentElement.clientHeight;
  }

  drawArrayOfCells(): void {
    this.scene.clear();

    this.drawBorders()

    const fontLoader = new FontLoader();
    fontLoader.load('assets/fonts/helvetiker_regular.typeface.json', (font) => {
      this.font = font;
      // Draw cells after the font is loaded
      for(let i = 0; i < this.arrayData.length; i++) {
        this.drawCell(i, this.arrayData[i]);
      }
      this.renderer.render(this.scene, this.camera);
    })
  }

  private drawBorders(): void {
    const lineMaterial = new THREE.LineBasicMaterial({color: 0x000000});
    const bordersLength = this.arrayData.length * this.rectWidth + (this.arrayData.length + 1) * this.borderPadding;

    let points = [];
    points.push(new THREE.Vector2(0 - bordersLength / 2, 0));
    points.push(new THREE.Vector2(0 - bordersLength / 2, 0 - (this.rectWidth + 2 * this.borderPadding)));
    points.push(new THREE.Vector2(bordersLength / 2, 0 - (this.rectWidth + 2 * this.borderPadding)));
    points.push(new THREE.Vector2(bordersLength / 2, 0));

    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    const line = new THREE.Line(geometry, lineMaterial);
    this.scene.add(line);
    this.renderer.render(this.scene, this.camera);
  }

  private drawCell(index: number, number: number): void {

    const lineMaterial = new THREE.LineBasicMaterial({color: 0x000000})
    const bordersLengthLeftPart = - ((this.arrayData.length * this.rectWidth + (this.arrayData.length + 1) * this.borderPadding) / 2);

    let points = [];
    points.push(new THREE.Vector2(bordersLengthLeftPart + ((index + 1) * this.borderPadding) + (index * this.rectWidth), -this.borderPadding));
    points.push(new THREE.Vector2(bordersLengthLeftPart + ((index + 1) * this.borderPadding) + (index * this.rectWidth), -this.borderPadding - this.rectWidth));
    points.push(new THREE.Vector2(bordersLengthLeftPart + ((index + 1) * this.borderPadding) + ((index + 1) * this.rectWidth), -this.borderPadding - this.rectWidth));
    points.push(new THREE.Vector2(bordersLengthLeftPart + ((index + 1) * this.borderPadding) + ((index + 1) * this.rectWidth), -this.borderPadding));

    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    const line = new THREE.Line(geometry, lineMaterial);
    this.scene.add(line);

    //Add the number in the cell
    this.addNumberInCell(number, bordersLengthLeftPart, index, false);

    this.renderer.render(this.scene, this.camera);
  }

  private addNumberInCell(number: number, bordersLengthLeftPart: number, index: number, addTemp) {
    if (!this.font) {
      return;
    }
    const textGeometry = new TextGeometry(number === undefined? '' : number.toString(), {
      font: this.font,
      size: 0.7,
      height: 0,
    });

    textGeometry.computeBoundingBox();
    const textWidth = textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x;
    const textHeight = textGeometry.boundingBox.max.y - textGeometry.boundingBox.min.y;

    const xOffset = this.borderPadding + bordersLengthLeftPart - textWidth / 2
    const yOffset = -textHeight / 2
    textGeometry.translate( xOffset, yOffset, 0);

    const material = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const textMesh = new Mesh(textGeometry, material);

    const xPosition = index * (this.rectWidth + this.borderPadding) + this.rectWidth / 2;
    const yPosition = !addTemp ? this.defaultYCellPosition : this.defaultYCellPosition + this.rectWidth;
    textMesh.position.set(xPosition, yPosition, 0);

    this.scene.add(textMesh);
  }

  setNumberToIndexInCells() {
    let number = this.setNumberByIndexData['number'];
    let index = this.setNumberByIndexData['index'];

    const bordersLengthLeftPart = - ((this.arrayData.length * this.rectWidth + (this.arrayData.length + 1) * this.borderPadding) / 2);

    this.addNumberInCell(number, bordersLengthLeftPart, index, true)
    this.scene.remove(this.numbersGeometryArray[index])

    this.renderer.render(this.scene, this.camera);
  }

  private drawRectangleBorders(geometry: PlaneGeometry, X: number, Y: number, index : number, addToArray: boolean) {
    const edgesGeometry = new THREE.EdgesGeometry(geometry);
    const edgesMaterial = new THREE.LineBasicMaterial({color: 0x000000});
    const border = new THREE.LineSegments(edgesGeometry, edgesMaterial);

    // Set border position to match the rectangle
    border.position.setX(X);
    border.position.setY(Y);
    if (addToArray) {
      this.borderArr[index] = border;
    } else {
      this.tempBorder = border;
    }
    this.scene.add(border);
  }

  setNumberToIndexInRectangles() {
    const index = this.setNumberByIndexData['index'];
    const sq = this.sqArr[index];

    //Check if the animation is still active or if there is no such square
    if (!this.activeAnimation || sq === undefined) {
      return;
    }
    const border = this.borderArr[index];

    // Creates the rectangle that would be added to the array
    if (this.tempRect === null) {
      this.drawRectangle(index, this.setNumberByIndexData['number'], false);
    }

    let yOfExtractedRectangle = this.defaultYRectanglePosition + this.rectWidth + (2 * this.borderPadding);
    const bordersLength = this.arrayData.length * this.rectWidth + (this.arrayData.length + 1) * this.borderPadding;
    const xOfMovedToLeftRectangle = -bordersLength / 2 + (this.borderPadding + this.rectWidth / 2) + (index - 1) * (this.rectWidth + this.borderPadding);

    //Extracting the rectangle that will be replaced
    if (!this.isRectExtracted(sq, yOfExtractedRectangle)) {
      //Moving the rectangle out of the array by the Y axis
      sq.position.y += 0.1;
      border.position.y += 0.1;
    } else if(this.isRectExtracted(sq, yOfExtractedRectangle) && !(Number(sq.position.x.toFixed(1)) === Number(xOfMovedToLeftRectangle.toFixed(1)))) {
      //Moving the rectangle to the left to make way of the new rectangle
      sq.position.x -= 0.1;
      border.position.x -= 0.1;
    } else if (!this.isNewRectPushed()) {
      //Moving the new rectangle down into position in the array
        this.tempRect.position.y -= 0.1;
        this.tempBorder.position.y -= 0.1;
    } else {
      this.activeAnimation = false;
      //Remove the extracted square from the scene
      this.scene.remove(sq);
      this.scene.remove(border)

      //Set the new square on the index of the old one
      this.sqArr[index] = this.tempRect;
      this.borderArr[index] = this.tempBorder;

      //Reset the temp variables
      this.tempRect = null;
      this.tempBorder = null;

      this.renderer.render(this.scene, this.camera);

      return;
    }

    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.setNumberToIndexInRectangles.bind(this));
  }

  private isRectExtracted(sq: Mesh<BufferGeometry, Material | Material[], Object3DEventMap>, yOfExtractedRectangle: number) {
    return Number(sq.position.y.toFixed(1)) === Number(yOfExtractedRectangle.toFixed(1));
  }

  private isNewRectPushed() {
    return Number(this.tempRect.position.y.toFixed(1)) === this.defaultYRectanglePosition;
  }
}
