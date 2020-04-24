import * as fs from "fs";
import { Sharp } from "sharp";
const sharp = require("sharp");

class Imoptima {
  private readStream: fs.ReadStream;
  private writeStream: fs.WriteStream;
  private transform: Sharp;

  constructor(path?: string, buffer?: Buffer) {
    this.transform = sharp();
    if (path) {
      this.readStream = fs.createReadStream(path);
      this.readStream.on("error", function(err: Error) {
        console.error("ReadStream err:", err.message);
      });
    } else if (buffer){
      this.transform = sharp(buffer);
    }
  }

  resize(width: number, height?: number) {
    this.transform.resize(width, height);
  }

  async save(to?: string) {
    // this.writeStream = fs.createWriteStream(to);
    // this.writeStream.on("error", function(err: Error) {
    //   console.error("WriteStream err:", err.message);
    // });

    // this.readStream.pipe(this.transform).pipe(this.writeStream);
    return await this.transform.toBuffer()
  }
}

export default Imoptima;
