import bodyParser from 'body-parser';
import cors from "cors";
import express from "express";
import { addProductsApi } from "./src/api/products/products.api.ts";
import { syncAllIndexes } from "./src/db/db-context.ts";
import { useDb } from "./src/db/use-db.ts";

const app = express();
const PORT = 4300;

// Middleware برای پردازش JSON
app.use(bodyParser.json());

// لیست اوریجین‌های مجاز (می‌تواند یک یا چند دامنه باشد)
const allowedOrigins = ["http://localhost:4200"]; // دامنه فرانت‌اند

app.use(cors({
  origin: function (origin, callback) {
    // اگر origin وجود ندارد (مثلاً برای curl یا server-to-server)، اجازه بده
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true // مهم برای ارسال کوکی یا Authorization header
}));


addProductsApi(app);

// OPTIONS preflight
app.options("/", cors({
  origin: allowedOrigins,
  allowedOrigins: allowedOrigins,
  methods: ["GET", "POST", "OPTIONS"],
  credentials: true
}));

bootstrap();

async function bootstrap() {
  await useDb();

  await syncAllIndexes();

  // راه‌اندازی سرور
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0:${PORT}`);
  });
}
