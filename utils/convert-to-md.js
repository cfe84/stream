const fs = require("fs")
const path = require("path")

const inputFile = process.argv[2]
const outputFolder = process.argv[3]

if (!inputFile || !outputFolder) {
  console.error("Usage: convert-to-md [INPUTFILE] [OUTPUTFOLDER]")
}

const content = fs.readFileSync(inputFile)
const notesObject = JSON.parse(content).notes
const notes = Object.keys(notesObject)
  .map(key => notesObject[key])
  .sort((noteA, noteB) => noteA.date.localeCompare(noteB.date))
  .map(note => ({
    date: note.date.substr(0, 16).replace("T", "-").replace(/:/g, "-"),
    dateReadable: note.date.substr(0, 16).replace("T", " "),
    content: note.content
  }))

notes.forEach(note => {
  const content = `---\ntitle: "${note.dateReadable}"\n---\n\n${note.content}`
  const outputFile = path.join(outputFolder, note.date + ".md")
  fs.writeFileSync(outputFile, content)
})