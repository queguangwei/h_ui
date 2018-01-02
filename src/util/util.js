// 检测某属性是否属于某对象
const hasOwnProperty = Object.prototype.hasOwnProperty;
export function hasOwn(obj, key){
	return hasOwnProperty.call(obj, key)
}
function extend(toObj, _form){
	for(let key in _form){
		toObj[key] = _form[key]
	}
	return toObj
}

export function toObject(arr){
	let res = {}
	for(let i = 0; i<arr.length; i++){
		if(arr[i]){
			extend(res, arr[i])
		}
	}
	return res
}