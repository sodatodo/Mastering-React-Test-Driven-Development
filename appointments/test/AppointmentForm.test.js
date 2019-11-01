import React from 'react';
import { createContainer } from './domManipulators';
import { AppointmentForm } from '../src/AppointmentForm';

describe('AppointmentForm', () => {
  let render, container;

  const field = name => form('appointment').elements[name];

  beforeEach(() => {
    ({ render, container } = createContainer());
  });

  const form = id =>
    container.querySelector(`form[id="${id}"]`);
  
  // 查找指定内容的option
  const findOption = (dropdownNode, textContent) => {
    const options = Array.from(dropdownNode.childNodes);
    return options.find(
      option => {
        // console.log('option.textContent', option.textContent === textContent)
        return option.textContent === textContent;
      }
    );
  }

  const timeSlotTable = () =>
    container.querySelector('table#time-slots');

  it('renders a form', () => {
    render(<AppointmentForm />);
    expect(form('appointment')).not.toBeNull();
  })

  describe('service field', () => {
    it('renders as a select box', () => {
      render(<AppointmentForm />);
      expect(field('service')).not.toBeNull();
      expect(field('service').tagName).toEqual('SELECT');
    })

    it('initially has a blank value chosen', () => {
      render(<AppointmentForm />);
      const firstNode = field('service').childNodes[0];
      expect(firstNode.value).toEqual('');
      expect(firstNode.selected).toBeTruthy();
    })

    it('list all salon services', () => {
      const selectableServices = [
        'Cut',
        'Blow-dry'
      ];
      render(
        <AppointmentForm
          selectableServices={selectableServices}
        />
      )
      const optionNodes = Array.from(
        field('service').childNodes
      );
      const renderedServices = optionNodes.map(
        node => node.textContent
      );
      expect(renderedServices).toEqual(
        expect.arrayContaining(selectableServices)
      )
    })

    it('pre-selects the existing value', () => {
      const services = ['Cut', 'Blow-dry'];
      render(
        <AppointmentForm
          selectableServices={services}
          service="Blow-dry"
        />
      )
      const option = findOption(
        field('service'),
        'Blow-dry'
      )
      // console.log('option.textContent', option.textContent);
      expect(option.selected).toBeTruthy();
    })

  })


  describe('time slot table', () => {
    it('renders a table for time slots', () => {
      render(<AppointmentForm />);
      expect(
        timeSlotTable()
      ).not.toBeNull();
    });

    it('renders a time slot for every half an hour between open and close times', () => {
      render(
        <AppointmentForm salonOpensAt={9} salonClosesAt={11} />
      );
      const timeOfDay = timeSlotTable().querySelectorAll('tbody >* th');
      expect(timeOfDay).toHaveLength(4);
      expect(timeOfDay[0].textContent).toEqual('09:00');
      expect(timeOfDay[1].textContent).toEqual('09:30');
      expect(timeOfDay[3].textContent).toEqual('10:30');
    })

    it('renders an empty cell at the start of header row', () => {
      render(<AppointmentForm />);
      const headerRow = timeSlotTable().querySelector('thead > tr');
      expect(headerRow.firstChild.textContent).toEqual('');
    });

    it('renders a week of available dates', () => {
      const today = new Date(2018, 11, 1);
      render(<AppointmentForm today={today} />);
      const dates = timeSlotTable().querySelectorAll(
        'thead >* th:not(:first-child)'
      );
      expect(dates).toHaveLength(7);
      expect(dates[0].textContent).toEqual('Sat 01');
      expect(dates[1].textContent).toEqual('Sun 02');
      expect(dates[6].textContent).toEqual('Fri 07');
      
    })

    it('renders a radio button for each time slot', () => {
      const today = new Date();
      const availableTimeSlots = [
        { startsAt: today.setHours(9, 0, 0, 0) },
        { startsAt: today.setHours(9, 30, 0, 0) }
      ];
      render(
        <AppointmentForm
          availableTimeSlots={availableTimeSlots}
          today={today}
        />
      );
      // console.log('timeSlotTable()', timeSlotTable())
      const cells = timeSlotTable().querySelectorAll('td');
      // console.log('cells.length', cells.length)
      expect(
        cells[0].querySelector('input[type="radio"]')
      ).not.toBeNull();
      expect(
        cells[7].querySelector('input[type="radio"]')
      ).not.toBeNull();
    })

    it('does not render radio buttons for unavailable time slots', () => {
      render(<AppointmentForm availableTimeSlots={[]} />);

      const timesOfDay = timeSlotTable().querySelectorAll('input');
      expect(timesOfDay).toHaveLength(0);
    })
  })
  
  
})
