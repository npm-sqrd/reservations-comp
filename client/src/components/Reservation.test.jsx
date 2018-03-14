import React from 'react';
import { shallow } from 'enzyme';

import Reservation from './Reservation';

jest.mock('../lib/helper');

describe('Reservation Component', () => {
  afterAll(() => {
    jest.unmock('../lib/helper');
  });

  test('should render correctly', () => {
    expect(shallow(<Reservation id={305} />)).toMatchSnapshot();
  });

  test('should setName correctly', () => {
    const component = shallow(<Reservation id={305} />);
    component.instance().setName('Sideshow Bob');
    expect(component.state().name).toBe('Sideshow Bob');
  });

  test('should changeParty correctly', () => {
    const component = shallow(<Reservation id={305} />);
    component.instance().changeParty(4);
    expect(component.state().party).toBe(4);
  });

  describe('getAvailaibilityInfo', () => {
    test('should update state correctly', () => {
      const component = shallow(<Reservation id={305} />);
      component.instance().getAvailabilityInfo('2018-04-01', 17, 2);

      const expected = [
        { time: 17, remaining: 10 },
        { time: 18, remaining: 5 },
        { time: 19, remaining: 0 },
        { time: 20, remaining: 2 },
        { time: 21, remaining: 20 },
      ]; // refer to ../lib/__mocks__/helper.js for this shape

      expect(component.state().bookingsMadeToday).toBe(42);
      expect(component.state().availabilityInfo).toMatchObject(expected);
    });

    test('should handle error correctly', () => {
      // requesting restaurantId !== 305 will result in error
      // in our mocked helper.getReservationInfo()
      const component = shallow(<Reservation id={100} />);
      component.instance().getAvailabilityInfo('2018-04-01', 17, 2);
      const errorMessage = 'Error getting availability info: Error!';
      expect(component.state().message).toBe(errorMessage);
    });
  });

  describe('requestReservation', () => {
    test('should require a name to be set', () => {
      // requesting restaurantId !== 305 will result in error
      // in our mocked helper.getReservationInfo()
      const component = shallow(<Reservation id={305} />);
      component.instance().requestReservation(19);
      const displayMessage = 'Enter your name before making a reservation!';
      expect(component.state().message).toBe(displayMessage);
    });

    test('should update state correctly', () => {
      // requesting restaurantId !== 305 will result in error
      // in our mocked helper.getReservationInfo()
      const component = shallow(<Reservation id={305} />);
      component.instance().setName('test name');
      component.instance().requestReservation(19);
      const displayMessage = 'Your table has been saved!';
      expect(component.state().message).toBe(displayMessage);
    });

    test('should handle error correctly', () => {
      // requesting restaurantId !== 305 will result in error
      // in our mocked helper.getReservationInfo()
      const component = shallow(<Reservation id={100} />);
      component.instance().setName('test name');
      component.instance().requestReservation(19);
      const errorMessage = 'Error making reservation';
      expect(component.state().message).toBe(errorMessage);
    });
  });
});
