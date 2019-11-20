import React from 'react';
import Calendar from 'react-calendar';
import calendar from './images/calendar.png';

class CalendarComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showCalendar: false,
            date: props.item.createdOn
        };
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.item.createdOn != prevState.date) {
            return {
                date: nextProps.item.createdOn
            }
        }
    }
    handleCalendar(value, itemId) {
        this.props.handleStateChange(value, itemId);
        this.getCalendar();
    }
    getCalendar = () => {
        this.setState((prevState) => ({
            showCalendar: !prevState.showCalendar
        }))
    }
    render() {
        const { showCalendar, date } = this.state;
        const { item } = this.props;
        return (
            <React.Fragment>
                <div onClick={this.getCalendar}>
                    <img src={calendar} />
                    Schedule Again
            </div>
                {
                    showCalendar && <Calendar onChange={(value) => this.handleCalendar(value, item.id)} value={new Date(date)} />
                }
            </React.Fragment>
        )
    }
}

export default CalendarComponent;