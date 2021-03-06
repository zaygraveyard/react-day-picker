import React from 'react';
import moment from 'moment';

import DayPicker, { DateUtils } from '../../../src';

import '../../../src/style.css';

export default class InputField extends React.Component {

  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.showCurrentDate = this.showCurrentDate.bind(this);
  }

  state = {
    value: moment().format('L'), // The value of the input field
    month: new Date(), // The month to display in the calendar
  };

  showCurrentDate() {
    this.refs.daypicker.showMonth(this.state.month);
  }

  handleInputChange(e) {
    const { value } = e.target;

    // Change the current month only if the value entered by the user
    // is a valid date, according to the `L` format
    if (moment(value, 'L', true).isValid()) {
      this.setState({
        month: moment(value, 'L').toDate(),
        value,
      }, this.showCurrentDate);
    } else {
      this.setState({ value }, this.showCurrentDate);
    }
  }

  handleDayClick(e, day) {
    this.setState({
      value: moment(day).format('L'),
      month: day,
    });
  }

  render() {
    const selectedDay = moment(this.state.value, 'L', true).toDate();

    return (
      <div>
        <p>
          <input
            ref="input"
            type="text"
            value={this.state.value}
            placeholder="YYYY-MM-DD"
            onChange={this.handleInputChange}
            onFocus={this.showCurrentDate}
          />
        </p>
        <DayPicker
          ref="daypicker"
          initialMonth={this.state.month}
          selectedDays={day => DateUtils.isSameDay(selectedDay, day)}
          onDayClick={this.handleDayClick}
        />
      </div>
    );
  }

}
