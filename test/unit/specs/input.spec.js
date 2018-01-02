import { createTest, destroyVM,createVue } from '../vm';
import Input from 'src/components/Input/Input';

describe('Button', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });
  // 检查原始组件选项
  it('create', () => {
    vm = createTest(Button, {
      type: 'primary'
    }, true);
    let buttonElm = vm.$el;
    expect(buttonElm.classList.contains('h-btn-primary')).to.be.true;
  });
  it('shape', () => {
    vm = createTest(Button, {
      shape: 'circle'
    }, true);
    let buttonElm = vm.$el;
    expect(buttonElm.classList.contains('h-btn-circle')).to.be.true;
  });
  it('nativeType', () => {
    vm = createTest(Button, {
      nativeType: 'submit'
    }, true);
    let buttonElm = vm.$el;
    expect(buttonElm.getAttribute('type')).to.be.equal('submit');
  });
  it('loading', () => {
    vm = createTest(Button, {
      loading: true
    }, true);
    let buttonElm = vm.$el;
    expect(buttonElm.classList.contains('h-btn-loading')).to.be.true;
    expect(buttonElm.querySelector('.icon-loading')).to.be.ok;
  });
  it('disabled', () => {
    vm = createTest(Button, {
      disabled: true
    }, true);
    let buttonElm = vm.$el;
    expect(buttonElm.classList.contains('h-btn-disable')).to.be.true;
  });
  it('size', () => {
    vm = createTest(Button, {
      size: 'large'
    }, true);
    let buttonElm = vm.$el;
    expect(buttonElm.classList.contains('h-btn-large')).to.be.true;
  });
  it('textColor', () => {
    vm = createTest(Button, {
      textColor: 'red'
    }, true);
    let buttonElm = vm.$el;
    expect(buttonElm.style.color).to.be.equal('red');
  });
  it('click', done => {
    let result;
    vm = createVue({
      template: `
        <h-button @click="handleClick"></h-button>
      `,
      methods: {
        handleClick(evt) {
          result = evt;
        }
      }
    }, true);
    vm.$el.click();
    setTimeout(_ => {
      expect(result).to.exist;
      done();
    }, 20);
  });

})
