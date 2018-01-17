import React from 'react';
import { Link } from 'react-router-dom'
import TypeForm from '../typeForm'

const Home = ({user_id,isLoggedin,handleLogout}) => {
	return (
		<div>
			{isLoggedin &&
				<div style={{marginTop:'50px'}}>
					<h1>
						Embedded typeform 
						<Link to="/" onClick={handleLogout} style={{float:'right'}}>Logout</Link>
					</h1>
					<TypeForm user_id={user_id} />
				</div>
			}
		</div>
	)
}

export default Home;