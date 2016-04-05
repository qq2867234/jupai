<%@ page pageEncoding="UTF-8"%>
<div class="header">
    <h1>
    <a href="/">真格在线科技有限公司</a>
    </h1>
    
   <ul class="navBar">

        <li><a href="###" class="btn btn-primary hollowBtn btn-lg" id="addRentOrSearchRent">我要出租</a></li>
        <li>
            <a id="user" class="nav" href="###"><b>个人中心</b></a>
            <ul id="userMenuList"></ul>
        </li>
        <li><a href="###" class="nav loginBtn">登录</a></li>
        <li><a id="market" href="/Market.action" class="nav" target="_blank">行情</a></li>
        <li><a id="searchMenu" href="/search" class="nav" target="_blank">找房</a></li>
        <!-- <li><a href="/guide" class="nav" target="_blank">经验</a></li> -->
        <li><a href="/" class="nav">首页</a></li>
    </ul>
</div>
<div class="divPop" id="login">
    <div class="normalLogin">
        
        <ul id="logMenu">
            <li id="logLi" class="on"><a href="###">登录</a></li>
            <li id="registerLi"><a href="###">免费注册</a></li>
            <a id="login_close" href="###"></a>
        </ul>
        
        <form class="divContent form-inline loginForm" id="log" action="/Login.action?login" method="post">
            <div class="form-control">
                <label class="zgIcon zgIcon-user"></label>
                <input type="text" autocomplete="off" placeholder="请输入手机号" ignore="ignore" maxlength="11" name="loginId" id="loginId" sucmsg="" nullmsg="请输入手机号" datatype="m|e" errormsg="请输入正确的手机号" class="input-units-15" />
                <span id="loginValid" class="Validform_checktip"></span>
                <div class="divideLine"></div>
            </div>
            <div class="form-control">
                <label class="zgIcon zgIcon-lock"></label>
                <input type="password" autocomplete="off" placeholder="请输入密码" ignore="ignore" maxlength="16" name="password2" id="password" sucmsg="" nullmsg="请输入密码" altercss="gray" datatype="password" errormsg="请输入6-16位数字或字母" class="input-units-15"/>
                <span class="Validform_checktip"></span>
                <div class="divideLine"></div>
            </div>
            <div class="form-control codeArea" >
                <label class="zgIcon zgIcon-shield"></label>
                <input type="text" autocomplete="off" class="input-units-8" ignore="ignore" name="code" id="checkCodeStr" datatype="s4-4" placeholder="输入图片验证码" nullmsg="请输入验证码" errormsg="请输入正确的验证码"/>
                <button id="codeArea" class="code" type="button"></button>
                <span id="codeInfo" class="Validform_checktip"></span>
                <div class="divideLine codeImgLine"></div>
            </div>
            <div class="btn-group">
                <button id="logins" class="btn-only btn btn-danger" type="submit">登录</button>
            </div>
            <div class="form-control addly">
                <input id="ck_rmbUser" type="checkbox" name="rememberMe"/>
                <label for="ck_rmbUser" class="checkLabel">下次自动登录</label>
                <a class="forget" href="/UserCenterController.action?getPWDBackView">找回密码</a>
            </div>
        </form>
        
        <form class="divContent form-inline registerForm" id="regForm" action="/Register.action?reg" method="post" style="display:none;">
            <input style="display:none">
            <div class="form-control">
                <label class="zgIcon zgIcon-user"></label>
                <input type="text" autocomplete="off" maxlength="11" datatype="m" placeholder="请输入手机号" ignore="ignore" name="loginId" ajaxurl="/Register.action?checkloginId&type=3" id="regId" sucmsg="" nullmsg="请输入登录名" datatype="e|m" errormsg="请输入正确的手机号" class="input-units-15"/>
                <span id="regValid" class="Validform_checktip"></span>
                <div class="divideLine"></div>
            </div>
            <input style="display:none">
           <!--  <div class="form-control">
                <label class="zgIcon zgIcon-lock"></label>
                <input type="password" autocomplete="off" name="password2" ignore="ignore" placeholder="请输入6-16位密码" sucmsg="" nullmsg="请输入密码" id="password2" altercss="gray" datatype="password" errormsg="请输入6-16位数字或字母" class="input-units-15"/>
                <span class="Validform_checktip"></span>
                <div class="divideLine"></div>
            </div> -->
            <div class="form-control" >
                <label class="zgIcon zgIcon-shield"></label>
                <input type="text" autocomplete="off" class="input-units-8" name="password2" ignore="ignore" id="validCode" datatype="s6-6" placeholder="输入初始密码" nullmsg="请输入初始密码" errormsg="请输入正确的初始密码"/>
                <button id="sendMobileValidCode" type="button" class="btn btn-primary hollowBtn">获取初始密码</button>
                <span class="Validform_checktip"></span>
                <div class="divideLine codeLine"></div>
            </div>
            
            <div class="form-control rankOpt">
                <label for="ranking">选择身份</label>
                <input id="ranking" type="hidden" name="role"/>
                <ul class="radioBox">
                    <li useType="1">租客</li>
                    <li useType="3" class="noMargin">房东</li>
<!--                     <li useType="2" class="noMargin">经纪人</li>
 -->                </ul>
                <span class="Validform_checktip"></span>
            </div>
            <div class="btn-group">
                <button id="reg" class="btn-only btn btn-danger" type="submit">注册</button>
            </div>
            <div class="form-control addly">
                <input id="acceptTerms" type="checkbox" name="rememberMe" checked="checked"/>
                <label for="acceptTerms">我已阅读并接受<a href="#" id="linlClause">《使用条款》</a></label>
            </div>
        </form>
    </div>
    
</div>