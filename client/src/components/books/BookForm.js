import React, {Component} from "react";
import {Field, reduxForm} from "redux-form";


// reusable component for BookCreate and BookEdit
class BookForm extends Component {

    //  error, touched are the destructed properties of meta
    renderError({error, touched}) {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">
                        {error}
                    </div>
                </div>
            );
        }
    }

    // formProps is set of properties from Field redux-form component
    // {input} is destruction from formProps
    renderInput = ( {input, label, meta}) => {
        // console.log(formProps)
        // logic to show field with red background in order if the errors show
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`
        return (
            /*
            <input
                onChange={formProps.input.onChange}
                value={formProps.input.value}
            />
             */
            // <input {...input} /> is new syntax equals to above
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete="off"/>
                {/*errors defined below in validate function*/}
                {this.renderError(meta)}
            </div>

        );
    }


    // formValue is built-in argument in handleSubmit which returns value of Field component
    onSubmit = (formValue) => {
        // console.log(formValue)

        this.props.onSubmit(formValue);

        // we don't need to use function event.preventDefault(), it's build-in into handleSubmit method
    }

    render() {
        // console.log(this.props)

        return (
            // handleSubmit is redux-form built-in method (callback function)
            // it can be check in console.log(is.props)
            // if we do not put "error" in className we will not see the error message
            <form
                className="ui form error"
                onSubmit={this.props.handleSubmit(this.onSubmit)}
            >
                <Field
                    name="title"
                    component={this.renderInput}
                    label="Enter Title"
                />
                <Field
                    name="author"
                    component={this.renderInput}
                    label="Enter book Author name"
                />
                <Field
                    name="imageLink"
                    component={this.renderInput}
                    label="Enter book image Link"
                />
                <Field
                    name="description"
                    component={this.renderInput}
                    label="Enter book Description"
                />
                <button className="ui button primary">
                    Submit
                </button>
            </form>
        )
    }
}

// Validation of Form input
const validate = (formValues) => {
    const error = {};

    if (!formValues.title) {
        error.title = 'You must enter a Title!'
    }

    if (!formValues.description) {
        error.description = 'You must enter a Description!'
    }

    return error;

}

export default reduxForm({
    // the value is purpose of the form
    form: 'bookForm',
    validate
})(BookForm);

