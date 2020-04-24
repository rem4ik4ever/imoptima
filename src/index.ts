import express from "express";
import bodyParser from "body-parser";
import ImageReader from "ImageReader";

const app = express();
const port = 3003;

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

app.get("/", (_, res) => {
  res.send(
    '<form method="POST"><input name="file" type="file" /><input type="submit"></form>'
  );
});

app.post("/", (req, res) => {
  res.type("image/png")
  console.log(req.body);
  const imageReader = new ImageReader()
  res.send("All good");
});

app.listen(port, () =>
  console.log(`server is running at http://localhost:${port}`)
);
