import { QuickSortAnimationComponent } from "../pages/sorting/shared/animation/quick-sort-animation.component";

export class Algorithms {
  //Sorting
  static quickSort(arr: number[], direction: string): number[] {
    if (arr.length <= 1) {
      return arr;
    }

    let p = arr[0];
    let left = [];
    let right = [];

    for (let i = 1; i < arr.length; i++) {
      if(direction === 'ASC') {
        if (arr[i] <= p) {
          left.push(arr[i]);
        } else {
          right.push(arr[i]);
        }
      } else {
        if (arr[i] >= p) {
          left.push(arr[i]);
        } else {
          right.push(arr[i]);
        }
      }
    }

    return [...this.quickSort(left, direction), p, ...this.quickSort(right, direction)];
  }

  static bubbleSort(arr: number[]): number[] {
    let isSwapped: boolean;
    do {
      isSwapped = false;
      for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] > arr[i + 1]) {
          const t = arr[i];
          arr[i] = arr[i + 1];
          arr[i + 1] = t;
          isSwapped = true;
        }
      }
    } while (isSwapped);

    return arr;
  }

  static mergeSort(arr: number[]): number[] {
    if (arr.length <= 1) {
      return arr;
    }

    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);

    const merge = (leftArr: number[], rightArr: number[]): number[] => {
      const merged: number[] = [];
      let leftIndex = 0;
      let rightIndex = 0;

      while (leftIndex < leftArr.length && rightIndex < rightArr.length) {
        if (leftArr[leftIndex] < rightArr[rightIndex]) {
          merged.push(leftArr[leftIndex]);
          leftIndex++;
        } else {
          merged.push(rightArr[rightIndex]);
          rightIndex++;
        }
      }

      return merged.concat(
        leftArr.slice(leftIndex),
        rightArr.slice(rightIndex)
      );
    };

    return merge(this.mergeSort(left), this.mergeSort(right));
  }

  //Searching
  static sequentialSearch(arr: number[], target: number): number {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === target) {
        return i;
      }
    }
    return -1;
  }

  static binarySearch(arr: number[], target: number): number {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      if (arr[mid] === target) {
        return mid; // Element found, return its index
      } else if (arr[mid] < target) {
        left = mid + 1; // Search the right half
      } else {
        right = mid - 1; // Search the left half
      }
    }

    return -1; // Element not found
  }

  //Recursive
  static factorial(n: number): number {
    if (n === 0) {
      return 1;
    }

    return n * this.factorial(n - 1);
  }

  static fibonacci(n: number): number {
    if (n === 0) {
      return 0;
    }
    if (n === 1) {
      return 1;
    }

    return this.fibonacci(n - 1) + this.fibonacci(n - 2);
  }

  //Hashing
  static md5Hash(input: string): string {
    return MD5.hash(input);
  }

  static sha1Hash(input: string): string {
    return SHA1.hash(input);
  }

  static sha256Hash(input: string): string {
    return SHA256.hash(input);
  }

  //Randomizing
  static monteCarloIntegration(
    func: (x: number) => number,
    a: number,
    b: number,
    numSamples: number
  ): number {
    let sum = 0;

    for (let i = 0; i < numSamples; i++) {
      const x = a + Math.random() * (b - a);

      sum += func(x);
    }

    const average = sum / numSamples;
    const integral = (b - a) * average;

    return integral;
  }

  static lasVegasQuicksort(arr: number[]): number[] {
    if (arr.length <= 1) {
      return arr;
    }

    const pivotIndex = Math.floor(Math.random() * arr.length);
    const pivot = arr[pivotIndex];

    const left = [];
    const right = [];

    for (let i = 0; i < arr.length; i++) {
      if (i === pivotIndex) {
        continue;
      }

      if (arr[i] < pivot) {
        left.push(arr[i]);
      } else {
        right.push(arr[i]);
      }
    }

    const sortedLeft = this.lasVegasQuicksort(left);
    const sortedRight = this.lasVegasQuicksort(right);

    return [...sortedLeft, pivot, ...sortedRight];
  }
}

//Simple implementations of Hashing algorithms
class MD5 {
  private static readonly S: number[] = [
    7, 12, 17, 22, 5, 9, 14, 20, 4, 11, 16, 23, 6, 10, 15, 21,
  ];

  private static readonly K: number[] = [
    0xd76a478, 0xe8c7b756, 0x242070db, 0xc1bdceee, 0xf57c0faf, 0x4787c62a,
    0xa8304613, 0xfd469501, 0x698098d8, 0x8b44f7af, 0xffff5bb1, 0x895cd7be,
    0x6b901122, 0xfd987193, 0xa679438e, 0x49b40821, 0xf61e2562, 0xc040b340,
    0x265e5a51, 0xe9b6c7aa, 0xd62f105d, 0x02441453, 0xd8a1e681, 0xe7d3fbc8,
    0x21e1cde6, 0xc33707d6, 0xf4d50d87, 0x455a14ed, 0xa9e3e905, 0xfcefa3f8,
    0x676f02d9, 0x8d2a4c8a, 0xfffa3942, 0x8771f681, 0x6d9d6122, 0xfde5380c,
    0xa4beea44, 0x4bdecfa9, 0xf6bb4b60, 0xbebfbc70, 0x289b7ec6, 0xeaa127fa,
    0xd4ef3085, 0x04881d05, 0xd9d4d039, 0xe6db99e5, 0x1fa27cf8, 0xc4ac5665,
    0xf4292244, 0x432aff97, 0xab9423a7, 0xfc93a039, 0x655b59c3, 0x8f0ccc92,
    0xffeff47d, 0x85845dd1, 0x6fa87e4f, 0xfe2ce6e0, 0xa3014314, 0x4e0811a1,
    0xf7537e82, 0xbd3af235, 0x2ad7d2bb, 0xeb86d391,
  ];

