import React from 'react';
class Price extends React.Component {
    constructor(props) {
        super(props);
        
      }
      state = { 
        

     }
    render() {
        return (
            <div>
                <h3>{this.props.value}</h3>
                
            </div>
        );
    }
}
export default Price;