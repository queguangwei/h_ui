import { createTest, destroyVM} from '../vm';
import Row from 'src/components/Grid/Row';

describe('Row', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });
  // 检查原始组件选项
  it('create', () => {
    vm = createTest(Row, true);
    let rowElm = vm.$el;
    expect(rowElm.classList.contains('h-row')).to.be.true;
  });
  //检查gutter属性
  it('gutter', () => {
    vm = createTest(Row, {
      gutter: 20
    }, true);
    let rowElm = vm.$el;
    expect(rowElm.style.marginLeft).to.be.equal('-10px');
    expect(rowElm.style.marginRight).to.be.equal('-10px');
  });
  //检查type属性
  it('type', () => {
    vm = createTest(Row, {
      type: 'flex'
    }, true);
    let rowElm = vm.$el;
    expect(rowElm.classList.contains('h-row-flex')).to.be.true;
  });
  it('flex justify', () => {
    vm = createTest(Row, {
      type: 'flex',
      justify: 'end'
    }, true);
    let rowElm = vm.$el;
    expect(rowElm.classList.contains('h-row-flex-end')).to.be.true;
  });
  it('flex align', () => {
    vm = createTest(Row, {
      type: 'flex',
      align: 'bottom'
    }, true);
    let rowElm = vm.$el;
    expect(rowElm.classList.contains('h-row-flex-bottom')).to.be.true;
  });
  it('className', () => {
    vm = createTest(Row, {
      className: 'venus-tly'
    }, true);
    let rowElm = vm.$el;
    expect(rowElm.classList.contains('venus-tly')).to.be.true;
  });
})
