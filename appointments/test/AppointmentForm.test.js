import React from 'react';
import { createContainer } from './domManipulators';
import { AppointmentForm } from '../src/AppointmentForm';

describe('AppointmentForm', () => {
  let render, container;

  
  beforeEach(() => {
    ({ render, container } = createContainer());
  });
  // 查找id为 id的 from表单dom
  const form = id =>
    container.querySelector(`form[id="${id}"]`);
  // id为appointment的表单的 name子元素
  const field = name => form('appointment').elements[name];

  it('renders a form', () => {
    render(<AppointmentForm />);
    expect(form('appointment')).not.toBeNull();
  })

  describe('service field', () => {
    // 渲染一个下拉框
    it('renders as a select box', () => {
      render(<AppointmentForm />);
      expect(field('service')).not.toBeNull();
      expect(field('service').tagName).toEqual('SELECT');
    })

  })
  
})
