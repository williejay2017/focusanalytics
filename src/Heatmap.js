import React from 'react';
import ReactHeatmap from 'react-heatmap';


class Heatmap extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            dataVersion: props.dataVersion,
            width: this.getPageWidth(),
			height: this.getpageHeight(),
        }
    }
    
    componentWillReceiveProps(nextProps) {
        if (nextProps.dataVersion > this.state.dataVersion) {
            this.setState({ 
                data: nextProps.data, 
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



    render(){
        console.log(this.props.data);
        return (
            <div style={{ width: this.state.width, height: this.state.height }}>
                <ReactHeatmap max={5} data={this.state.data} unit={"pixels"} />
            </div>
        );
    }

}

export default Heatmap;