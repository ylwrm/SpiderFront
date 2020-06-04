import { Component, Prop, Vue } from 'vue-property-decorator';
interface SpiderVueTableComponentInstance extends VueComponentInstance {
    name?: string | undefined;
    parent?: SpiderCombination | undefined;
    div?: HTMLDivElement;
    setting:
    {
        name: string,
        type: string,
        config: {
            type: string,
            显示行数: number,
            选中框: string,
            是否分页: string,
            序号: string,
            固定列: number,
            配置列表: {
                列字段: string,
                列名称: string,
                列宽度: string,
                列类型?: string
            }[]
        }
    };
}
@Component
export default class SpiderVueTable extends Vue implements SpiderVueBase {
    @Prop()
    public ComponentInstance: SpiderVueTableComponentInstance | undefined = {
        setting: {
            name: "Tab",
            type: "SpiderVueComponent",
            config: {
                type: "SpiderVueTab",
                显示行数: 1000,
                选中框: "是",
                是否分页: "是",
                序号: "是",
                固定列: 3,
                配置列表: [
                    {
                        列字段: "Name",
                        列名称: "名称",
                        列宽度: "150px",
                        列类型: "文字链接"
                    },
                    {
                        列字段: "Code",
                        列名称: "代号",
                        列宽度: "150px"
                    },
                    {
                        列字段: "Description",
                        列名称: "描述",
                        列宽度: "120px"
                    },
                    {
                        列字段: "BusinessState",
                        列名称: "业务状态",
                        列宽度: "120px"
                    },
                    {
                        列字段: "Owner",
                        列名称: "负责人",
                        列宽度: "120px"
                    },
                    {
                        列字段: "Creator",
                        列名称: "创建人",
                        列宽度: "120px"
                    },
                    {
                        列字段: "CreateTime",
                        列名称: "创建时间",
                        列宽度: "120px"
                    },
                    {
                        列字段: "Updator",
                        列名称: "更新人",
                        列宽度: "120px"
                    },
                    {
                        列字段: "LastUpdateTime",
                        列名称: "更新时间",
                        列宽度: "120px"
                    },
                    {
                        列字段: "(t)=>'v' + t.Major + '.' +t.Minor",
                        列名称: "版本",
                        列宽度: "120px"
                    },
                    {
                        列字段: "CheckOutBy",
                        列名称: "签出",
                        列宽度: "120px"
                    }
                ]
            }
        }
    };
    //表头数据
    private tHeadList: any[] = [];
    // 是否分页
    private isPagination = true;
    //表内容数据
    private tBodyList: any[] = [];
    // 当前页
    private tableCurrentPage = 1;
    // 总条目数
    private tableTotal = 0;
    // 每页显示条目数
    private tablePageSize = 5;
    // 显示图标的列
    private tableImageList: any[] = [];
    // 显示文字带图标的列
    private tableLanguageImageList: any[] = [];
    // 显示link和图标
    private tableLinkImage = '';
    // 文字带图标
    private tableLanguageImage: any[] = [];
    // 可编辑列
    private tableInputList: any[] = [];
    // 单选列
    private tableCheckedList: any[] = [];
    // 显示进度条的列
    private tableProgressList: any[] = [];
    // 显示标记的列
    private tableBadgeList: any[] = [];
    // 显示文字点击的列
    private tableLinkList: any[] = [];
    // 是否显示序号
    private isShowOrder = false;
    // 是否显示选中框
    private isShowCheckBox = false;
    // 从第几列开始固定
    private isFixed = -1;
    // 特殊列
    private tableColumn: any[] = [];
    // 是否展开行
    private isExpand = null;
    // 展开行状态
    private expand = false;
    // 展开行高度
    private expandHeight = '';
    private context = null;
    // 排序列字段
    private sortCol = null;
    private sort = '';
    // 获取xml数据
    private config: any = null;
    // 主要创建配置的控件
    private parent = null;
    // 控件
    private control: any = null;
    private loading = true;
    // 特殊固定列的列数
    private fixNum = 0;
    // 选中数据
    private selection: any[] = [];
    // 懒加载获取上一次的数据
    private getUpdata: any[] = [];

