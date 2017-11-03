import React from 'react';
import ReactHeatmap from './react-heatmap';


class Heatmap extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            dataVersion: props.dataVersion,
            width: this.getPageWidth(),
            height: this.getpageHeight(),
            key: 0,
            display: props.display
        }
    }
    
    componentWillReceiveProps(nextProps) {
        var newWidth = this.getPageWidth();
		var newHeight = this.getpageHeight();
		if (newWidth !== this.state.width || newHeight !== this.state.height) {
            this.setState({
                width: newWidth, 
                height: newHeight
            });
        }

        if (nextProps.display !== this.state.display) {
            this.setState({ 
                display: nextProps.display, 
                key: this.state.key + 1 
            }); 
		}
        
        if (nextProps.dataVersion > this.state.dataVersion) {
            this.setState({ 
                data: this.displayData(nextProps.data), 
                dataVersion: nextProps.dataVersion 
            });
		}
    }
    
    getPageWidth() {
		var pageWidth = document.body.scrollWidth;
		return pageWidth !== undefined && pageWidth !== 0 ? pageWidth : window.innerWidth;
	}

	getpageHeight() {
		var pageHeight = document.body.scrollHeight;
		return pageHeight !== undefined && pageHeight !== 0 ? pageHeight : window.innerHeight;
	}

    displayData(dataArray) {
        if (!dataArray.length) 
            {
			    return dataArray;
            }
            //TODO
    }



    render(){
        return (
            <div>
                <ReactHeatmap max={5} data={this.state.data} unit={"pixels"} />
            </div>
        );
    }

}