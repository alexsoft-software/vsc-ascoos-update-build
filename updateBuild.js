const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

function activate(context) {
    let disposable = vscode.workspace.onDidSaveTextDocument((document) => {
        const filePath = document.fileName;
        const fileContent = document.getText();
        
        const config = vscode.workspace.getConfiguration('ascoosUpdateBuild');
        const startingBuild = config.get('startingBuild', 1);

        // Ανάγνωση του τελευταίου build αριθμού από το lastBuild.json
        const workspaceFolders = vscode.workspace.workspaceFolders;
        const workspacePath = workspaceFolders ? workspaceFolders[0].uri.fsPath : path.dirname(filePath);
        const versionsPath = path.join(workspacePath, '.versions');
        if (!fs.existsSync(versionsPath)) {
            fs.mkdirSync(versionsPath, { recursive: true });
        }
        
        const lastBuildFilePath = path.join(versionsPath, 'lastBuild.json');
        const lastBuildData = fs.existsSync(lastBuildFilePath) ? JSON.parse(fs.readFileSync(lastBuildFilePath, 'utf8')) : {};
        const lastBuildNumber = lastBuildData.lastBuildNumber || startingBuild;

        // Αντικατάσταση των @build και @updated
        const buildMatch = fileContent.match(/@build\s*:\s*(\d+)/);
        const buildNumber = buildMatch ? Math.max(parseInt(buildMatch[1], 10) + 1, lastBuildNumber + 1) : lastBuildNumber + 1;
        const updatedDate = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') + ' UTC+2';
        
        const newContent = fileContent
            .replace(/@build\s*:\s*\d+/, `@build               : ${buildNumber}`)
            .replace(/@updated\s*:\s*[\d-]+\s+[\d:]+\s+UTC\+\d+/, `@updated             : ${updatedDate}`);
        
        // Ενημέρωση του αρχείου
        fs.writeFileSync(filePath, newContent, 'utf8');

        // Ενημέρωση του αρχείου builds.json
        const buildsFilePath = path.join(versionsPath, 'builds.json');
        const buildsData = fs.existsSync(buildsFilePath) ? JSON.parse(fs.readFileSync(buildsFilePath, 'utf8')) : {};
        buildsData[buildNumber] = updatedDate;
        fs.writeFileSync(buildsFilePath, JSON.stringify(buildsData, null, 2), 'utf8');

        // Ενημέρωση του τελευταίου build αριθμού στο lastBuild.json
        lastBuildData.lastBuildNumber = buildNumber;
        fs.writeFileSync(lastBuildFilePath, JSON.stringify(lastBuildData, null, 2), 'utf8');

        // Δημιουργία αντιγράφου στο φάκελο .repos
        const reposPath = path.join(workspacePath, '.repos', path.relative(workspacePath, filePath));
        const fileDir = path.dirname(reposPath);
        if (!fs.existsSync(fileDir)) {
            fs.mkdirSync(fileDir, { recursive: true });
        }

        const copyFileName = `${path.basename(filePath, path.extname(filePath))}-${buildNumber}-${new Date().toISOString().split('T')[0]}${path.extname(filePath)}`;
        const copyFilePath = path.join(fileDir, copyFileName);
        fs.writeFileSync(copyFilePath, newContent, 'utf8');

        // Δημιουργία ή ενημέρωση του αρχείου .vscode/settings.json
        const vscodeSettingsPath = path.join(workspacePath, '.vscode');
        if (!fs.existsSync(vscodeSettingsPath)) {
            fs.mkdirSync(vscodeSettingsPath, { recursive: true });
        }

        const settingsFilePath = path.join(vscodeSettingsPath, 'settings.json');
        const settingsData = fs.existsSync(settingsFilePath) ? JSON.parse(fs.readFileSync(settingsFilePath, 'utf8')) : {
            "files.exclude": {}
        };

        if (!settingsData["files.exclude"][".versions/**"]) {
            settingsData["files.exclude"][".versions/**"] = true;
        }
        if (!settingsData["files.exclude"][".repos/**"]) {
            settingsData["files.exclude"][".repos/**"] = true;
        }

        fs.writeFileSync(settingsFilePath, JSON.stringify(settingsData, null, 2), 'utf8');
    });

    context.subscriptions.push(disposable);
}

exports.activate = activate;

function deactivate() {}

exports.deactivate = deactivate;
