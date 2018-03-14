import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles/SetName.css';

class SetName extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nameVal: '',
    };
  }

  handleButtonClick() {
    if (this.state.nameVal.length > 0) {
      this.props.clickHandler(this.state.nameVal);
      this.setState({
        nameVal: '',
      });
    }
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.handleButtonClick();
    }
  }

  render() {
    const { name } = this.props;
    return (
      <div className={styles.container}>
        {name
        ? (
          <div className={styles.showName}>
            Welcome, {name}!  Let&#8217;s make a reservation!
          </div>)
        : (
          <div>
            <input
              className={styles.input}
              type="text"
              placeholder="Enter Name"
              id="nameInput"
              value={this.state.nameVal}
              onChange={(e) => { this.setState({ nameVal: e.target.value }); }}
              onKeyPress={e => this.handleKeyPress(e)}
            />
            <button
              className={styles.button}
              id="nameButton"
              onClick={() => this.handleButtonClick()}
            >
              Set Name
            </button>
          </div>)
      }
      </div>);
  }
}


SetName.propTypes = {
  name: PropTypes.string.isRequired,
  clickHandler: PropTypes.func.isRequired,
};

export default SetName;
