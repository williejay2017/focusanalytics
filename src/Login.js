import React from 'react';

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
            text: props.text,
            emailID: props.emailID,
            password: props.password
        }
    }


    componentWillReceiveProps(nextProps) {
        this.setState({emailID: nextProps.emailID,
                       password: nextProps.password});
    }

     render(){
        return(
            <form onSubmit={this.props.handleAuthorization}>
                <div className='loginContainer'>
                    <h3>{this.state.text}</h3>
                    <div className='loginData'>
                        <input type="email" name="email" value={this.state.emailID} placeholder = "Email" onChange={this.props.handleEmailChange} />
                        <br/>
                        <input type="password" name="password" value={this.state.password} placeholder = "Password" onChange={this.props.handlePasswordChange} />
                        <br/>
                        <input type="submit" value="Secured Login" />
                        </div>
                </div>
                    
            </form>
            
        );
    }
}

export default Login;