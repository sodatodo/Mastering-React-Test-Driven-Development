import React from 'react';
import { createContainer } from './domManipulators';
import { CustomerForm } from '../src/CustomerForm';

describe('CustomerForm', () => {
  let render, container;
  // 查找id为指定id的form标签
  const form = id => container.querySelector(`form[id="${id}"]`);

  beforeEach(() => {
    ({ render, container } = createContainer());
  })
  
  it('renders a form', () => {
    render(<CustomerForm />);
    expect(
      form('customer')
    ).not.toBeNull();
  })
})
