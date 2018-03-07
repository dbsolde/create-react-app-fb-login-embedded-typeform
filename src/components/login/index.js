/* global FB */

import React, { Component } from 'react';
import './style.css'
import { facebook } from '../../config';
import Home from '../home/';

export default class Login extends Component {
	state = {
		isLoggedin: false,
		user_id: ''
	}
	componentDidMount(){
        (function (d, s, id) {
        	const element = d.getElementsByTagName(s)[0];
        	const fjs = element;
        	let js = element;
        	if (d.getElementById(id)) {return;}
        	js = d.createElement(s); js.id = id;
        	js.src = '//connect.facebook.net/en_US/sdk.js';
        	fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
        
        window.fbAsyncInit = function() {
            FB.init({
              appId      : facebook.appId,
              cookie     : true,
              xfbml      : true,
              version    : 'v2.9'
            });
        };
    }
    
    responseApi = (authResponse) => {
		FB.api('/me', function(response) {
			console.log('User details: ' + response);
		});
    };

    checkLoginState = (response) => {
    	console.log(response,'response')
    	if (response.status === 'connected') {
    		this.setState({
    			isLoggedin: true,
    			user_id: response.authResponse.userID
    		})
    		this.responseApi(response.authResponse);
    	}else{
    		console.log('Something went wrong...')
    	}
    };

	loginHandler = () => {
		FB.login(this.checkLoginState, { scope: 'email,user_work_history,user_education_history,user_location,public_profile' });
	};

   
    handleLogout = () => {
    	this.setState({ isLoggedin: false });
    };

	render() {
		const { isLoggedin, user_id } = this.state;
		return (
			<div className="login-page">
				{!isLoggedin && 
					<div>
						<h1 style={{padding:'40px 0 30px 0'}}>Hi There!</h1>
						<p>Welcome ae! To continue please login using your facebook account!</p>
						<button onClick={this.loginHandler} className="loginBtn loginBtn--facebook" style={{marginTop:'20px'}}>
							Login with Facebook
						</button>

                        <div className="fb-customerchat" page_id="134215830737500"></div>
					</div>
				}

				{isLoggedin &&
					<Home user_id={user_id} isLoggedin={isLoggedin} handleLogout={this.handleLogout} />
				}
			</div>
		)
	}
}