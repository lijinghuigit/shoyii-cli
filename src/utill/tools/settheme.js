
let defaultName='light';
export const setTheme=(themeName=defaultName)=>{
	console.log(themeName)
	if (themeName === 'light') {
	    if (document.body.className) document.body.className = ''
	  } else {
	    // 把该主题的所有属性存到缓存
	    document.body.className = themeName;
	}
}