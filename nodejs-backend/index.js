
const express = require("express");
const app = express();
const path = require("path");
const ejs = require("ejs");
const cors = require("cors");
const archiver = require("archiver");

app.use(cors());

app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" });
})

app.get("/download", async (req, res) => {
    const indexHtmlTemplatePath = path.join(__dirname, "templates", "index.html.ejs");

    try {
        res.setHeader("Content-Type", "application/zip")
        res.setHeader("Content-Disposition", 'attachment; filename="rendered_files.zip"');

        const archive = archiver("zip", { zlib: { level: 9 } });
        archive.pipe(res);

        const html = await ejs.renderFile(indexHtmlTemplatePath, {})
        archive.append(html, { name: "index.html" })

        await archive.finalize()
    } catch (err) {
        console.log(err)
        res.status(500).send("Internal Server Error");
    }
});

app.listen(3000, () => {
    console.log('Listening on http://localhost:3000')
});
