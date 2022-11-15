export function _snake2Label( str ){
    str +='';
    str = str.split('_');
    for(var i=0;i<str.length;i++){ 
        str[i] = str[i].slice(0,1).toUpperCase() + str[i].slice(1,str[i].length);
    }
    return str.join(' ');
}

export function _hyphen2Label( str ){
    str +='';
    str = str.split('-');
    for(var i=0;i<str.length;i++){ 
        str[i] = str[i].slice(0,1).toUpperCase() + str[i].slice(1,str[i].length);
    }
    return str.join(' ');
}

export function _camel2Label( str ){
    return str.slice(0,1).toUpperCase()+str.slice(1,str.length).replace(/[A-Z]/g, letter => ` ${letter.toLowerCase()}`);
}