import React from "react";
import 'semantic-ui-css/semantic.min.css'
import { Router, Route, Switch } from "react-router-dom";
import BookList from "./books/BookList";
import BookShow from "./books/BookShow";
import BookAdd from "./books/BookAdd";
import BookEdit from "./books/BookEdit";
import BookDelete from "./books/BookDelete";
import Header from "./Header";
import history from "../history";


const App = () => {
    return (
        <div className="ui container">
            <Router history={history}>
                <div>
                    <Header />
                    {/*Switch component is going to look at all these different Routes and it is going to show
                    only one of this given Routes for any path we are going to. It uses to avoid
                    duplication of path="/streams/new" and path="/streams/:id" where ":id" is going
                    to be any variable name
                    */}
                    <Switch>
                        <Route path="/" exact component={BookList}/>
                        <Route path="/books/add" exact component={BookAdd}/>
                        {/*
                            path="/streams/edit/:id" is URL-based selection
                            :id is a variable, in our case stream.id defined in StreamList.js
                            after colon ":" can be any appropriate value name, for instance: "id, name, title and so on"
                            "/streams/edit/" is the key
                            ":" is syntax between key and value
                            "id" is the value
                            */}
                        <Route path="/books/edit/:id" exact component={BookEdit}/>
                        <Route path="/books/delete/:id" exact component={BookDelete}/>
                        <Route path="/books/:id" exact component={BookShow}/>
                    </Switch>

                </div>
            </Router>
        </div>
    )
};

export default App;