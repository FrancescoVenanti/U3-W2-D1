import { Component } from "react";
import { Card } from "react-bootstrap";

class SingleBook extends Component {
	/* state = {
		selected: false,
	}; */

	render() {
		return (
			<>
				<Card
					onClick={() => {
						/* this.setState({ selected: !this.state.selected }); */
						this.props.setAsinState(this.props.book.asin);
					}}
					style={{ border: this.props.asin === this.props.book.asin ? "3px solid red" : "3px solid #efefef" }}
				>
					<Card.Img variant="top" src={this.props.book.img} />
					<Card.Body>
						<Card.Title style={{ color: "black" }}>{this.props.book.title}</Card.Title>
					</Card.Body>
				</Card>
			</>
		);
	}
}

export default SingleBook;
