const childProcess = require("child_process");
const express = require("express");
const bodyParser = require("body-parser");
const { info, error } = console;

async function exec(...cmd) {
    info(...cmd);
    return new Promise((resolve, reject) => {
        childProcess.execFile(cmd.shift(), cmd, (error, stdout, stderr) => {
            if (error) {
                reject(error);
            } else {
                let out = (stdout + stderr).trim();
                info(out);
                resolve(out);
            }
        });
    });
}

async function pullGit() {
    info("Pulling repository...");
    let pullResult = await exec("git", "pull");
    if (pullResult !== "Already up to date.") {
        info("Reloading docker-compose");
        await exec("docker-compose", "up", "--remove-orphans", "--detach", "--build");
    }
}

(async () => {

    await pullGit();

    let remotes = await exec("git", "remote", "-v");
    let gitUrl = /origin\t(?<url>.*) /.exec(remotes).groups.url;
    info("Git URL:", gitUrl);

    let app = express();
    app.use(bodyParser.json());
    app.post("/", async (request, response) => {
        response.end();
        let repository = request.body.repository || {};
        if (repository.ssh_url === gitUrl || repository.html_url === gitUrl) {
            pullGit().catch(e => error("Error pulling git:", e));
        }
    });

    let port = process.env.HTTP_PORT || 8080
    app.listen(port, () => info("Listening on port", port));

})().catch(e =>
    error("Error:", e)
)