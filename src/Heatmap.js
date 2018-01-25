import React from 'react';
import ReactHeatmap from 'react-heatmap';


class Heatmap extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            width: this.getPageWidth(),
			height: this.getpageHeight(),
        }
    }
    
    componentWillReceiveProps(nextProps) {
        this.sanitizeData(nextProps.data);
	}
     
    sanitizeData(dataArray){
        var heatMapData = [];
        var i;
        var type;
        for(i = 0; i < dataArray.length; i++){
            type = dataArray[i].type;
            if(type === 'click'){
                let x = parseInt(dataArray[i].xPosition,10);
                let y = parseInt(dataArray[i].yPosition,10);
                heatMapData.push({x:x,y:y,value:1});
            }
        }
        this.setState({data : heatMapData});
    }
    
    getPageWidth() {
		var pageWidth = window.innerWidth;
		return pageWidth !== undefined && pageWidth !== 0 ? pageWidth : window.innerWidth;
	}

	getpageHeight() {
		var pageHeight = window.innerHeight;
		return pageHeight !== undefined && pageHeight !== 0 ? pageHeight : window.innerHeight;
	}



    render(){
       return (
            <div style={{ width: this.state.width, height: this.state.height }}>
                <ReactHeatmap max={5} data={this.state.data} unit={"pixels"} />
            </div>
        );
    }

}

export default Heatmap;