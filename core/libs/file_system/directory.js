const fs = require('fs')
const path = require('path')

function getDirectories(sourcePath) {
    return fs.readdirSync(sourcePath)
            .filter(file => fs.lstatSync(path.join(sourcePath, file)).isDirectory())
}

function getFiles(sourcePath) {
    return fs.readdirSync(sourcePath)
            .filter(file => fs.lstatSync(path.join(sourcePath, file)).isFile())
}

module.exports = {
    getDirectories, getFiles
}