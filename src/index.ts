import express from "express";
// import bodyParser from "body-parser";
import Imoptima from "./Imoptima";
import fileUpload, {UploadedFile} from 'express-fileupload'
import fetch from 'node-fetch';

const app = express();
const port = 3003;

// app.use(
//   bodyParser.urlencoded({
//     extended: true
//   })
// );
// app.use(bodyParser.json());
app.use(fileUpload());

app.get("/", (_, res) => {
  res.send(
    "<form ref='uploadForm'       id='uploadForm'       action='http://localhost:3003/upload'       method='post'       encType='multipart/form-data'>        <input type='file' name='sampleFile' />        <input type='submit' value='Upload!' />    </form>"
  );
});

app.post("/upload", async (req, res) => {
  res.type("image/png")
  const file:any = req.files.sampleFile;
  const imageReader = new Imoptima(undefined, file.data)
  imageReader.resize(200, 200);
  const result = await imageReader.save();
  res.send(result);
});

app.get("/img",async (req, res)=>{
  const result = await fetch("https://images.unsplash.com/photo-1494548162494-384bba4ab999?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80")
  res.type('image/png');
  res.send(await result.buffer());
})

app.listen(port, () =>
  console.log(`server is running at http://localhost:${port}`)
);
