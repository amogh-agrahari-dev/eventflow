import { createHash } from "crypto";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { file, fileName, contentType } = req.body || {};

    if (!file) {
      return res.status(400).json({ message: "No file provided" });
    }

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
      return res.status(500).json({ message: "Cloudinary environment variables are not configured" });
    }

    const timestamp = Math.round(Date.now() / 1000);
    const safePublicId = (fileName || "")
      .replace(/\.[^.]+$/, "")
      .replace(/[^a-zA-Z0-9._-]+/g, "_");

    const paramsToSign = `folder=eventflow/events&public_id=${safePublicId}&timestamp=${timestamp}`;
    const signature = createHash("sha256")
      .update(paramsToSign + apiSecret)
      .digest("hex");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("api_key", apiKey);
    formData.append("timestamp", String(timestamp));
    formData.append("signature", signature);
    formData.append("folder", "eventflow/events");

    if (safePublicId) {
      formData.append("public_id", safePublicId);
    }

    if (contentType) {
      formData.append("resource_type", "image");
    }

    const uploadResponse = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: formData,
    });

    const data = await uploadResponse.json();

    if (!uploadResponse.ok) {
      throw new Error(data.error?.message || "Cloudinary upload failed");
    }

    return res.status(200).json({
      secure_url: data.secure_url,
      public_id: data.public_id,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Cloudinary upload failed",
    });
  }
}
