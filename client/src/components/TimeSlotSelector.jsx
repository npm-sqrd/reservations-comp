import React from 'react';
import PropTypes from 'prop-types';

import TimeSlot from './TimeSlot';

import styles from './styles/TimeSlotSelector.css';

const TimeSlotSelector = (props) => {
  const timeSlots = props.availabilityInfo.reduce((acc, item) =>
    acc + (item.remaining >= props.party
      ? 1
      : 0), 0);

  let timeSlotMessage;
  if (timeSlots === 0) {
    timeSlotMessage = 'We\'re sorry, no tables are available';
  } else if (timeSlots > 1) {
    timeSlotMessage = `${timeSlots} time slots available!`;
  } else {
    timeSlotMessage = 'Hurry, only 1 time slot available!';
  }

  return (
    <div className={styles.container}>
      <div className={styles.bookingsToday}>
        <span role="img" aria-label="upward trend chart">📈 </span>
        Booked { props.bookingsMadeToday } times today!
      </div>
      <div className={styles.availableSlots}>
        <span role="img" aria-label="clock face seven o'clock">🕖 </span>
        { timeSlotMessage }
      </div>
      <div className={styles.timeSlotBox}>
        { props.availabilityInfo.map(res => (<TimeSlot
          key={res.time}
          time={res.time}
          available={res.remaining >= props.party}
          clickHandler={props.clickHandler}
        />)) }
      </div>
    </div>);
};


TimeSlotSelector.propTypes = {
  party: PropTypes.number.isRequired,
  bookingsMadeToday: PropTypes.number.isRequired,
  availabilityInfo: PropTypes.arrayOf(PropTypes.object).isRequired,
  clickHandler: PropTypes.func.isRequired,
};

export default TimeSlotSelector;
