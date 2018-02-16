import React from 'react';
import FacebookLogin from 'react-facebook-login';
import FaFacebookSquare from 'react-icons/lib/fa/facebook-square';

class FBLogin extends React.Component {
    constructor(props){
        super(props);
    }
   
    render(){
        return(
            <div>
                <FacebookLogin appId='1897166533928236' autoLoad={false} reAuthenticate={true} fields='name,email,picture' scope="public_profile,user_friends,user_actions.books"
                 callback={this.props.responseFacebook} cssClass="my-facebook-button-class" icon={<FaFacebookSquare/>} />
            </div>
        );
    }
}

export default FBLogin;