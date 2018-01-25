import React from 'react';

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
            text: props.text
        }
    }

   
    render(){
        return(
            <form onSubmit={this.props.handleAuthorization}>
                <div className='loginContainer'>
                    <h3>{this.state.text}</h3>
                    <div className='loginData'>
                        <input type="text" value={this.state.value} placeholder = "Email" />
                        <br/>
                        <input type="password" value={this.state.value} placeholder = "Password" />
                        <br/>
                        <input type="submit" value="Secured Login" />
                        </div>
                </div>
                    
            </form>
            
        );
    }
}

export default Login;