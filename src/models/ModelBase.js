import promisify from 'es6-promisify'
import {omit} from 'ramda'
import {uid} from '../helpers'
import sortKeys from 'sort-keys'

const fs = window.require('fs')
const assert = window.require('assert')
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)
const existsFile = (path) => new Promise((resolve) => {
  fs.stat(path, (err) => err ? resolve(false) : resolve(true))
})
const {join} = require('path')

class ModelBase {
  constructor (name) {
    const {projectDir} = window.globals
    this.isLoaded = false
    this.path = join(projectDir, name)
    this.data = null
  }

  async load () {
    if (this.isLoaded) {
      return
    }
    const exists = await existsFile(this.path)
    if (exists) {
      const data = (await readFile(this.path))
      this.data = JSON.parse(String(data))
    } else {
      console.log(`File ${this.path} is not found. Create a new file.`)
      await this.update({})
    }
    this.isLoaded = true
  }

  getWhole () {
    return this.data
  }

  get (key) {
    return this.data[key] || null
  }

  // Merge data
  async update (data = {}) {
    this.data = Object.assign({}, this.data, data)
    await this._sync()
  }

  async create (data) {
    const id = uid()
    const created = {id, ...data}
    await this.update({[id]: created})
    return created
  }

  async delete (key) {
    this._assertData()
    this.data = omit(key)(this.data)
    await this._sync()
  }

  async _sync () {
    this.data = sortKeys(this.data)
    const dataStr = JSON.stringify(this.data, null, '  ')
    await writeFile(this.path, dataStr)
  }

  async _assertData () {
    assert.ok(this.data)
  }
}

export default ModelBase