  private static leftRotate(x: number, n: number): number {
    return (x << n) | (x >>> (32 - n));
  }

  static hash(input: string): string {
    let message = Buffer.from(input, 'utf8');
    const originalLengthBits = message.length * 8;

    // Padding
    message = Buffer.concat([message, Buffer.from([0x80])]);
    while ((message.length * 8) % 512 !== 448) {
      message = Buffer.concat([message, Buffer.from([0x00])]);
    }
    message = Buffer.concat([message, Buffer.alloc(8)]);
    message.writeUInt32LE(originalLengthBits, message.length - 4);

    let A = 0x67452301;
    let B = 0xefcdab89;
    let C = 0x98badcfe;
    let D = 0x10325476;

    for (let i = 0; i < message.length; i += 64) {
      const chunk = message.slice(i, i + 64);

      let a = A;
      let b = B;
      let c = C;
      let d = D;

      for (let j = 0; j < 64; j++) {
        let F: number;
        let g: number;

        if (j < 16) {
          F = (b & c) | (~b & d);
          g = j;
        } else if (j < 32) {
          F = (d & b) | (~d & c);
          g = (5 * j + 1) % 16;
        } else if (j < 48) {
          F = b ^ c ^ d;
          g = (3 * j + 5) % 16;
        } else {
          F = c ^ (b | ~d);
          g = (7 * j) % 16;
        }

        const X = message.readUInt32LE(g * 4);
        const temp = d;
        d = c;
        c = b;
        b = b + MD5.leftRotate(a + F + X + MD5.K[j], MD5.S[j]);
        a = temp;
      }

      A += a;
      B += b;
      C += c;
      D += d;
    }

    const hash = Buffer.alloc(16);
    hash.writeUInt32LE(A, 0);
    hash.writeUInt32LE(B, 4);
    hash.writeUInt32LE(C, 8);
    hash.writeUInt32LE(D, 12);

    return hash.toString('hex');
  }
}

class SHA1 {
  private static leftRotate(n: number, b: number): number {
    return (n << b) | (n >>> (32 - b));
  }

  static hash(input: string): string {
    const message = Buffer.from(input, 'utf8');

    let H0 = 0x67452301;
    let H1 = 0xefcdab89;
    let H2 = 0x98badcfe;
    let H3 = 0x10325476;
    let H4 = 0xc3d2e1f0;

    const padding = Buffer.alloc(64);
    padding.fill(0x00);
    padding.writeUInt8(0x80, 0);
    const originalLengthBits = message.length * 8;
    padding.writeUInt32BE(originalLengthBits, 56);

    const blocks = [];
    let currentBlock = Buffer.alloc(64).fill(0);
    let currentBlockLength = 0;

    for (let i = 0; i < message.length; i++) {
      currentBlock[currentBlockLength++] = message[i];

      if (currentBlockLength === 64) {
        blocks.push(currentBlock.slice());
        currentBlock.fill(0);
        currentBlockLength = 0;
      }
    }

    const lastBlock = Buffer.concat([
      currentBlock,
      padding.slice(0, 64 - currentBlockLength),
    ]);

    for (const block of [...blocks, lastBlock]) {
      const words = new Array(80);

      for (let i = 0; i < 16; i++) {
        words[i] = block.readUInt32BE(i * 4);
      }

      for (let i = 16; i < 80; i++) {
        words[i] = SHA1.leftRotate(
          words[i - 3] ^ words[i - 8] ^ words[i - 14] ^ words[i - 16],
          1
        );
      }

      let [A, B, C, D, E] = [H0, H1, H2, H3, H4];

      for (let i = 0; i < 80; i++) {
        let f: number, k: number;

        if (i < 20) {
          f = (B & C) | (~B & D);
          k = 0x5a827999;
        } else if (i < 40) {
          f = B ^ C ^ D;
          k = 0x6ed9eba1;
        } else if (i < 60) {
          f = (B & C) | (B & D) | (C & D);
          k = 0x8f1bbcdc;
        } else {
          f = B ^ C ^ D;
          k = 0xca62c1d6;
        }

        const temp =
          (SHA1.leftRotate(A, 5) + f + E + k + words[i]) & 0xffffffff;
        E = D;
        D = C;
        C = SHA1.leftRotate(B, 30);
        B = A;
        A = temp;
      }

      H0 = (H0 + A) & 0xffffffff;
      H1 = (H1 + B) & 0xffffffff;
      H2 = (H2 + C) & 0xffffffff;
      H3 = (H3 + D) & 0xffffffff;
      H4 = (H4 + E) & 0xffffffff;
    }

    const hash = Buffer.alloc(20);
    hash.writeUInt32BE(H0, 0);
    hash.writeUInt32BE(H1, 4);
    hash.writeUInt32BE(H2, 8);
    hash.writeUInt32BE(H3, 12);
    hash.writeUInt32BE(H4, 16);

    return hash.toString('hex');
  }
}

