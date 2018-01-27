const fs = require('fs')
const {promisify} = require('util')
const assert = require('assert')
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)
const existsFile = (path) => new Promise((resolve) => {
  fs.stats(path, (err) => err ? resolve(false) : resolve(true))
})
const {join} = require('path')
const getProjectDir = require('../helpers/getProjectDir')

class ModelBase {
  constructor (name) {
    const projectDir = getProjectDir()
    this.path = join(projectDir, name)
    this.data = null
  }

  async load () {
    const exists = await existsFile(this.path)
    if (exists) {
      const data = await readFile(this.path)
      this.data = JSON.parse(String(data))
    } else {
      console.log(`File ${this.path} is not found. Create a new file.`)
      await this.update({})
    }
  }

  get (key) {
    return this.data[key] || null
  }

  // Merge data
  async update (data = {}) {
    this._assertData()
    this.data = Object.assign({}, this.data, data)
    await this._sync()
  }

  async delete (key) {
    this._assertData()
    const data = Object.assign({}, this.data)
    delete data[key]
    this.data = data
    await this._sync()
  }

  async _sync () {
    await writeFile(this.path, this.data)
  }

  async _assertData () {
    assert.ok(this.data)
  }
}

module.exports = ModelBase
