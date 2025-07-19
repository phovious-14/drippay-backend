import Stream from "../model/Stream.js";
import User from "../model/User.js";

export const createStream = async (req, res) => {
    try {

        console.log(req.body);

        const { txHash, streamName, senderWalletAddress, senderName, receiverWalletAddress, receiverName, streamStartTime, streamEndTime, amount, documentURL, flowRate } = req.body;

        if (!streamStartTime || !streamEndTime) {
            return res.status(400).json({ error: "Stream start time and end time are required" });
        }

        //get privyId from senderWalletAddress
        const senderPrivyId = await User.findOne({ walletAddress: senderWalletAddress });
        if (!senderPrivyId) {
            return res.status(400).json({ error: "Sender not found" });
        }

        if (senderPrivyId.privyId !== req.privyId) {
            return res.status(400).json({ error: "Sender is not authorized" });
        }

        // Calculate duration in seconds between start and end time

        const stream = new Stream({ streamStartTxHash: txHash, streamName, senderWalletAddress, senderName, receiverWalletAddress, receiverName, streamStatus: "active", streamStartTime, streamEndTime, amount, flowRate, documentURL });
        await stream.save();
        res.status(201).json(stream);
    } catch (error) {
        console.error("Error creating stream:", error);
        res.status(500).json({ error: "Failed to create stream: " + error });
    }
};

export const updateStreamStatus = async (req, res) => {
    try {
        const { status, id } = req.body;

        const stream = await Stream.findOne({ _id: id });
        if (!stream) {
            return res.status(400).json({ error: "Stream not found" });
        }

        if (status === "cancelled") {
            await Stream.deleteOne({ _id: id });
            return res.status(200).json({ message: "Stream record deleted successfully!" });
        }

        const { txHash } = req.body;

        const updatedStream = await Stream.findOneAndUpdate({ _id: id }, { $set: { streamStatus: status, streamStartTxHash: txHash } });

        if (!updatedStream) {
            return res.status(400).json({ error: "Stream not found" });
        }

        res.status(200).json(updatedStream);
    } catch (error) {
        console.error("Error updating stream status:", error);
        res.status(500).json({ error: "Failed to update stream status: " + error });
    }
};