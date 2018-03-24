import React from 'react'
import Header from '../Components/header'
import styled from 'styled-components'

const Main = styled.main`
  text-align: center;
`

class About extends React.Component {
  static async getInitialProps ({ req, res, match, history, location, ...ctx }) {
    return { stuff: 'more stuffs' }
  }
  render () {
    return (
      <Main>
        <Header />
        {this.props.stuff ? <div>about</div> : null}
      </Main>
    )
  }
}

export default About
