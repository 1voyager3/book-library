import React, {Component, Fragment} from "react";
import Modal from "../Modal";
import history from "../../history";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {fetchBook, deleteBook} from "../../actions";


class BookDelete extends Component {

    componentDidMount() {
        console.log(this.props);
        this.props.fetchBook(this.props.match.params.id);
    }

    renderActions() {

        // destruction of const  id = this.props.match.params.id
        const { id } = this.props.match.params

        // JSX syntax
        return (
            // React.Fragment uses to avoid the div wrapping for acton buttons to be correctly positioned
            // or use "<> </>" - shortcut of Fragment
            // but preferably to use <Fragment></Fragment> because some tools can show the error of some code checkers
            <Fragment>
                <button
                    className="ui button negative"
                    onClick={ () => this.props.deleteBook(id)}
                >
                    Delete
                </button>
                <Link
                    className="ui button"
                    to="/"
                >
                    Cancel
                </Link>
            </Fragment>
        )
    }

    renderContent() {
        if (!this.props.book) {
            return "Are you sure you want to delete this Book?"
        }
        return `Are you sure you want to delete this book with title: ${this.props.book.title}?`
    }

    render() {
        return (
            <Modal
                title="Delete Book"
                content={this.renderContent()}
                actions={this.renderActions()}
                onDismiss={() => history.push('/')}
            />
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return { book: state.books[ownProps.match.params.id] }
}

export default connect(
    mapStateToProps, {
        fetchBook,
        deleteBook
    })(BookDelete);