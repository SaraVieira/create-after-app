const { Component } = require('ink')
const TextInput = require('ink-text-input')
const Spinner = require('ink-spinner')
const SelectInput = require('ink-select-input')
const Exec = require('./src/exec.js')
const copydir = require('copy-dir')

const current = process.cwd()

const install = yarn => {
  if (yarn) {
    return 'yarn && yarn add @jaredpalmer/after'
  }
  return 'npm i && npm i @jaredpalmer/after'
}

const items = [{
  label: 'Basic Template',
  value: 'starter'
}, {
  label: 'Basic + Styled Components SSR',
  value: 'styled'
}, {
  label: 'Third',
  value: 'third'
}]

class SearchQuery extends Component {
  constructor (props) {
    super(props)
    this.handleDir = this.handleDir.bind(this)
    this.handleChangeDir = this.handleChangeDir.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.state = {
      dir: this.props.children[0] || null,
      input: ''
    }
  }

  handleChangeDir (val) {
    this.setState({tempDir: val})
  }

  handleDir (val) {
    this.setState({dir: val})
  }

  async handleSelect (item) {
    const {dir} = this.state

    this.setState({
      loading: 'Getting Files'
    })

    await copydir.sync(`./examples/${item.value}/`, `${current}/${dir}`)

    this.setState({
      loading: 'Installing dependencies'
    })

    Exec(`cd ${dir} && ${install(this.props.yarn)}`, (err, response) => {
      if (!err) {
        this.setState({
          loading: null,
          done: true
        })
        console.log(`
Go to folder
  $ cd ${dir}

Start your new project
  $ yarn start
`)
        process.exit()
      } else {
        console.log(err)
      }
    })
  }

  render (props, state) {
    const {dir, loading, tempDir, done} = this.state
    if (loading) {
      return <div><Spinner green/> {loading}</div>
    }
    if (done) {
      return null
    }
    return (
      <div>
        {!dir ? (
          <div>
           Where to create the project? {' '}

            <TextInput
              value={tempDir || ''}
              onSubmit={this.handleDir}
              onChange={this.handleChangeDir}
            />
          </div>
        ) : null}
        {dir && (
          <div>
            Template:

            <SelectInput items={items} onSelect={this.handleSelect}/>
          </div>
        )}
      </div>
    )
  }
}

module.exports = SearchQuery
