import React, {Component} from "react";
import {connect} from "react-redux";
import {fetchBook, editBook} from "../../actions";
import BookForm from "./BookForm";


class BookEdit extends Component {

    // first of all we need to call action creator fetchBook
    componentDidMount() {
        this.props.fetchBook(this.props.match.params.id)
    }

    // secondly to call action creator editBook when we click on the button Submit
    onSubmit = (formValues) => {
        this.props.editBook(
            this.props.match.params.id,
            formValues
        )
    }

    render() {
        // all of the this.props are coming from react-router-dom lib
        // we can see all this props because it was rendered
        // the component <Route path="/books/edit/:id" exact component={BookEdit}/> in App.js
        // react-router-dom lib automatically add a bunch of different props through component={BookEdit}
        // console.log(this.props);

        if (!this.props.book) {
            return <div>Loading...</div>
        }

        return (
            <div>
                <h3> Edit a Book</h3>
                <BookForm
                    // initialValues is very special property name
                    // title and description are names in Field component in BookForm.js
                    /* initialValues={{
                    //     title: 'Change me', description: " Change description"
                    */
                    initialValues={this.props.book}
                    onSubmit={this.onSubmit}
                />
            </div>
        )
    }
}

// second argument ownProps is equal to this.props in our BookEdit component
// to get access to this.props we need to use second argument ownProps
const mapStateToProps = (state, ownProps) => {

    return { book: state.books[ownProps.match.params.id]}

}

export default connect(
    mapStateToProps, {
        fetchBook,
        editBook
    })(BookEdit);