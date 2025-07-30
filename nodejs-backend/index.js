
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
    const { projectName, nodeVersion, typescript } = req.query

    if (!projectName || !nodeVersion || !typescript) {
        return res.status(400).json({
            error: "Missing required query parameters"
        })
    }

    const isValidProjectName = typeof projectName === "string" && projectName.trim().length > 0;
    const isValidNodeVersion = typeof nodeVersion === "string" && !isNaN(Number(nodeVersion));
    const isValidTypescript = typescript === "true" || typescript === "false";

    if (!isValidProjectName || !isValidNodeVersion || !isValidTypescript) {
        return res.status(400).json({
            error: "Invalid query parameters"
        });
    }

    const indexHtmlTemplatePath = path.join(__dirname, "templates", "index.html.ejs");
    const packageJsonTemplatePath = path.join(__dirname, "templates", "package.json.ejs");
    const appTsxTemplatePath = path.join(__dirname, "templates", "App.tsx.ejs");
    const indexCssTemplatePath = path.join(__dirname, "templates", "index.css.ejs");
    const mainTsxTemplatePath = path.join(__dirname, "templates", "main.tsx.ejs");
    const nvmrcTemplatePath = path.join(__dirname, "templates", '.nvmrc.ejs')
    const tsconfigTemplatePath = path.join(__dirname, "templates", "tsconfig.json.ejs")
    const jsxFileExtension = typescript === "true" ? "tsx" : "jsx";

    try {
        res.setHeader("Content-Type", "application/zip")
        res.setHeader("Content-Disposition", `attachment; filename="${projectName}.zip"`);

        const archive = archiver("zip", { zlib: { level: 9 } });
        archive.pipe(res);

        const html = await ejs.renderFile(indexHtmlTemplatePath, { typescript })
        archive.append(html, { name: "index.html" })

        const packageJson = await ejs.renderFile(packageJsonTemplatePath, { projectName, typescript })
        archive.append(packageJson, { name: "package.json" })

        const appTsx = await ejs.renderFile(appTsxTemplatePath, { typescript })
        archive.append(appTsx, { name: `src/App.${jsxFileExtension}` })

        const indexCss = await ejs.renderFile(indexCssTemplatePath, {})
        archive.append(indexCss, { name: "src/index.css" })

        const mainTsx = await ejs.renderFile(mainTsxTemplatePath, { typescript })
        archive.append(mainTsx, { name: `src/main.${jsxFileExtension}` })

        const nvmrc = await ejs.renderFile(nvmrcTemplatePath, { nodeVersion })
        archive.append(nvmrc, { name: ".nvmrc" })

        if (typescript === true || typescript === "true") {
            const tsconfig = await ejs.renderFile(tsconfigTemplatePath, {});
            archive.append(tsconfig, { name: "tsconfig.json" });
        }
        await archive.finalize()
    } catch (err) {
        console.log(err)
        res.status(500).send("Internal Server Error");
    }
});

app.listen(3000, () => {
    console.log('Listening on http://localhost:3000')
});
