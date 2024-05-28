const express = require("express");
const ytdl = require("ytdl-core");
const cors = require("cors");
const app = express();
const port = 3001;

const cors = require("cors");

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(express.json());

app.use(cors(corsOptions));

app.post("/download", async (req, res) => {
  const videoUrl = req.body.url;

  if (!ytdl.validateURL(videoUrl)) {
    return res.status(400).send("Invalid URL");
  }

  res.header("Content-Disposition", 'attachment; filename="video.mp4"');
  ytdl(videoUrl, {
    format: "mp4",
  }).pipe(res);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
