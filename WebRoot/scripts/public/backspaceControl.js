//阻止回车键提交表单
document.onkeydown = function(event) {  
    var target, code, tag;  
    if (!event) {  
        event = window.event; //针对ie浏览器  
        target = event.srcElement;  
        code = event.keyCode;  
        if (code == 13) {  
            tag = target.tagName;  
            if (tag == "TEXTAREA") { return true; }  
            else { return false; }  
        }  
    }  
    else {  
        target = event.target; //针对遵循w3c标准的浏览器，如Firefox  
        code = event.keyCode;  
        if (code == 13) {  
            tag = target.tagName;  
            if (tag == "INPUT") { return false; }  
            else { return true; }   
        }  
    }  
};  

$(function(){  
 
        /**************************** 
         * 作者：q821424508@sina.com   * 
         * 时间：2012-08-20            * 
         * version：2.1              * 
         *                          * 
         ****************************/  
        document.getElementsByTagName("body")[0].onkeydown =function(event){  
              
        	if (!event) {  
        		event = window.event; //针对ie浏览器  
            }
            //获取事件对象  
            var elem = event.relatedTarget || event.srcElement || event.target ||event.currentTarget;   
              
            if(event.keyCode==8){//判断按键为backSpace键  
              
                    //获取按键按下时光标做指向的element  
                    var elem = event.srcElement || event.target;   
                      
                    //判断是否需要阻止按下键盘的事件默认传递  
                    var name = elem.nodeName;  
                      
                    if(name!='INPUT' && name!='TEXTAREA'){  
                        return _stopIt(event);  
                    }  
                    var type_e = elem.type.toUpperCase();  
                    if(name=='INPUT' && (type_e!='TEXT' && type_e!='TEXTAREA' && type_e!='PASSWORD' && type_e!='FILE')){  
                            return _stopIt(event);  
                    }  
                    if(name=='INPUT' && (elem.readOnly==true || elem.disabled ==true)){  
                            return _stopIt(event);  
                    }  
                }  
            }  
        });  
    function _stopIt(e){  
            if(e.returnValue){  
                e.returnValue = false ;  
            }  
            if(e.preventDefault ){  
                e.preventDefault();  
            }                 
      
            return false;  
    }  