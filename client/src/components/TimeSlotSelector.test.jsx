import React from 'react';
import { shallow } from 'enzyme';

import TimeSlotSelector from './TimeSlotSelector';
// import TimeSlot from './TimeSlot';

describe('TimeSlotSelector Component', () => {
  test('should render correctly for multiple available time slots', () => {
    expect(shallow(<TimeSlotSelector
      party={2}
      bookingsMadeToday={25}
      availabilityInfo={[
        { time: 17, remaining: 0 },
        { time: 18, remaining: 5 },
        { time: 19, remaining: 3 },
        { time: 20, remaining: 2 },
        { time: 21, remaining: 1 },
      ]}
      clickHandler={() => {}}
    />)).toMatchSnapshot();
  });

  test('should have appropriate message for no time slots', () => {
    expect(shallow(<TimeSlotSelector
      party={7}
      bookingsMadeToday={25}
      availabilityInfo={[
        { time: 17, remaining: 0 },
        { time: 18, remaining: 5 },
        { time: 19, remaining: 3 },
        { time: 20, remaining: 2 },
        { time: 21, remaining: 1 },
      ]}
      clickHandler={() => {}}
    />)).toMatchSnapshot();
  });

  test('should have appropriate message for 1 available time slot', () => {
    expect(shallow(<TimeSlotSelector
      party={5}
      bookingsMadeToday={25}
      availabilityInfo={[
        { time: 17, remaining: 0 },
        { time: 18, remaining: 5 },
        { time: 19, remaining: 3 },
        { time: 20, remaining: 2 },
        { time: 21, remaining: 1 },
      ]}
      clickHandler={() => {}}
    />)).toMatchSnapshot();
  });

  test('should render correctly for no bookings made today', () => {
    expect(shallow(<TimeSlotSelector
      party={2}
      bookingsMadeToday={0}
      availabilityInfo={[
        { time: 17, remaining: 0 },
        { time: 18, remaining: 5 },
        { time: 19, remaining: 3 },
        { time: 20, remaining: 2 },
        { time: 21, remaining: 1 },
      ]}
      clickHandler={() => {}}
    />)).toMatchSnapshot();
  });

  test('should render the appropriate number of TimeSlot components', () => {
    const component = shallow(<TimeSlotSelector
      party={5}
      bookingsMadeToday={25}
      availabilityInfo={[
        { time: 17, remaining: 0 },
        { time: 18, remaining: 5 },
        { time: 19, remaining: 3 },
        { time: 20, remaining: 2 },
        { time: 21, remaining: 1 },
      ]}
      clickHandler={() => {}}
    />);

    expect(component.find('TimeSlot').length).toBe(5);
  });

  describe('calculates available boolean sent to TimeSlot', () => {
    test('should be false when remaining is 0', () => {
      const component = shallow(<TimeSlotSelector
        party={5}
        bookingsMadeToday={25}
        availabilityInfo={[
          { time: 17, remaining: 0 },
        ]}
        clickHandler={() => {}}
      />);

      const timeSlot = component.find('TimeSlot').first();
      expect(timeSlot.props().available).toBe(false);
    });

    test('should be false when 0 < remaining < party', () => {
      const component = shallow(<TimeSlotSelector
        party={5}
        bookingsMadeToday={25}
        availabilityInfo={[
          { time: 17, remaining: 3 },
        ]}
        clickHandler={() => {}}
      />);

      const timeSlot = component.find('TimeSlot').first();
      expect(timeSlot.props().available).toBe(false);
    });

    test('should be true when remaining === party', () => {
      const component = shallow(<TimeSlotSelector
        party={5}
        bookingsMadeToday={25}
        availabilityInfo={[
          { time: 17, remaining: 5 },
        ]}
        clickHandler={() => {}}
      />);

      const timeSlot = component.find('TimeSlot').first();
      expect(timeSlot.props().available).toBe(true);
    });

    test('should be true when remaining > party', () => {
      const component = shallow(<TimeSlotSelector
        party={5}
        bookingsMadeToday={25}
        availabilityInfo={[
          { time: 17, remaining: 8 },
        ]}
        clickHandler={() => {}}
      />);

      const timeSlot = component.find('TimeSlot').first();
      expect(timeSlot.props().available).toBe(true);
    });
  });
});