    async Update() {
        this.config = this.ComponentInstance?.setting.config;
        this.control = this.ComponentInstance?.div;
        console.log('-------table列表--------')
        this.tHeadList = this.config.配置列表
        this.tablePageSize = this.config.显示行数 ? this.config.显示行数 : null
        if (this.config.序号) {
            this.isShowOrder = this.config.序号
            this.fixNum++
        }
        if (this.config.选中框) {
            this.isShowCheckBox = this.config.选中框
            this.fixNum++
        }
        if (this.config.展开行) {
            this.isExpand = this.config.展开行
            this.fixNum++
        }
        this.isPagination = this.config.是否分页 == '否' ? false : true
        // 判断固定列
        if (this.config.固定列) {
            this.isFixed = Number(this.config.固定列)
        }
        // 判断特殊列
        this.tHeadList.forEach(element => {
            if (element.列类型 === '文字链接') {
                this.tableLinkList.push(element.列字段)
            }
            if (element.列类型 === '进度条') {
                this.tableProgressList.push(element.列字段)
            }
            if (element.列类型 === '标记') {
                this.tableBadgeList.push(element.列字段)
            }
            if (element.列类型 === '编辑列') {
                this.tableInputList.push(element.列字段)
            }
            if (element.列类型 === '单选列') {
                this.tableCheckedList.push(element.列字段)
            }
            if (element.列类型 && element.图标) {
                this.tableLinkImage = element.图标
            }
            // 记录需要清空的列
            if (element.列类型) {
                this.tableColumn.push(element.列字段)
            }
            if (element.图标) {
                this.tableColumn.push(element.列字段)
                if (element.图标.indexOf(',') == -1 && !element.列类型) {
                    this.tableLanguageImageList.push(element.列字段)
                    this.tableLanguageImage.push(element.图标)
                }
                if (element.图标.indexOf(',') >= 0) {
                    this.tableImageList.push(element.列字段)
                }
            }
        })
        this.loading = true

        this.control.oldAddEventListener = this.control.addEventListener
        const myThis = this
        this.control.addEventListener = (...args: string[]) => {
            console.log(args)
            myThis.control.oldAddEventListener(...args)
            if (args[0] === 'CheckChanged') {
                setTimeout(() => {
                    myThis.GetChecked([])
                }, 100)
            }
            if (args[0] === 'TableChange') {
                setTimeout(() => {
                    myThis.$emit('TableChange', {
                        page: myThis.tableCurrentPage,
                        countperpage: myThis.tablePageSize,
                        sortName: myThis.sortCol,
                        sort: myThis.sort
                    })
                }, 100)
            }
        }
    }
    // 更新数据
    UpdateData(tabledata: { data: any[]; totalcount: number; }) {
        tabledata.data.forEach(el => {
            this.tHeadList.forEach(configel => {
                try {
                    let fun = eval(configel.列字段)
                    if (typeof fun == 'function') {
                        el[configel.列字段] = fun(el)
                    }
                } catch (error) {
                    // console.log(error)
                }
            })
        })
        this.tableTotal = tabledata.totalcount
        if (this.isPagination) {
            this.tBodyList = tabledata.data!
        } else {
            if (this.tableTotal > this.tablePageSize) {
                if (
                    JSON.stringify(this.getUpdata) != JSON.stringify(tabledata.data)
                ) {
                    this.getUpdata = tabledata.data
                    this.tBodyList.push(...tabledata.data)
                }
            } else {
                this.tBodyList = tabledata.data
            }
        }
        this.tBodyList.forEach((element, index) => {
            element.isShowExband = false
            if (this.tableCurrentPage === 1) {
                element['order'] = index + 1
            } else {
                element['order'] =
                    index + 1 + (this.tableCurrentPage - 1) * this.tablePageSize
            }
        })
        this.loading = false
        this.$nextTick(() => {
            (this.$refs.table as any).doLayout();
        })
    }
    //选中记录时触发的函数
    GetChecked(selection: any[]) {
        this.selection = selection
        if (window['SendMessage']) {
            window['SendMessage']({ name: 'CheckChanged', obj: selection })
        }
        this.$emit('CheckChanged', selection)
    }
    GetRows() {
        return this.tBodyList
    }
    GetCheckedRow() {
        return this.selection
    }
    //点击文字链接触发的函数
    LinkClicked(val: any) {
        if (window['SendMessage']) {
            window['SendMessage']({ name: 'LinkClicked', obj: val })
        }
        this.$emit('LinkClicked', val)
    }
    // 点击行触发的函数
    RowClicked(row: any) {
        if (window['SendMessage']) {
            window['SendMessage']({ name: 'RowClicked', obj: row })
        }
        this.$emit('RowClicked', row)
    }
    // 展开行触发的函数
    toggleRowExpansion(row: { isShowExband: boolean; order: string | number; }) {
        row.isShowExband = !row.isShowExband
        if (row.isShowExband) {
            this.$nextTick(() => {
                // 展开行临时的宽度
                (this.$refs[row.order] as HTMLElement).style.width =
                    (this.$refs.container as HTMLElement).offsetWidth - 130 + 'px'
                if (window['SendMessage']) {
                    window['SendMessage']({
                        name: 'RowExpanded',
                        obj: {
                            div: this.$refs[row.order],
                            rowdata: row,
                            context: this.context
                        }
                    })
                }
                this.$emit('RowExpanded', {
                    div: this.$refs[row.order],
                    rowdata: row,
                    context: this.context
                })
                this.expandHeight = (this.$refs[row.order] as HTMLElement).offsetHeight + 'px'
            })
        }
    }
    // 懒加载
    load() {
        if (this.isPagination) {
            return
        } else {
            if (this.tableTotal > this.tablePageSize) {
                this.tableCurrentPage++
            }
            // this.loading = true
            if (window['SendMessage']) {
                window['SendMessage']({
                    name: 'TableChange',
                    obj: {
                        page: this.tableCurrentPage,
                        countperpage: this.tablePageSize,
                        sortName: this.sortCol,
                        sort: this.sort
                    }
                })
            }
            this.$emit('TableChange', {
                page: this.tableCurrentPage,
                countperpage: this.tablePageSize,
                sortName: this.sortCol,
                sort: this.sort
            })
        }
    }
    // pageSize改变时触发的函数
    handleSizeChange(val: number) {
        this.tablePageSize = val
        this.loading = true
        if (window['SendMessage']) {
            window['SendMessage']({
                name: 'TableChange',
                obj: {
                    page: this.tableCurrentPage,
                    countperpage: this.tablePageSize,
                    sortName: this.sortCol,
                    sort: this.sort
                }
            })
        }
        this.$emit('TableChange', {
            page: this.tableCurrentPage,
            countperpage: this.tablePageSize,
            sortName: this.sortCol,
            sort: this.sort
        })
    }
    // 当前页改变时触发的函数
    handleCurrentChange(val: number) {
        if (val > Math.ceil(this.tableTotal / this.tablePageSize)) {
            val = Math.ceil(this.tableTotal / this.tablePageSize)
        }
        this.tableCurrentPage = Math.max(1, val)
        this.loading = true
        if (window['SendMessage']) {
            window['SendMessage']({
                name: 'TableChange',
                obj: {
                    page: this.tableCurrentPage,
                    countperpage: this.tablePageSize,
                    sortName: this.sortCol,
                    sort: this.sort
                }
            })
        }
        this.$emit('TableChange', {
            page: this.tableCurrentPage,
            countperpage: this.tablePageSize,
            sortName: this.sortCol,
            sort: this.sort
        })
    }
    // 排序触发的函数
    SortChange(column: { prop: null; order: string; }) {
        console.log(column)
        this.sortCol = column.prop
        if (column.order == 'ascending') {
            this.sort = 'asc'
        }
        if (column.order == 'descending') {
            this.sort = 'desc'
        }
        this.loading = true
        if (window['SendMessage']) {
            window['SendMessage']({
                name: 'TableChange',
                obj: {
                    page: this.tableCurrentPage,
                    countperpage: this.tablePageSize,
                    sortName: this.sortCol,
                    sort: this.sort
                }
            })
        }
        this.$emit('TableChange', {
            page: this.tableCurrentPage,
            countperpage: this.tablePageSize,
            sortName: this.sortCol,
            sort: this.sort
        })
    }
    // 刷新函数
    refresh() {
        this.Refresh()
    }
    // 刷新函数
    Refresh() {
        this.handleCurrentChange(1)
    }
}
