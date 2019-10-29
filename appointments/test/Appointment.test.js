import React from 'react';
import ReactDOM from 'react-dom';
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
        render(<Appointment customer={customer}/>)

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
        const today = new Date();
        const appointments = [
            { startsAt: today.setHours(12, 0) },
            { startsAt: today.setHours(13, 0) }
        ];
        render(<AppointmentsDayView appointments={appointments} />);
        expect(container.querySelector('ol')).not.toBeNull();
        expect(container.querySelector('ol').children).toHaveLength(2);
    })
    // 组件渲染了两个li子节点 且内容随着参数而变化
    it('renders each appointment in an li', () => {
        const today = new Date();
        const appointments = [
            { startsAt: today.setHours(12, 0) },
            { startsAt: today.setHours(13, 0) }
        ];
        render(<AppointmentsDayView appointments={appointments} />);

        expect(container.querySelectorAll('li')).toHaveLength(2);

        expect(
            container.querySelectorAll('li')[0].textContent
        ).toEqual('12:00');
        expect(
            container.querySelectorAll('li')[1].textContent
        ).toEqual('13:00');
    })
})