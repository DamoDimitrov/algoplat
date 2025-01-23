import { Component, ElementRef, ViewChild } from '@angular/core';
import * as THREE from 'three';
import {
  Mesh,
  PerspectiveCamera,
  PointLight,
  Scene,
  Vector2,
  WebGLRenderer,
} from 'three';
import { Font, FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { SortDataModel } from '../models/SortDataModel';
import { SquareModel } from '../models/SquareModel';
import { Algorithms } from 'src/app/common/algorithms';

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

  sqArr = [];
  rectWidth = 2;
  spacing = 0.2;

  sortData: SortDataModel;

  ngOnInit() { }

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
      this.sort(this.sortData.data.map(Number));
    }, 500);
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

    this.sqArr.push({[number]: square});    

    this.scene.add(square.square);
    this.renderer.render(this.scene, this.camera);
  }

  moveSquareUp(number: number): Promise<void> {
    
    return new Promise((resolve) => {
      const sq = this.getSquareByNumber(number);
      if (!sq) {
        console.error(`Square with number ${number} does not exist.`);
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

  moveSquareDown(number: number): Promise<void> {
    return new Promise((resolve) => {
      const sq = this.getSquareByNumber(number);
      if (!sq) {
        console.error(`Square with number ${number} does not exist.`);
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
      if (index1 > index2) {
        [index1, index2] = [index2, index1]; // Swap if index1 is greater than index2
      }

      const sq1 = this.getSquareByIndex(index1);
      const sq2 = this.getSquareByIndex(index2);

      if (!sq1 || !sq2) {
        console.error(`Square at index ${index1} or ${index2} does not exist.`);
        resolve();
        return;
      }

      let xLeftToMove = Math.abs(this.getXCenterPositionOfRectangle(index1) - this.getXCenterPositionOfRectangle(index2))

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
          this.sqArr[index1] = sq2;
          this.sqArr[index2] = sq1;

          this.renderer.render(this.scene, this.camera);
          resolve(); // Resolve the promise when the square reaches the target position
        }
      };

      animate(); // Start the animation loop
    });
  }

  moveSquareHorizontalyToPosition(number: number, originalPosIndex: number, finalPosIndex: number): Promise<void> {
    return new Promise((resolve) => {
      const sq = this.getSquareByNumber(number);

      if (!sq) {
        console.error(`Square at index ${originalPosIndex} does not exist.`);
        resolve();
        return;
      }

      let xLeftToMove = Math.abs(this.getXCenterPositionOfRectangle(originalPosIndex) - this.getXCenterPositionOfRectangle(finalPosIndex))

      const animate = () => {
        if (Number(xLeftToMove.toFixed(2)) != 0) {
          if (originalPosIndex < finalPosIndex) {
            sq.square.position.x += 0.04;
            sq.numberInSquare.position.x += 0.04;

          } else {
            sq.square.position.x -= 0.04;
            sq.numberInSquare.position.x -= 0.04;
          }

          xLeftToMove = Number((xLeftToMove - 0.04).toFixed(2));
          this.renderer.render(this.scene, this.camera);
          requestAnimationFrame(animate);
        } else {
          resolve(); // Resolve the promise when the square reaches the target position
        }
      }

      animate(); // Start the animation loop
    })
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

  async moveSquaresToCenter(numberArr: number[], paces: number) {
    const promises = [];

    for (let i = numberArr.length - 1; i > -1; i--) {      
      promises.push(this.moveSquareHorizontalyToPosition(numberArr[i], i, paces + i));
    }

    await Promise.all(promises);
  }

  async movesSquaresInLeftArrToOnePaceLeft(numberArr: number[]) {
    const promises = [];

    for (let j = 0; j < numberArr.length; j++) {
      promises.push(this.moveSquareHorizontalyToPosition(numberArr[j], j, j - 1));
    }

    await Promise.all(promises);
  }

  async moveSquaresOnTheRightSideOnePaceLeft(numberArr: number[], i: number) {
    const promises = [];

    for (let j = i + 1; j < numberArr.length; j++) {
      promises.push(this.moveSquareHorizontalyToPosition(numberArr[j], j, j - 1));
    }

    await Promise.all(promises);
  }

 findSquareIndexByNumber(number: number) {
  return this.sqArr.findIndex(sq => sq.hasOwnProperty(number))
 }

 getSquareByNumber(number: number) {
  return this.sqArr.find(sq => sq.hasOwnProperty(number))[number]
 }

 getSquareByIndex(index: number) {  
  return this.sqArr[index][this.sortData.data[index]];
 }

 private async sort(numbersArr: number[]) {
  const direction = this.sortData.sortType;

  if (numbersArr.length <= 1) {
    return numbersArr;
  }

  numbersArr.forEach(e => {
    (this.getSquareByNumber(e).square.material as THREE.MeshBasicMaterial).color.set(0xeb4034);
  })

  await this.moveSquareUp(numbersArr[0]);
  this.renderer.render(this.scene, this.camera);

  let p = numbersArr[0];
  let left = [];
  let right = [];
  let pivotIndex = 0;

  for (let i = 1; i < numbersArr.length; i++) {
    await this.moveSquareUp(numbersArr[i]);
    if (direction === 'ASC') {
      if (numbersArr[i] <= p) {
        await this.moveSquareHorizontalyToPosition(numbersArr[i], i, (left.length - 1));
        await this.moveSquaresOnTheRightSideOnePaceLeft(numbersArr, i);
        
        if (this.findSquareIndexByNumber(numbersArr[0]) > 0) {
          await this.movesSquaresInLeftArrToOnePaceLeft(
            this.sortData.data.slice(0, this.findSquareIndexByNumber(numbersArr[0]))
            .map(Number)
          );
        }
        await this.moveSquareDown(numbersArr[i]);

        const number = numbersArr[i];
        const square = this.sqArr.splice(i, 1)[0];
        this.sqArr.splice(left.length, 0, square);
        this.sortData.data.splice(left.length, 0, this.sortData.data.splice(i, 1)[0]);

        left.push(number);
        pivotIndex++;
      } else {
        await this.moveSquareDown(numbersArr[i]);
        right.push(numbersArr[i]);
      }
    } else {
      if (numbersArr[i] >= p) {
        left.push(numbersArr[i]);
      } else {
        right.push(numbersArr[i]);
      }
    }

  }  
  
  numbersArr.forEach(e => {    
    (this.getSquareByNumber(e).square.material as THREE.MeshBasicMaterial).color.set(0x000000);
  })
  this.renderer.render(this.scene, this.camera);

  await this.moveSquareDown(numbersArr[0]);

  await this.moveSquaresToCenter(numbersArr, left.length);

  return [...(await this.sort(left)), p, ...(await this.sort(right))];
}
}
