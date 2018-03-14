import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles/TimeSlot.css';

const TimeSlot = props => (
  <div className={styles.container}>
    <button
      className={styles.button}
      disabled={!props.available}
      onClick={() => props.clickHandler(props.time)}
    >
      {props.time > 12 ? props.time - 12 : props.time}:00 {props.time > 12 ? 'PM' : 'AM'}
    </button>
  </div>
);


TimeSlot.propTypes = {
  time: PropTypes.number.isRequired,
  available: PropTypes.bool.isRequired,
  clickHandler: PropTypes.func.isRequired,
};

export default TimeSlot;
