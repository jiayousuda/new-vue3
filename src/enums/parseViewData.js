export const listConfig = {}

export const formConfig = {
    code:"FormView",
    name:"表单",
    type:"form",
    props:{},
    // ▲ tempalate
    tempalate: [
        {
            tag:"collapse-container",
            id:"1",
            props: {
                title:"基本信息"
            },
            children: [
                // ⇨ name
                {
                   tag:"form-item-with-input",
                   id:"1.1",
                   props: {
                      lable:"姓名",
                      inputType:"el-input-string",
                      precision:0
                   },
                   __vModel__:{
                       target:"name"
                   }
                },
                // ⇨ age
                {
                    tag:"form-item-with-input",
                    id:"1.2",
                    props: {
                       lable:"年龄",
                       inputType:"el-input-number",
                       precision:0
                    },
                    __vModel__:{
                        target:"age"
                    }
                 }
            ]
        }
    ]
}