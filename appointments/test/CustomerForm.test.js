import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { createContainer } from './domManipulators';
import { CustomerForm } from '../src/CustomerForm';

describe('CustomerForm', () => {
  let render, container;
  // 查找id为指定id的form标签
  const form = id => container.querySelector(`form[id="${id}"]`);

  const field = name => form('customer').elements[name];
  // 验证本输入框存在
  const expectToBeInputFieldOfTypeText = formElement => {
    expect(formElement).not.toBeNull();
    expect(formElement.tagName).toEqual('INPUT');
    expect(formElement.type).toEqual('text');
  }
  // 表单的firstName输入标签
  // const field = form('customer').elements.firstName;
  // const firstNameField = () => form('customer').elements.firstName;
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

  const itRendersAsATextBox = (fieldName) =>
    it('renders as a text box', () => {
      render(<CustomerForm />);
      // const firstNameField = form('customer').elements.firstName;
      expectToBeInputFieldOfTypeText(field(fieldName));
    })
  
  const itIncludesTheExistingValue = (fieldName, value) =>
    it('includes the existing value', () => {
      render(<CustomerForm {...{[fieldName]: 'value'}} />);
      // const field = form('customer').elements.firstName;
      expect(field(fieldName).value).toEqual('value');
    })
  
  const itRendersALabel = (fieldName, text) =>
    it('renders a label', () => {
      render(<CustomerForm />);
      expect(labelFor(fieldName)).not.toBeNull();
      expect(labelFor(fieldName).textContent).toEqual(text);
    })
  const itAssignsAnIdThatMatchesTheLabelId = fieldName =>
  it('assigns an id that matches the label id', () => {
    render(<CustomerForm />);
    expect(field(fieldName).id).toEqual(fieldName);
  })
  
  const itSubmitsExistingValue = (fieldName, value) =>
  it('saves existing first name when submitted', 
    async () => {
      expect.hasAssertions();
      render(
        <CustomerForm
          // firstName="Ashley"
          {...{[fieldName]: value}}
          onSubmit={(props) => 
            expect(props[fieldName]).toEqual(value)
          }
        />
      )
      await ReactTestUtils.Simulate.submit(form('customer'));
    }
  )

  const itSubmitsNewValue = (fieldName, value) =>
  it('saves new first name when submitted', async () => {
    expect.hasAssertions();
    render(
      <CustomerForm
        // firstName="Ashley"
        {...{[fieldName]: 'existingValue'}}
        onSubmit={(props) =>
        expect(props[fieldName]).toEqual(value)
      }
      />
    );
    await ReactTestUtils.Simulate.change( field('firstName'), {
      target: { value }
    });
    await ReactTestUtils.Simulate.submit(
      form('customer')
    );
  })
  describe('first name field', () => {
    itRendersAsATextBox('firstName');
    itIncludesTheExistingValue('firstName', 'value');
    itRendersALabel('firstName', 'First name');
    itAssignsAnIdThatMatchesTheLabelId('firstName');
    itSubmitsExistingValue('firstName', 'Ashley');
    itSubmitsNewValue('firstName', 'newValue');
  })
})