class SHA256 {
  private static readonly K: number[] = [
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1,
    0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
    0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174, 0xe49b69c1, 0xefbe4786,
    0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147,
    0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
    0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85, 0xa2bfe8a1, 0xa81a664b,
    0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a,
    0x5b9cca4f, 0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
    0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
  ];

  private static leftRotate(n: number, b: number): number {
    return (n >>> b) | (n << (32 - b));
  }

  static hash(input: string): string {
    const message = Buffer.from(input, 'utf8');

    // Initialize variables
    let H0 = 0x6a09e667;
    let H1 = 0xbb67ae85;
    let H2 = 0x3c6ef372;
    let H3 = 0xa54ff53a;
    let H4 = 0x510e527f;
    let H5 = 0x9b05688c;
    let H6 = 0x1f83d9ab;
    let H7 = 0x5be0cd19;

    // Padding
    const padding = Buffer.alloc(64);
    padding.fill(0x00);
    padding.writeUInt8(0x80, 0);
    const originalLengthBits = message.length * 8;
    padding.writeUInt32BE(originalLengthBits >>> 32, 56);
    padding.writeUInt32BE(originalLengthBits & 0xffffffff, 60);

    // Process the message in 512-bit blocks
    const blocks = [];
    let currentBlock = Buffer.alloc(64).fill(0);
    let currentBlockLength = 0;

    for (let i = 0; i < message.length; i++) {
      currentBlock[currentBlockLength++] = message[i];

      if (currentBlockLength === 64) {
        blocks.push(currentBlock.slice());
        currentBlock.fill(0);
        currentBlockLength = 0;
      }
    }

    // Append the padding to the last block
    const lastBlock = Buffer.concat([
      currentBlock,
      padding.slice(0, 64 - currentBlockLength),
    ]);

    // Process each block
    for (const block of [...blocks, lastBlock]) {
      const words = new Array(64);

      for (let i = 0; i < 16; i++) {
        words[i] = block.readUInt32BE(i * 4);
      }

      for (let i = 16; i < 64; i++) {
        const s0 =
          SHA256.leftRotate(words[i - 15], 7) ^
          SHA256.leftRotate(words[i - 15], 18) ^
          (words[i - 15] >>> 3);
        const s1 =
          SHA256.leftRotate(words[i - 2], 17) ^
          SHA256.leftRotate(words[i - 2], 19) ^
          (words[i - 2] >>> 10);
        words[i] = (words[i - 16] + s0 + words[i - 7] + s1) & 0xffffffff;
      }

      let [a, b, c, d, e, f, g, h] = [H0, H1, H2, H3, H4, H5, H6, H7];

      for (let i = 0; i < 64; i++) {
        const S1 =
          SHA256.leftRotate(e, 6) ^
          SHA256.leftRotate(e, 11) ^
          SHA256.leftRotate(e, 25);
        const ch = (e & f) ^ (~e & g);
        const temp1 = (h + S1 + ch + SHA256.K[i] + words[i]) & 0xffffffff;
        const S0 =
          SHA256.leftRotate(a, 2) ^
          SHA256.leftRotate(a, 13) ^
          SHA256.leftRotate(a, 22);
        const maj = (a & b) ^ (a & c) ^ (b & c);
        const temp2 = (S0 + maj) & 0xffffffff;

        h = g;
        g = f;
        f = e;
        e = (d + temp1) & 0xffffffff;
        d = c;
        c = b;
        b = a;
        a = (temp1 + temp2) & 0xffffffff;
      }

      H0 = (H0 + a) & 0xffffffff;
      H1 = (H1 + b) & 0xffffffff;
      H2 = (H2 + c) & 0xffffffff;
      H3 = (H3 + d) & 0xffffffff;
      H4 = (H4 + e) & 0xffffffff;
      H5 = (H5 + f) & 0xffffffff;
      H6 = (H6 + g) & 0xffffffff;
      H7 = (H7 + h) & 0xffffffff;
    }

    // Combine the final hash
    const hash = Buffer.alloc(32);
    hash.writeUInt32BE(H0, 0);
    hash.writeUInt32BE(H1, 4);
    hash.writeUInt32BE(H2, 8);
    hash.writeUInt32BE(H3, 12);
    hash.writeUInt32BE(H4, 16);
    hash.writeUInt32BE(H5, 20);
    hash.writeUInt32BE(H6, 24);
    hash.writeUInt32BE(H7, 28);

    return hash.toString('hex');
  }
}
