import React from 'react';
import ReactHeatmap from './react-heatmap';
let data = [{ x: 10, y: 15, value: 5}, { x: 50, y: 50, value: 2}];

class Heatmap extends React.Component{




    render(){
        return (
            <div>
                <ReactHeatmap max={5} data={data} />
            </div>
        );
    }

}