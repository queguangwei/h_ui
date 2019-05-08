import {findInx} from '../../util/tools';
export default {
    methods: {
        alignCls (column, row = {},fixed) {
            let cellClassName = '';
            if (row.cellClassName && column.key && row.cellClassName[column.key]) {
                cellClassName = row.cellClassName[column.key];
            }
            return [
                `h-ui-${column.key}`,
                {
                    [`${cellClassName}`]: cellClassName,    // cell className
                    [`${column.className}`]: column.className,    // column className
                    [`${this.prefixCls}-column-${column.align}`]: column.align,
                    [`${this.prefixCls}-head-column-${this.headAlgin}`]: this.headAlgin,
                    [`${this.prefixCls}-body-column-${this.bodyAlgin}`]: this.bodyAlgin,
                    [`${this.prefixCls}-split-index`]: this.splitIndex && column.type=='index',
                    [`${this.prefixCls}-hidden`]: !this.isSummation&&((fixed === 'left' && column.fixed !== 'left') || (fixed === 'right' && column.fixed !== 'right') || (!fixed && column.fixed && (column.fixed === 'left' || column.fixed === 'right')))
                }
            ];
        
        },
        setCellWidth (column, index, top) {
            let width = '';
            if (column.width) {
                width = column.width;
            } else if (this.columnsWidth[column._index]) {
                width = this.columnsWidth[column._index].width;
            }
            if (width === '0') width = '';
            return width;
        }
    }
};
