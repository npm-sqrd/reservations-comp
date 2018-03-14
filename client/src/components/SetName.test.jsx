import React from 'react';
import { shallow } from 'enzyme';

import SetName from './SetName';

describe('SetName Component', () => {
  test('should render correctly when no name is set', () => {
    expect(shallow(<SetName name="" clickHandler={() => {}} />)).toMatchSnapshot();
  });

  test('should render correctly when a name is set', () => {
    expect(shallow(<SetName name="Marge Simpson" clickHandler={() => {}} />)).toMatchSnapshot();
  });

  test('should set state.nameVal when input text changes', () => {
    const testName = 'Bart Simpson';
    const component = shallow(<SetName name="" clickHandler={() => {}} />);
    const input = component.find('input').first();
    input.simulate('change', { target: { value: testName } });
    expect(component.state('nameVal')).toBe(testName);
  });

  test('should send correct input to clickHandler function', () => {
    const mockClickHandler = jest.fn();
    const testName = 'Lisa Simpson';
    const component = shallow(<SetName
      name=""
      clickHandler={mockClickHandler}
    />);
    const input = component.find('input').first();
    const button = component.find('button').first();

    input.simulate('change', { target: { value: testName } });
    button.simulate('click');

    expect(mockClickHandler.mock.calls.length).toBe(1);
    expect(mockClickHandler.mock.calls[0][0]).toBe(testName);
  });

  test('should not call clickHandler function if textInput is empty', () => {
    const mockClickHandler = jest.fn();
    const testName = '';
    const component = shallow(<SetName
      name=""
      clickHandler={mockClickHandler}
    />);
    const input = component.find('input').first();
    const button = component.find('button').first();

    input.simulate('change', { target: { value: testName } });
    button.simulate('click');

    expect(mockClickHandler.mock.calls.length).toBe(0);
  });

  test('should send correct input to clickHandler function on Enter', () => {
    const mockClickHandler = jest.fn();
    const testName = 'Lisa Simpson';
    const component = shallow(<SetName
      name=""
      clickHandler={mockClickHandler}
    />);
    const input = component.find('input').first();

    input.simulate('change', { target: { value: testName } });
    input.simulate('keyPress', { key: 'Enter' });

    expect(mockClickHandler.mock.calls.length).toBe(1);
    expect(mockClickHandler.mock.calls[0][0]).toBe(testName);
  });

  test('should not call clickHandler function if textInput is empty on Enter', () => {
    const mockClickHandler = jest.fn();
    const testName = '';
    const component = shallow(<SetName
      name=""
      clickHandler={mockClickHandler}
    />);
    const input = component.find('input').first();

    input.simulate('change', { target: { value: testName } });
    input.simulate('keyPress', { key: 'Enter' });

    expect(mockClickHandler.mock.calls.length).toBe(0);
  });

  test('should not call clickHandler function if non-Enter key is pressed', () => {
    const mockClickHandler = jest.fn();
    const testName = 'Maggie Simpson';
    const component = shallow(<SetName
      name=""
      clickHandler={mockClickHandler}
    />);
    const input = component.find('input').first();

    input.simulate('change', { target: { value: testName } });
    input.simulate('keyPress', { key: 'U' });

    expect(mockClickHandler.mock.calls.length).toBe(0);
  });
});
