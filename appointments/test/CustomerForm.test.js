import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { createContainer } from './domManipulators';
import { CustomerForm } from '../src/CustomerForm';

describe('CustomerForm', () => {
  let render, container;
  // 查找id为指定id的form标签
  const form = id => container.querySelector(`form[id="${id}"]`);
  // 验证本输入框存在
  const expectToBeInputFieldOfTypeText = formElement => {
    expect(formElement).not.toBeNull();
    expect(formElement.tagName).toEqual('INPUT');
    expect(formElement.type).toEqual('text');
  }
  // 表单的firstName输入标签
  // const field = form('customer').elements.firstName;
  const firstNameField = () => form('customer').elements.firstName;
  const labelFor = formElement =>
    container.querySelector(`label[for="${formElement}"]`);

  beforeEach(() => {
    ({ render, container } = createContainer());
  })
  
  it('renders a form', () => {
    render(<CustomerForm />);
    expect(
      form('customer')
    ).not.toBeNull();
  })

  it('renders the first name field as a text box', () => {
    render(<CustomerForm />);
    // const firstNameField = form('customer').elements.firstName;
    expectToBeInputFieldOfTypeText(firstNameField());
  })

  it('includes the existing value for the first name', () => {
    render(<CustomerForm firstName="Ashley" />);
    // const field = form('customer').elements.firstName;
    expect(firstNameField().value).toEqual('Ashley');
  })

  it('renders a label for the first name field', () => {
    render(<CustomerForm />);
    expect(labelFor('firstName')).not.toBeNull();
    expect(labelFor('firstName').textContent).toEqual('First name');
  })

  it('assigns an id that matches the label id to the first name field', () => {
    render(<CustomerForm />);
    expect(firstNameField().id).toEqual('firstName');
  })

  it('saves existing first name when submitted', 
    async () => {
      expect.hasAssertions();
      render(
        <CustomerForm
          firstName="Ashley"
          onSubmit={({ firstName }) => 
            expect(firstName).toEqual('Ashley')
          }
        />
      )
      await ReactTestUtils.Simulate.submit(form('customer'));
    }
  )

  it('saves new first name when submitted', async () => {
    expect.hasAssertions();
    render(
      <CustomerForm
        firstName="Ashley"
        onSubmit={({ firstName }) =>
        expect(firstName).toEqual('Jamie')
      }
      />
    );
    await ReactTestUtils.Simulate.change( firstNameField(), {
      target: { value: 'Jamie' }
    });
    await ReactTestUtils.Simulate.submit(
      form('customer')
    );
  })

})
