import React from 'react';
import Loading from './Loading.js';
import FBLogin from './FBLogin.js';
import GLogin from './GLogin.js';
import TiLockClosedOutline from 'react-icons/lib/ti/lock-closed-outline';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: props.text,
            emailID: props.emailID,
            password: props.password,
            isLoading: props.isLoading,
            
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({emailID: nextProps.emailID, 
                       password: nextProps.password, 
                       isLoading: nextProps.isLoading});
    }

    render() {
        var loadClass = 'displayLoginLoading';
        if (!this.state.isLoading) {
            loadClass = 'displayNone';
        }
        return (
            <form onSubmit={this.props.handleAuthorization}>
                <div className='loginContainer'>
                    <div className={loadClass}>
                        <Loading type='spin' color='#73AD21' height='100px' width='80px'/>
                    </div>
                    <h3>{this.state.text}</h3>
                    <div className='loginData'>
                        <input
                            type="email"
                            name="email"
                            value={this.state.emailID}
                            placeholder="Enter Email"
                            onChange={this.props.handleEmailChange}/>
                        <br/>
                        <input
                            type="password"
                            name="password"
                            value={this.state.password}
                            placeholder="Enter Password"
                            onChange={this.props.handlePasswordChange}/>
                        <br/>
                        <br/>
                        <TiLockClosedOutline/>
                        <input type="submit" value="Secured Login"/>
                        <br/>
                        <br/>
                        
                        <div className="strike">
                            <span>or</span>
                        </div>
                        <br/>
                        <FBLogin responseFacebook={this.props.responseFacebook} />
                        <br/>
                        <GLogin responseGoogle={this.props.responseGoogle}/>
                    </div>
                </div>

            </form>

        );
    }
}

export default Login;