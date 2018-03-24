import React, {Component} from 'react';
import styled from 'styled-components';
import Header from '../Components/header';

const Main = styled.main`
  text-align: center;
`;

const Text = styled.p`
  font-size: large;
`;

class Home extends Component {
	static async getInitialProps({req, res, match, history, location, ...ctx}) {
		return {stuff: 'whatevs'};
	}
	render() {
		return (
			<Main>
				<Header/>
				<Text>
          To get started, edit
					<code>src/Pages/Home.js</code> or <code>src/Pages/About.js</code>and save to
          reload.
				</Text>
			</Main>
		);
	}
}

export default Home;
