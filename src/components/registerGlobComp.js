import ElementPlus from 'element-plus'
import { ElButton } from 'element-plus';


export const compList = [
    ElButton
];

export function registerGlobComp(app){
    app.use(ElementPlus)

    compList.forEach((comp) => {
        app.component(comp.name, comp);
    }); 
}