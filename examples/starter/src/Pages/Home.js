import React, {Component} from 'react';
import './home.css';
import Header from '../Components/header';

class Home extends Component {
	static async getInitialProps({req, res, match, history, location, ...ctx}) {
		return {stuff: 'whatevs'};
	}
	render() {
		return (
			<main className="main">
				<Header/>
				<p className="text">
          To get started, edit
					<code>src/Pages/Home.js</code> or <code>src/Pages/About.js</code>and save to
          reload.
				</p>
			</main>
		);
	}
}

export default Home;
