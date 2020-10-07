import React, {Component} from "react";
import {connect} from "react-redux";
import {addBook} from "../../actions";
import BookForm from "./BookForm";


class BookAdd extends Component {

    // formValue is built-in argument in handleSubmit which returns value of Field component
    onSubmit = formValues => {
        // console.log(formValues)

        this.props.addBook(formValues);

        // we don't need to use function event.preventDefault(), it's build-in into handleSubmit method
    }

    render() {
        // console.log(this.props)

        return (
            <div>
                <h3>Add Book</h3>
                <BookForm
                    onSubmit={this.onSubmit}
                />
            </div>
        );
    }
}


export default connect(
    null,
    {addBook}
)(BookAdd);