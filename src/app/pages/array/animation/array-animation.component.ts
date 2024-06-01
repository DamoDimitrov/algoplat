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
import {FontLoader} from "three/examples/jsm/loaders/FontLoader";
import {TextGeometry} from "three/examples/jsm/geometries/TextGeometry";

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
  sqArr: Mesh[] = []
  borderArr: LineSegments[] = [];
  tempRect: Mesh = null;
  tempBorder: LineSegments = null;

  afterViewInitExecuted = false;
  activeAnimation = false;

  defaultYRectanglePosition = -(this.rectWidth / 2 + this.borderPadding);

  ngOnInit() {}

  ngOnChanges(change: SimpleChanges) {
    if (this.afterViewInitExecuted) {
      if (change['arrayData']) {
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

  drawArrayOfRectangles(): void {
    this.scene.clear();
    this.drawBorders()
    for (let [index, number] of this.arrayData.entries()) {
      this.drawRectangle(index, number, true);
    }

    this.renderer.render(this.scene, this.camera);
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

  drawRectangle(index: number, number: number, addToArray: boolean): void {
    const geometry = new THREE.PlaneGeometry(this.rectWidth, this.rectWidth);
    const mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: 0xffffff }));

    const bordersLength = this.arrayData.length * this.rectWidth + (this.arrayData.length + 1) * this.borderPadding;
    const X = -bordersLength / 2 + (this.borderPadding + this.rectWidth / 2) + index * (this.rectWidth + this.borderPadding);
    let Y = this.defaultYRectanglePosition;

    mesh.position.setX(X);
    if (addToArray) {
      mesh.position.setY(Y);
      this.sqArr[index] = mesh;
    } else {
      Y += 2 * this.rectWidth + (3 * this.borderPadding);
      mesh.position.setY(Y);
      this.tempRect = mesh;
    }
    this.scene.add(mesh);

    // Draw Rectangle Borders
    this.drawRectangleBorders(geometry, X, Y, index, addToArray);

    // Add the number in the center of the rectangle
    // const loader = new FontLoader();
    // loader.load('assets/helvetiker_regular.typeface.json', (font) => {
    //   const textGeometry = new TextGeometry(number.toString(), {
    //     font: font,
    //     size: 10,
    //     height: 1
    //   });
    //   const textMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, opacity: 1 });
    //   const textMesh = new THREE.Mesh(textGeometry, textMaterial);
    //
    //   // Calculate text bounding box and position
    //   textGeometry.computeBoundingBox();
    //   const textWidth = textGeometry.boundingBox?.max.x - textGeometry.boundingBox?.min.x;
    //   const textHeight = textGeometry.boundingBox?.max.y - textGeometry.boundingBox?.min.y;
    //
    //   if (textWidth !== undefined && textHeight !== undefined) {
    //     textMesh.position.set(X - textWidth / 2, Y + textHeight / 2, 0);
    //   } else {
    //     console.error('Failed to compute text bounding box.');
    //   }
    //
    //   this.scene.add(textMesh);
    // }, undefined, (error) => {
    //   console.error('Failed to load font:', error);
    // });
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
