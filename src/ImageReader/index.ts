import * as fs from "fs";
import { Sharp } from "sharp";
const sharp = require("sharp");

class ImageReader {
  private readStream: fs.ReadStream;
  private writeStream: fs.WriteStream;
  private transform: Sharp;
  constructor(path: string) {
    this.transform = sharp();
    this.readStream = fs.createReadStream(path);

    this.readStream.on("error", function(err: Error) {
      console.error("ReadStream err:", err.message);
    });
  }

  resize(width: number, height?: number) {
    this.transform.resize(width, height);
  }

  async save(to: string) {
    this.writeStream = fs.createWriteStream(to);
    this.writeStream.on("error", function(err: Error) {
      console.error("WriteStream err:", err.message);
    });

    this.readStream.pipe(this.transform).pipe(this.writeStream);
  }
}

export default ImageReader;
