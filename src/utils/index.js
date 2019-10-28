export function getRedirectTo(type, header) {
    let path;
    if(type==='boss'){
        path='/boss'
    }else {
        path='/god'
    }
    if(!header){
        path+='info'
    }
    return path
}
