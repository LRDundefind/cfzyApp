/**
 * Created by liruidong.
 */
export const validate = {
	/* 是否手机号*/
	checkPhone(str) {
	    const reg = /^1[0-9]{10}$/i;
	    return reg.test(str.trim());
	},
}

