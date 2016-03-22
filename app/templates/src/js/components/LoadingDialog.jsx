import React from 'react';
import { Modal } from 'react-bootstrap';

class LoadingDialog extends React.Component {
	render () {
		return (
			<Modal show={this.props.isLoading}>
				<Modal.Header closeButton>
						<Modal.Title>Loading</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<p>Please Wait...</p>
				</Modal.Body>
			</Modal>
		);
	}
}

LoadingDialog.propTypes = {
	isLoading: React.PropTypes.bool
};

LoadingDialog.defaultProps = {
	isLoading: false
};

export default LoadingDialog;
