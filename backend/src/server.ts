import dotenv from "dotenv";
import app from "./app";

dotenv.config();

const port = Number(process.env.PORT) || 5000;
const nodeEnv = process.env.NODE_ENV || "development";

app.listen(port, () => {
  console.log("========================================");
  console.log("🚀 LendPay API Started Successfully");
  console.log(`🌍 Environment: ${nodeEnv}`);
  console.log("📡 Server running on:");
  console.log(`http://localhost:${port}`);
  console.log("========================================");
});
