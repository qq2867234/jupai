<%@ page pageEncoding="UTF-8"%>

<div class="gl-8 userMenu">
        <div class="headPic">
            
            <div class="name">
               
            </div>
        </div>
        <div class="lastLog">
            <b>最后一次登录时间为:</b> 
            <br />
            
        </div>
        <h2>
            个人设置
        </h2>
        <ul>
            <li><a href="/UserCenterController.action?goToUserCenter"><i class="zgIcon zgIcon-edit"></i>修改个人资料</a></li>
            <li><a href="/UserCenterController.action?goToSecurityCenter"><i class="zgIcon zgIcon-password"></i>修改密码</a></li>
        </ul>
        <h2>
            认证中心
        </h2>
        <ul id="verifyItems">
            <li><a href="/UserCenterController.action?goToCheckVerifyAuthority&dest=1"><i class="zgIcon zgIcon-phone"></i>手机认证</a></li>
            <li><a href="/UserCenterController.action?goToCheckVerifyAuthority&dest=2"><i class="zgIcon zgIcon-realName"></i>实名验证</a></li>
        </ul>
        <!-- <h2><a href="###">我的收藏<i class="zgIcon zgIcon-arrow"></i></a></h2> -->
        <h2><a href="/RentListController.action?goToContactPage">我的联系人<i class="zgIcon zgIcon-arrow"></i></a></h2>
    </div>
    <script type="text/javascript" src="/scripts/usercenter/userMenu.js"></script>