import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import { Appointment, AppointmentsDayView } from '../src/Appointment';

describe('Appointment', () => {
    let container;
    let customer;
    const render = component => ReactDOM.render(component, container);

    beforeEach(() => {
        container = document.createElement('div');
    })
    // 组件可以显示Ashley的文字内容
    it('renders the customer first name', () => {
        customer = { firstName: 'Ashley' };

        // ReactDOM.render(<Appointment customer={customer}/>, container);
        render(<Appointment customer={customer} />)

        expect(container.textContent).toMatch('Ashley');
    })
    // 随着输入值的变化 组件可以显示不同的firstName
    it('renders another customer first name', () => {
        customer = { firstName: 'Jordan' };

        // ReactDOM.render(<Appointment customer={customer} />, container);
        render(<Appointment customer={customer} />);

        expect(container.textContent).toMatch('Jordan');
    })
})

describe('AppointmentsDayView', () => {
    let container;
    const today = new Date();
    const appointments = [
        { 
            startsAt: today.setHours(12, 0),
            customer: { firstName: 'Ashley' }
        },
        { 
            startsAt: today.setHours(13, 0),
            customer: { firstName: 'Jordan' }
        }
    ];
    beforeEach(() => {
        container = document.createElement('div');
    });

    const render = component =>
        ReactDOM.render(component, container);

    // 指定id的节点不为空
    it('renders a div with the right id', () => {
        render(<AppointmentsDayView appointments={[]} />);

        expect(container.querySelector('div#appointmentsDayView')).not.toBeNull();
    })
    // 组件渲染了一个ol节点且有两个子节点
    it('renders multiple appointments in an ol element', () => {
        render(<AppointmentsDayView appointments={appointments} />);
        expect(container.querySelector('ol')).not.toBeNull();
        expect(container.querySelector('ol').children).toHaveLength(2);
    })
    // 组件渲染了两个li子节点 且内容随着参数而变化
    it('renders each appointment in an li', () => {
        
        render(<AppointmentsDayView appointments={appointments} />);

        expect(container.querySelectorAll('li')).toHaveLength(2);

        expect(
            container.querySelectorAll('li')[0].textContent
        ).toEqual('12:00');
        expect(
            container.querySelectorAll('li')[1].textContent
        ).toEqual('13:00');
    })
    // 包含指定字符串
    it('initially shows a message saying there are no appointments today', () => {
        render(<AppointmentsDayView appointments={[]} />);
        expect(container.textContent).toMatch(
            'There are no appointments scheduled for today.'
        )
    })

    it('selects the first appointment by default', () => {
        render(<AppointmentsDayView appointments={appointments} />);
        expect(container.textContent).toMatch('Ashley');
    })

    it('has a button element in each li', () => {
        render(<AppointmentsDayView appointments={appointments} />);
        expect(container.querySelectorAll('li > button')).toHaveLength(2);

        expect(
            container.querySelectorAll('li > button')[0].type
        ).toEqual('button');
    })

    it('renders another appointment when selected', () => {
        render(<AppointmentsDayView appointments={appointments} />);
        const button = container.querySelectorAll('button')[1];
        ReactTestUtils.Simulate.click(button);
        expect(
            container.textContent
        ).toMatch('Jordan');
    })

})