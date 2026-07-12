import mongoose from "mongoose";

const chunkSchema = new mongoose.Schema({
  documentId: String,
  chunkText: String,
  embedding: [Number],
});

export default mongoose.model("Chunk", chunkSchema);