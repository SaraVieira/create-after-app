const { Component, h, Text } = require('ink')
const TextInput = require('ink-text-input')
const Spinner = require('ink-spinner')
const SelectInput = require('ink-select-input')
const Exec = require('./src/exec.js')
const copydir = require('copy-dir')
const { execAsync } = require('async-child-process')

const { install, options, doneText } = require('./src/constants')

const current = process.cwd()

class CreateAfterApp extends Component {
	constructor(props) {
		super(props)
		this.handleDir = this.handleDir.bind(this)
		this.handleChangeDir = this.handleChangeDir.bind(this)
		this.handleSelect = this.handleSelect.bind(this)
		this.state = {
			dir: this.props.children[0] || null,
			input: ''
		}
	}

	handleChangeDir(val) {
		this.setState({ tempDir: val })
	}

	handleDir(val) {
		this.setState({ dir: val })
	}

	async handleSelect(item) {
		const { dir } = this.state
		const { yarn, git } = this.props;
		this.setState({
			loading: 'Getting Files'
		})

		await copydir.sync(`./examples/${item.value}/`, `${current}/${dir}`)

		this.setState({
			loading: 'Installing dependencies'
		})

		await execAsync(`cd ${dir}`)
		await execAsync(`${install(yarn)}`)
		if (git) await execAsync(`git init`)

		this.setState({
			loading: null,
			done: true
		}, () => process.exit())


	}

	render(props, state) {
		const { dir, loading, tempDir, done } = this.state
		if (loading) {
			return <div><Spinner green /> {loading}</div>
		}
		if (done) {
			return (
				<Text green>
					{doneText(dir)}
				</Text>
			)
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

            <SelectInput items={options} onSelect={this.handleSelect} />
					</div>
				)}
			</div>
		)
	}
}

module.exports = CreateAfterApp
