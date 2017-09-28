export class JSONConverter {
    toJSON(dataStr) {
        const regExpValue = /^(\d+),(".+"|.+),(".+"|.+),(".+"|.+),(\S\d+\.\d+),(\d+-\S+)$/;
        const strArr = dataStr.split('\n');
        const propsName = strArr.shift().split(',');
        if(!strArr[strArr.length]) {strArr.length--;}
        const result = strArr.map((item) => {
            let obj = {};
            propsName.forEach((el, index) => {
                obj[el] = item.match(regExpValue)[index + 1].replace(/"/g,'');
            });
            return obj;
        });
        return result;
    }
}