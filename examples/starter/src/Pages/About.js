import React from 'react';
import Header from '../Components/header';
import './about.css';

class About extends React.Component {
	static async getInitialProps({req, res, match, history, location, ...ctx}) {
		return {stuff: 'more stuffs'};
	}
	render() {
		return (
			<main className="main">
				<Header/>
				{this.props.stuff ? <div>about</div> : null}
			</main>
		);
	}
}

export default About;
