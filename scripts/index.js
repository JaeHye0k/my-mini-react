import express from "express";
import path from "path";
import { fileURLToPath } from "url";

// import.meta.url -> file://E:/my-mini-react/scripts/index.js
// fileURLToPath -> file://E:/my-mini-react/scripts/index.js -> E:/my-mini-react/scripts/index.js
const __filename = fileURLToPath(import.meta.url);
// path.dirname -> E:/my-mini-react/scripts/index.js -> E:/my-mini-react/scripts
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 9999;

// 프로젝트 루트 전체를 정적 파일로 서빙
// E:\my-mini-react\scripts\.. -> E:\my-mini-react
app.use(express.static(path.join(__dirname, "..")));

// 루트 경로에서 examples/index.html로 리디렉션
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../examples/index.html"));
});

app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
    console.log(`📁 Serving files from examples directory`);
});
