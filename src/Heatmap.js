import React from 'react';
import ReactHeatmap from 'react-heatmap';


class Heatmap extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            dataVersion: props.dataVersion,
            width: this.getPageWidth(),
            height: this.getpageHeight(),
            display: props.display,
            key: 0,
            max: 0
        }
    }
    
    componentWillReceiveProps(nextProps) {
        var newWidth = this.getPageWidth();
		var newHeight = this.getpageHeight();
		if (newWidth !== this.state.width || newHeight !== this.state.height) { //when the window has been re-sized
			this.setState({
                display: nextProps.display, 
                key: this.state.key + 1,
                width: newWidth, 
                height: newHeight
			}); 
		}
		
		else if (nextProps.display !== this.state.display) {
            this.setState({ display: nextProps.display, 
                            key: this.state.key + 1 }) 
		}
        
        if (nextProps.dataVersion > this.state.dataVersion) {
            this.setState({ data: this.sanitizeData(nextProps.data), 
                            dataVersion: nextProps.dataVersion 
                        });
		}
        // this.sanitizeData(nextProps.data);
	}
     
    sanitizeData(dataArray){
        if (!dataArray.length) {
			return dataArray;
		}
        var heatMapData = [];
        var i;
        var type;
        var maximum = 0;
        for(i = 0; i < dataArray.length; i++){
            type = dataArray[i].type;
            if(type === 'click'){
                let x = parseInt(dataArray[i].xPosition,10);
                let y = parseInt(dataArray[i].yPosition,10);
                heatMapData.push({x:x,y:y,value:1});
            }
        }
        
        if(heatMapData.length > 200){
			maximum = Math.ceil(heatMapData.length *.05);
		}else{
			maximum = 10.0;
        }
        
        this.setState({ max: maximum });
        return heatMapData;
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
        var heatMapClass = 'displayHeat';
		if (!this.state.display) {
			heatMapClass = 'displayNone';
		}
       return (
            <div className={heatMapClass} style={{ width: this.state.width, height: this.state.height }}>
                <ReactHeatmap max={this.state.max} data={this.state.data} unit={"pixels"} />
            </div>
        );
    }

}

export default Heatmap;