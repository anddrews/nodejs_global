export class JSONConverter {
    toJSON(dataStr) {
        // const regExpValue = /^(\d+),(".+"|.+),(".+"|.+),(".+"|.+),(\S\d+\.\d+),(\d+-\S+)$/;
        const regExpValue = /^(\d+),(".+"|.+),(".+"|.+),(".+"|.+),(".+"|.+),(".+"|.+)$/;
        const strArr = dataStr.split(/\n|\r/).filter(el => !!el);
        const propsName = strArr.shift().split(',');
        const result = strArr.map((item) => {
            let obj = {};
            obj.options = [];
            propsName.forEach((el, index) => {
                if(el == 'color' || el == 'size') {
                    obj.options.push({ [el]: item.match(regExpValue)[index + 1].replace(/"/g,'') });
                } else {
                    obj[el] = item.match(regExpValue)[index + 1].replace(/"/g,'');
                }
            });
            return obj;
        });
        return result;
    }
}