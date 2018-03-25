exports.install = yarn => yarn ? 'yarn && yarn add @jaredpalmer/after' : 'npm i && npm i @jaredpalmer/after'


exports.options = [{
    label: 'Basic Template',
    value: 'starter'
}, {
    label: 'Basic + Styled Components SSR',
    value: 'styled'
}, {
    label: 'Apollo Starter',
    value: 'apollo'
}]

exports.doneText = dir => `
You all set 🚀🎉

Go to folder
 $ cd ${dir}

Start your new project
 $ yarn start
`
