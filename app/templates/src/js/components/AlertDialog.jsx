import React from 'react';
import { Modal } from 'react-bootstrap';

class AlertDialog extends React.Component {
	render () {
		return (
			<Modal show={this.props.text !== ''} onHide={e => this.props.actions.setAlertText('')}>
				<Modal.Header closeButton>
						<Modal.Title> </Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<p>{this.props.text}</p>
				</Modal.Body>
			</Modal>
		);
	}
}

AlertDialog.propTypes = {
	actions: React.PropTypes.object.isRequired,
	text: React.PropTypes.string
};

AlertDialog.defaultProps = {
	text: ''
};

export default AlertDialog;
