
const express = require("express");
const app = express();
const path = require("path");
const ejs = require("ejs");

app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" });
})

app.get("/download", async (req, res) => {
    const filePath = path.join(__dirname, "templates", "example.html.ejs");

    try {
        const htmlContent = await ejs.renderFile(filePath, {});

        res.set({
            "Content-Type": "text/html",
            "Content-Disposition": `attachment; filename="example.html"`,
            "Content-Length": Buffer.byteLength(htmlContent),
        });

        res.send(htmlContent);
    } catch (err) {
        console.log(err)
        res.status(500).send("Internal Server Error");
    }
});

app.listen(3000, () => {
    console.log('Listening on http://localhost:3000')
});
