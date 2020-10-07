import React, {Component} from "react";
import {connect} from "react-redux";
import {fetchBooks} from "../../actions";
import {Link} from "react-router-dom";


class BookList extends Component {

    componentDidMount() {
        // console.log(this.props)
        this.props.fetchBooks();
    }

    // method responsible for the button Edit or Delete
    renderAdmin(book) {
        if (book.userId === this.props.currentUserId) {
            return (
                    <div
                        // className="content"
                        // style={{textAlign: 'right'}}
                    >
                        <Link
                            className="ui basic button primary"
                            // in order to use URL-based selection approach
                            // according to Route component with path /books/edit/:id
                            // defined in App.js,  <Route path="/books/edit/:id" exact component={BookEdit}/>
                            to={`/books/edit/${book.id}`}
                        >
                            Edit
                        </Link>
                        <Link
                            className="ui basic button negative"
                            to={`/books/delete/${book.id}`}
                        >
                            Delete
                        </Link>
                    </div>
            )
        }
    }

    renderList() {

        return this.props.books.map( book => {
            return (
                <div key={book.id} style={{margin: "30px"}}>

                    <div
                        className="ui link cards"
                    >
                        <div className="card">
                                <div className="image">
                                        <img
                                            src={book.imageLink}
                                            alt={book.title}
                                        />
                                </div>

                            <div className="content">
                                 <div className="header">
                                     <Link to={`/books/${book.id}`}>
                                            {book.title}
                                     </Link>
                                 </div>
                                <div className="meta">
                                    Author: &nbsp; {book.author}
                                </div>
                                <div className="description">
                                    <Link to={`/books/${book.id}`}>
                                        Description ...
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="extra content" style={{marginTop: "10px"}}>
                        <span >
                            {this.renderAdmin(book)}
                        </span>

                    </div>

                </div>

            )
        })
    }

    // method responsible for a button Create on the home page
    // we do not want to show the button but we want to show
    // the Link react-router-dom component to be direct us to BookAdd component
    renderCreate() {
        if (this.props.isSignedIn) {
            return (
                <div style={{textAlign: 'right'}}>
                    {/*It is Intentional Navigation. User clicks on a Link component*/}
                    <Link
                        to="/books/add"
                        className="ui button primary"
                    >
                        Add Book
                    </Link>
                </div>
            )
        }
    }

    render() {

        // console.log(this.props)

        return (
            <div>
                <h2>Books</h2>
                <div
                    className="ui celled list"
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                    }}
                >
                    {this.renderList()}
                </div>
                {this.renderCreate()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {

    //Object.values is JS built-in function.
    // It takes object (state.books) as an argument,
    // all the different values (like: { title: "Book 1", description: "My new book 1"})
    // inside of this object are pulled out and then inserted into an array,
    // for example, as is in our case:
    /*
    {
        1: { title: "Book 1", description: "My new book 1"},
        2: { title: "Book 2", description: "My new book 2"},
        3: { title: "Book 3", description: "My new book 3"},
    }
     */
    return {
        books: Object.values( state.books ),
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn
    };
}

export default connect(
    mapStateToProps,
    {fetchBooks}
)(BookList);