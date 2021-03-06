export function format(num) {
    num = Number(num)
    //num = num.toString().replace(/\$|\,/g,'');
    if(isNaN(num))
        num = "0";
    var sign = (num == (num = Math.abs(num)));
    num = Math.floor(num*100+0.50000000001);
    var cents = num%100;
    num = Math.floor(num/100).toString();
    if(cents<10)
        cents = "0" + cents;
    for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
        num = num.substring(0,num.length-(4*i+3))+','+
                num.substring(num.length-(4*i+3));
    return (((sign)?'':'-') + num + '.' + cents);
}

//售卖单位转换
export function sellNnit(value) {
    let unit = {
        unit_jin:'斤',
        unit_kg:'公斤',
        unit_pie:'件',
        unit_cbd:'公担'
    }
    return unit[value]
}

//单位转换
export function sellUnit(value) {
    let unit = {
        unit_jin:'元/斤',
        unit_kg:'元/公斤',
        unit_pie:'元/件',
        unit_cbd:'元/公担'
    }
    return unit[value]
}

//单位转换
export function unit(value) {
    let unit = {
        unit_jin:'斤/件',
        unit_kg:'公斤/件',

    }
    return unit[value]
}



//金额保留两位小数
export function keepTwoNum(value) {
    value = Number(value);
	return value.toFixed(2);
}