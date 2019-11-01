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
  // 从dom树种查找指定内容
  const findOption = (dropdownNode, textContent) => {
    const options = Array.from(dropdownNode.childNodes);
    return options.find(
      option => option.textContent === textContent
    );
  }

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

    // select的第一个option作为默认值为空 且为选中状态
    it('initially has a black value chosen', () => {
      render(<AppointmentForm />);
      const firstNode = field('service').childNodes[0];
      expect(firstNode.value).toEqual('');
      expect(firstNode.selected).toBeTruthy();
    })
    // 渲染的选项内容
    it('lists all salon services', () => {
      const selectableServices = ['Cut', 'Blow-dry'];
      render(
        <AppointmentForm
          selectableServices={selectableServices}
        />
      )
      const optionNodes = Array.from(
        field('service').childNodes
      );
      // 将optionNodes的节点文字内容提取出一个数组
      const renderedServices = optionNodes.map(
        node => node.textContent
      );
      // 渲染内容与参数内容匹配
      expect(renderedServices).toEqual(
        expect.arrayContaining(selectableServices)
      );
    })
    // 测试select的默认值是否为指定字段
    it('pre-selects the existing value', () => {
      const services = ['Cut', 'Blow-dry'];

      render(
        <AppointmentForm
          selectableServices={services}
          service="Blow-dry"
        />
      );
      const option = findOption(
        field('service'),
        'Blow-dry'
      );
      expect(option.selected).toBeTruthy();
    })

  })
  
})
