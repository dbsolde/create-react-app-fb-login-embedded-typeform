import React from 'react';
import { ReactTypeformEmbed } from 'react-typeform-embed';
import './typeForm.css'

const typeForm = ({user_id}) => {
	return (
		<div className="type-form">
			{user_id &&
				<ReactTypeformEmbed url={`https://demo.typeform.com/to/FS5ylM?user_id=${user_id}`} />
			}
		</div>
	)
}

export default typeForm;