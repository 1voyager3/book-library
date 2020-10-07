import React, {Component} from "react";
import {connect} from "react-redux";
import {signIn, signOut} from "../actions";


class GoogleOAuth extends Component {

    componentDidMount() {
        // first argument is a module (Google displays confirmation screen to user in popup window) invokes by Google's JS API lib
        // second argument is a callback in our React/Redux app, it invokes by Google's JS API lib
        // the lib is pointed in index.html
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: "886170201545-ogqm3a985b4bva0gp69un8p2p4ij4ce6.apps.googleusercontent.com",
                scope: "email"
            }).then( () => {
                // get our reference to the auth lib itself or auth object
                this.auth = window.gapi.auth2.getAuthInstance();

                // define and pass argument tru or false
                this.onAuthChange(this.auth.isSignedIn.get());

                // to show status isSignedIn or not without refreshing the webpage
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    // because onAuthChange function is called as callback it needs to be bound as arrow function
    onAuthChange = (isSignedIn) => {
        if (isSignedIn) {
            // gapi.auth2.getAuthInstance().currentUser.get().getId()
            // this argument passed to know google user ID in order to be able to get info
            // of created list of media, to create, edit and delete the media
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
    };

    onSignInClick = () => {
        this.auth.signIn();
    }

    onSignOutClick = () => {
        this.auth.signOut();
    }

    // helper method
    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return null;
        } else if (this.props.isSignedIn) {
            return (
                <button
                    onClick={this.onSignOutClick}
                    className="ui blue basic button"
                >
                    <i className="google icon"/>
                    Sign Out
                </button>
            )
        } else {
            return (
                <button
                    onClick={this.onSignInClick}
                    className="ui green basic button"
                >
                    <i className="google icon"/>
                    Sign In with Google
                </button>
            )
        }
    }


    render() {
        // console.log(this.props)
        return (
            <div>
                {this.renderAuthButton()}
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    // console.log(state)
    return { isSignedIn: state.auth.isSignedIn }
}

export default connect(
    mapStateToProps,
    {signIn, signOut}
)(GoogleOAuth);