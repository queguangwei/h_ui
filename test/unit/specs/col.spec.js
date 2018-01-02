import { createTest, destroyVM,createVue } from '../vm';
import Col from 'src/components/Grid/Col';    

describe('Col', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });
  // 检查原始组件选项
  it('create', () => {
    vm = createTest(Col, true);
    let colElm = vm.$el;
    expect(colElm.classList.contains('h-col')).to.be.true;
  });
  it('span', () => {
    vm = createTest(Col, {
      span: 10
    }, true);
    let colElm = vm.$el;
    expect(colElm.classList.contains('h-col-span-10')).to.be.true;
  });
  it('order', () => {
    vm = createTest(Col, {
      order: 10
    }, true);
    let colElm = vm.$el;
    expect(colElm.classList.contains('h-col-order-10')).to.be.true;
  });
  it('offset push pull', () => {
    vm = createTest(Col, {
      offset: 10,
      push: 10,
      pull: 10
    }, true);
    let colElm = vm.$el;
    expect(colElm.classList.contains('h-col-offset-10')).to.be.true;
    expect(colElm.classList.contains('h-col-push-10')).to.be.true;
    expect(colElm.classList.contains('h-col-pull-10')).to.be.true;
  });
  it('className', () => {
    vm = createTest(Col, {
      className: 'venus-tly'
    }, true);
    let colElm = vm.$el;
    expect(colElm.classList.contains('venus-tly')).to.be.true;
  });
});
