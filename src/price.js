import React from 'react';
import Priceimg from './images/Price.png';

class Price extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showPrice: false
        }
    }
    handleClick = () => {
        this.setState((prevState) => ({
            showPrice: !prevState.showPrice
        }))
    }
    render() {
        const { showPrice } = this.state;
        return (
            <div onClick={this.handleClick}>
                <img src={Priceimg} />
                {
                    showPrice && <h3>{this.props.value}</h3>
                }
            </div>
        )
    }
}
export default Price;