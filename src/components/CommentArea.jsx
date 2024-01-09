import { Component } from "react";
import CommentList from "./CommentList";
import AddComment from "./AddComment";
import Loading from "./Loading";
import Error from "./Error";

class CommentArea extends Component {
	state = {
		comments: [],
		isLoading: true,
		isError: false,
	};

	fetchBooks = async () => {
		try {
			let response = await fetch("https://striveschool-api.herokuapp.com/api/comments/" + this.props.asin, {
				headers: {
					Authorization:
						"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxYzc1MjBkOGEyMDAwMThhNDhhMzQiLCJpYXQiOjE3MDQ3MjMyNzYsImV4cCI6MTcwNTkzMjg3Nn0.bh5SMrFd56OxmRKmQ8fRDM4rVt8VvY3OToSP3bMaXMA",
				},
			});
			console.log(response);
			if (response.ok) {
				let comments = await response.json();
				this.setState({ comments: comments, isLoading: false, isError: false });
			} else {
				this.setState({ isLoading: false, isError: true });
			}
		} catch (error) {
			console.log(error);
			this.setState({ isLoading: false, isError: true });
		}
	};

	/* componentDidMount = () => {
		this.fetchBooks();
	}; */

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.asin !== this.props.asin) {
			// se siamo qui dentro significa che è cambiata la selezione nel menu a tendina
			this.fetchBooks();
			console.log("Prop diversa ==> nuova fetch");
		}
	}

	render() {
		return (
			<div className="text-center">
				{this.props.asin == null ? (
					<h3>Clicca per vedere i commenti</h3>
				) : (
					<>
						{this.state.isLoading && <Loading />}
						{this.state.isError && <Error />}
						<AddComment asin={this.props.asin} />
						<CommentList commentsToShow={this.state.comments} />
					</>
				)}
			</div>
		);
	}
}

export default CommentArea;
