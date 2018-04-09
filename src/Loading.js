import React, {Component} from 'react';
import ReactLoading from 'react-loading'; 

class Loading extends Component{
        constructor(props){
            super(props);
            this.state = {
                type : props.type,
                color : props.color,
                height : props.height,
                width : props.width,
                style : {
                    fontFamily: 'Trench',
                    fontSize: 25,
                    textAlign: 'center',
                    color: '#73AD21'
                }
            }
        }
      
        render(){
           return(
           <div>
               <div style={this.state.style}> Loading... </div>
               <ReactLoading type={this.state.type} color={this.state.color} height={this.state.height} width={this.state.width}/>
           </div>
            );
        }

}

export default Loading;