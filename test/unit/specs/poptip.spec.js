import { createTest, destroyVM} from '../vm';
import Poptip from 'src/components/Poptip/Poptip';

describe('Poptip', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });
  // 检查原始组件选项
  it('create', () => {
    vm = createTest(Poptip, true);
    let popElm = vm.$el;
    expect(popElm.classList.contains('h-poptip')).to.be.true;
  });
  //检查confirm属性
  it('confirm', () => {
    vm = createTest(Poptip, {
      confirm: true
    }, true);
    let popElm = vm.$el;
    expect(popElm.classList.contains('h-poptip-confirm')).to.be.true;
  });
  // //检查type属性
  it('width', () => {
    vm = createTest(Poptip, {
      width: 200
    }, true);
    let popElm = vm.$el;
    let perElem  = popElm.querySelector('.h-poptip-popper')
    expect(perElem.style.width).to.be.equal('200px');
  });
})
