
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
    const {
        projectName = "my-react-app",
        nodeVersion = 18
    } = req.query

    const indexHtmlTemplatePath = path.join(__dirname, "templates", "index.html.ejs");
    const packageJsonTemplatePath = path.join(__dirname, "templates", "package.json.ejs");
    const appTsxTemplatePath = path.join(__dirname, "templates", "App.tsx.ejs");
    const indexCssTemplatePath = path.join(__dirname, "templates", "index.css.ejs");
    const mainTsxTemplatePath = path.join(__dirname, "templates", "main.tsx.ejs");
    const nvmrcTemplatePath = path.join(__dirname, "templates", '.nvmrc.ejs')

    try {
        res.setHeader("Content-Type", "application/zip")
        res.setHeader("Content-Disposition", `attachment; filename="${projectName}.zip"`);

        const archive = archiver("zip", { zlib: { level: 9 } });
        archive.pipe(res);

        const html = await ejs.renderFile(indexHtmlTemplatePath, {})
        archive.append(html, { name: "index.html" })

        const packageJson = await ejs.renderFile(packageJsonTemplatePath, { projectName })
        archive.append(packageJson, { name: "package.json" })

        const appTsx = await ejs.renderFile(appTsxTemplatePath, {})
        archive.append(appTsx, { name: "src/App.tsx" })

        const indexCss = await ejs.renderFile(indexCssTemplatePath, {})
        archive.append(indexCss, { name: "src/index.css" })

        const mainTsx = await ejs.renderFile(mainTsxTemplatePath, {})
        archive.append(mainTsx, { name: "src/main.tsx" })

        const nvmrc = await ejs.renderFile(nvmrcTemplatePath, { nodeVersion })
        archive.append(nvmrc, { name: ".nvmrc" })

        await archive.finalize()
    } catch (err) {
        console.log(err)
        res.status(500).send("Internal Server Error");
    }
});

app.listen(3000, () => {
    console.log('Listening on http://localhost:3000')
});
