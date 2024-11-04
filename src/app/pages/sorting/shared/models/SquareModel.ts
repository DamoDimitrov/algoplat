import {Line, Mesh} from "three";

export class SquareModel {
  square: Line<any>;
  numberInSquare: Mesh;
  originalPosition: {x: number, y: number}
}
