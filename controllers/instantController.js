import Instant from "../model/Instant.js";
import Invoice from "../model/invoice.js";
import Stream from "../model/Stream.js";
import crypto from "crypto";

export const createInstant = async (req, res) => {
    try {
        const { invoiceNumber, txHash, payrollName, senderWalletAddress, receiverWalletAddress, receiverName, amount, currency, chainId, documentUrl } = req.body;

        if (!invoiceNumber || !txHash || !payrollName || !senderWalletAddress || !receiverWalletAddress || !receiverName || !amount || !currency || !chainId || !documentUrl) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const invoice = await Invoice.create({ invoiceNumber, documentUrl, invoiceType: "instant", invoiceStatus: "paid" });
        const invoiceData = await invoice.save();

        const newInstant = await Instant.create({ txHash, payrollName, senderWalletAddress, receiverWalletAddress, receiverName, amount, currency, chainId, invoiceId: invoiceData._id });
        await newInstant.save()

        res.status(201).json(newInstant);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getInstant = async (req, res) => {
    const { senderWalletAddress } = req.params;
    try {
        const mergedArray = await Instant.aggregate([
            {
                $match: { senderWalletAddress }
            },
            {
                $lookup: {
                    from: "invoices", // collection name (lowercase)
                    localField: "invoiceId",
                    foreignField: "_id",
                    as: "invoice"
                }
            },
            {
                $unwind: {
                    path: "$invoice",
                    preserveNullAndEmptyArrays: true
                }
            }
        ]);

        res.status(200).json(mergedArray);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
