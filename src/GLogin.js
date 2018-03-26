import React from 'react';
import { GoogleLogin } from 'react-google-login';
import TiSocialGooglePlus from 'react-icons/lib/ti/social-google-plus';

class GLogin extends React.Component {

    constructor(props) {
        super(props);
    }

    

    render() {
        return (
            <div>
                <TiSocialGooglePlus/> 
                <GoogleLogin clientId="409348125285-qeok48229lefoet8fs00iu21r420via9.apps.googleusercontent.com" className="google-login" scope="profile"
                    autoLoad={false} fetchBasicProfile={true} onSuccess={this.props.responseGoogle} onFailure={this.props.responseGoogle} buttonText={"Login with Google"} />
            </div>
        );
    }

}

export default GLogin; 