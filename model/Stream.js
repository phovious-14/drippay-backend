import mongoose from "mongoose";

const streamSchema = new mongoose.Schema({
    streamName: { type: String, required: true },
    senderWalletAddress: { type: String, required: true },
    senderName: { type: String, required: true },
    receiverWalletAddress: { type: String, required: true },
    receiverName: { type: String, required: true },
    streamStatus: { type: String, required: true, default: "inactive", enum: ["active", "inactive", "completed", "paused", "cancelled"] },
    streamStartTime: { type: Date, required: true },
    streamEndTime: { type: Date, required: true },
    amount: { type: String, required: true },
    flowRate: { type: String, required: true },
    documentURL: { type: String },
    streamStartTxHash: { type: String },
    streamStoppedTxHash: { type: String },
});

const Stream = mongoose.model("Stream", streamSchema);

export default Stream;
