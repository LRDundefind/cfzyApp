
import md5 from 'js-md5';
import Cookies from 'js-cookie'
const unchangeable={
  language : 'zh_CN',
  terminal_type : 'SELLING_MOBILE',
  version : 1,
} 

export function serverMoudle(params) {
 
  let randomKey = Cookies.get('randomKey') || ''
  // let owner_ids = Cookies.get('owner_id') || ''
  let roleIds = Cookies.get('roleId') || ''
  let sids = Cookies.get('sid') || ''
  if(Cookies.get('gidOwnID_lists')== undefined){
    var changeable={
      sid : sids,
      roleId:roleIds,
    } 
  }
  else{
    var gidOwnID_lists = JSON.parse(Cookies.get('gidOwnID_lists')) || ''
     changeable={
      sid : sids,
      roleId:roleIds,
      owner_id : gidOwnID_lists.owner_id,
      gid : gidOwnID_lists.gid
  
    } 
  }
 
  // params.owner_id=window.localStorage.getItem('owner_id') || '';
  // params.gid=JSON.parse(window.localStorage.getItem('gid'))[0].gid || ''
 let nObj= Object.assign({},params,unchangeable,changeable);

  let BaseTransferEntity = new Object();
  BaseTransferEntity.object = Base64.encode(JSON.stringify(nObj));
  BaseTransferEntity.sign   = md5.hex(BaseTransferEntity.object + randomKey);
  return BaseTransferEntity
}