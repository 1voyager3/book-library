import React, {Component} from "react";
import {connect} from "react-redux";
import {fetchBook} from "../../actions";


class BookShow extends Component {

    componentDidMount() {
        this.props.fetchBook(this.props.match.params.id)
    }


    render() {
        // console.log(this.props.book)

        if (!this.props.book) {
            return <div>Loading ...</div>
        }
        return (
            <div>
                <div className="ui item">
                    <div className="ui small left floated image">
                        <img src={this.props.book.imageLink} alt={this.props.book.title}/>
                    </div>
                    <div className="content">
                        <h3>{this.props.book.title}</h3>
                        <div>
                            <span>Author:</span>
                            <span><h5>{this.props.book.author}</h5></span>
                        </div>
                        <br/>
                        <div className="description">
                            Description:
                             <p>{this.props.book.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {

    return {book: state.books[ownProps.match.params.id]}
}


export default connect(
    mapStateToProps,
    {fetchBook}
)(BookShow);