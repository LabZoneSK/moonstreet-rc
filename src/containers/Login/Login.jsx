import React from 'react';
import { connect } from "react-redux";
import { auth } from "../../firebase.jsx";


class Login extends React.Component {
    
    constructor() {
        super();
        this.email = '';
        this.password = '';

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            errorMsg: ''
        }
    }

    handleEmailChange(event) {
         this.email = event.target.value;
    }

    handlePasswordChange(event) {
        this.password = event.target.value;
    }

    handleSubmit = (evt) => {
        evt.preventDefault();
        auth.signInWithEmailAndPassword(this.email, this.password).then(() => {
            // dispatch loading user data

        }).catch((error) => {
            this.setState({errorMsg: error.message});
        });
    }    

    render() {
        return(
            <div className="login">

                <div className="login__form">
                    <form onSubmit={this.handleSubmit}>
                        <h1>MoonStreet</h1>
                        <input type="text" placeholder="username/email" defaultValue={this.props.email} onChange={this.handleEmailChange} /><br />
                        <input type="password" defaultValue={this.props.password} onChange={this.handlePasswordChange} /><br />
                        <button type="submit">Login</button>
                        <p>{this.state.errorMsg}</p>
                    </form>
                </div>
            </div>
        )
    }
}

// container part
const mapStateToProps = (state) => {
    return {
        ...state
    };
};

export default connect ( mapStateToProps ) (Login);
