import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { createRequire } from "module";
import { chunkText } from "../services/chunkServices.js";
import ChunkModel from '../models/ChunkModel.js'
import getEmbedding from '../services/embeddingService.js'
import askDeepSeek from '../services/deepseekService.js'

const require = createRequire(import.meta.url);
const pdf = require("pdf-parse");
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.post("/upload", upload.single("file"), async (req, res) => {

});

export const uploadfile = async() =>{
      try {
    const buffer = fs.readFileSync(req.file.path);

    const pdfData = await pdf(buffer);

    const chunks = chunkText(pdfData.text);

    for (const chunk of chunks) {
  const embedding = await getEmbedding(chunk);

  await ChunkModel.create({
    documentId: req.file.filename,
    chunkText: chunk,
    embedding,
  });
}

    res.json({
      message: "File uploaded successfully",
      file: req.file,
      pages: pdfData.numpages,
      text: pdfData.text,
      chunks: chunks.length
    });
  } catch (error) {
    console.error(error);
    console.error("PDF Parse Error:", error);
    res.status(500).json({ error: error.message });
  }
}

export const askquestion = async (req, res) => {
  try {
    const { question } = req.body;

    const queryEmbedding = await getEmbedding(question);

    const chunks = await ChunkModel.find();

    const scoredChunks = chunks.map((chunk) => ({
      text: chunk.chunkText,
      score: cosineSimilarity(
        queryEmbedding,
        chunk.embedding
      ),
    }));

    scoredChunks.sort((a, b) => b.score - a.score);

    const topChunks = scoredChunks.slice(0, 3);

    const context = topChunks
      .map((chunk) => chunk.text)
      .join("\n\n");

    const answer = await askDeepSeek(question, context);

    res.json({
      answer,
      contextUsed: topChunks,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error.message,
    });
  }
};

export const cosineSimilarity = (a, b) => {
  const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);

  const magA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const magB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));

  return dot / (magA * magB);
};



export default router;