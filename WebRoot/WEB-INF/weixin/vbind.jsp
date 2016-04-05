<%@ page contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>真格租房-绑定账号</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
<script type="text/javascript" src="/scripts/public/jquery-1.10.2.min.js"></script>
<script type="text/javascript" src="/scripts/public/public.js"></script>
<script type="text/javascript" src="/scripts/plugIn/bootstrap.min.js"></script>
<link href="/css/css/weixin/base.css" rel="stylesheet" type="text/css">
</head>
<body>

<!--     <div class="loginPan clearfix">
        <span id="login_close" class='zgIcon zgIcon-remove'></span>
        <ul class="tabUl">
            <li id="logLi" class="on">登录</li>
            <li id="registerLi">注册</li>
        </ul>
    </div>
    <form id="log" class="loginForm" action="/WeiXinComment.action?weiXinBind" method="post">
    <input type="hidden" name="openId" value="${openId }"/>
    <input type="hidden" name="location" value="${location }"/>
        <div class="input">
            <span class='zgIcon zgIcon-user'></span>
            <input type="text" ignore="ignore" class="itext " placeholder="邮箱或手机号" maxlength="32" name="loginId" id="loginId" sucmsg="登录名输入正确！" nullmsg="请输入登录名" datatype="e|m" errormsg="请输入正确的邮箱或者手机号码！"/>
             <span class="Validform_checktip"></span>
        </div>
        <div class="input">
            <span class='zgIcon zgIcon-lock'></span>
            <input type="password" ignore="ignore" class="itext " placeholder="请输入密码" maxlength="32" name="password" sucmsg="密码格式正确！" nullmsg="请输入密码" id="password"  altercss="gray" datatype="password" errormsg="请输入4-16位数字或字母！"/>
             <span class="Validform_checktip"></span>
        </div>
        
        <div class="input checkInput">
            <input id="ck_rmbUser" class="icheckbox" type="checkbox" name="rememberMe">
            <label for='ck_rmbUser' class="agent">下次自动登录</label>
            <span id="forgetA" class="forget"><a href="/UserCenterController.action?getPWDBackView">找回密码</a></span>
        </div>
        <button id="logins" class="btn btn-primary" type="button" >登录</button>
    </form>
    <form id="register" class="registerForm" action="/Register.action?reg" method="post" style='display:none;'>
        <div class="input">
            <span class='zgIcon zgIcon-user'></span>
            <input type="text" placeholder="请输入邮箱或手机号" ignore="ignore" class="itext " name="loginId" ajaxurl="/Register.action?checkloginId&type=3" id="regId" sucmsg="登录名输入正确！" nullmsg="请输入登录名" datatype="e|m" errormsg="请输入正确的邮箱或者手机号码！"/>
             <span class="Validform_checktip"></span>
        </div>
        <div class="input">
            <span class='zgIcon zgIcon-lock'></span>
             <input type="password" class="itext " name="password2" ignore="ignore" placeholder="请输入4-16位密码" sucmsg="密码格式正确！" nullmsg="请输入密码" id="password2"  altercss="gray" datatype="password" errormsg="请输入4-16位数字或字母"/>
             <span class="Validform_checktip"></span>
        </div>
        <input id="ranking" type="hidden" value="1" name="role" />
        <div id="rank_opt" class="clearfix">
            <span>请选择身份</span>
            <div id="rank_opt_list">
                <a href='###' class='on'>个人</a>
                <a href='###'>经纪人</a>
                <a href='###' class='last'>开发商</a>
            </div>
        </div>
        <button id="reg" class="btn btn-primary" type="submit" >免费注册</button>
        <div class='input checkInput'>
             <input id="acceptTerms" type="checkbox" class="icheckbox" checked>
             <span class="agent">我已阅读并接受<a href='#' id='linlClause'>《使用条款》</a></span>
        </div>
    </form> -->
<nav class="navbar navbar-default navbar-fixed-top">
    <div class="container-fluid">
        <a class="navbar-left" href="/mobile/home">
            <span class="glyphicon glyphicon-home"></span>
        </a>
        <div class="input-group searchDiv navbar-right">
          <input type="text" class="form-control" placeholder="关键字">
          <span class="input-group-btn">
            <button class="btn btn-default" type="button">
                <span class="glyphicon glyphicon-search"></span>
            </button>
          </span>
        </div><!-- /input-group -->
    </div>
</nav>
<div role="tabpanel" class="container">

  <!-- Nav tabs -->
  <ul class="nav nav-pills" role="tablist">
    <li role="presentation" class="col-xs-6 active"><a href="#logDiv" aria-controls="home" role="tab" data-toggle="tab">绑定</a></li>
    <li role="presentation" class="col-xs-6"><a href="#registerDiv" aria-controls="profile" role="tab" data-toggle="tab">注册</a></li>
  </ul>

  <!-- Tab panes -->
  <div class="tab-content">
    <div role="tabpanel" class="tab-pane active" id='logDiv'>
        <form action="/WeiXinComment.action?weiXinBind" method="post" id="log" class="loginForm">
            <input type="hidden" name="openId" value="${openId }"/>
            <input type="hidden" name="location" value="${location }"/>
            <div class="form-group">
                <label for="loginId">用户名</label>
                <input type="text" class="form-control" ignore="ignore" class="itext " placeholder="邮箱或手机号" maxlength="32" name="loginId" id="loginId" sucmsg="" nullmsg="请输入登录名" datatype="e|m" errormsg="请输入正确的邮箱或者手机号码！">
                <span class="Validform_checktip"></span>
            </div>
            <div class="form-group">
                <label for="password">密码</label>
                <input type="password" class="form-control"  ignore="ignore" class="itext " placeholder="请输入密码" maxlength="32" name="password" sucmsg="" nullmsg="请输入密码" id="password"  altercss="gray" datatype="password" errormsg="请输入4-16位数字或字母！">
                <span class="Validform_checktip"></span>
            </div>
            <button type="submit" class="btn btn-primary btn-lg btn-block">绑定账户</button>
        </form>
    </div>
    <div role="tabpanel" class="tab-pane" id="registerDiv">
        <form action="/Register.action?reg" method="post" class="registerForm">
            <div class="form-group">
                <label for="loginId">用户名</label>
                <input type="text" class="form-control" placeholder="请输入邮箱或手机号" ignore="ignore" class="itext " name="loginId" ajaxurl="/Register.action?checkloginId&type=3" id="regId" sucmsg="登录名输入正确！" nullmsg="请输入登录名" datatype="e|m" errormsg="请输入正确的邮箱或者手机号码！"/>
                <span class="Validform_checktip"></span>
            </div>
            <div class="form-group">
                <label for="password">密码</label>
                <input type="password" class="form-control"  name="password2" ignore="ignore" placeholder="请输入4-16位密码" sucmsg="" nullmsg="请输入密码" id="password2"  altercss="gray" datatype="password" errormsg="请输入4-16位数字或字母">
                <span class="Validform_checktip"></span>
            </div>
            <div class="form-group">
              <label for="ranking">请选择身份</label>
              <select id="ranking" class="form-control">
                <option value="1">个人</option>
                <option value="2" selected="selected">经纪人</option>
              </select>
            </div>
            <div class="checkbox">
              <label>
                <input type="checkbox" id="acceptTerms" checked>我已阅读并接受<a href='#' data-toggle="modal" data-target="#Terms">《使用条款》</a>
              </label>
            </div>
            <button type="submit" class="btn btn-primary btn-lg btn-block" id='reg'>注册用户并绑定</button>

        </form>
    </div>
    <div class="footer row">
        ©2015 真格在线&nbsp;&nbsp;&nbsp;&nbsp;400-115-6080
    </div>
  </div>

<div class="modal fade" id="Terms" tabindex="-1" role="dialog" aria-labelledby="termsTitle" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="termsTitle">使用条款</h4>
      </div>
      <div class="modal-body">
        <p>本网站由北京真格在线科技有限公司（以下简称“真格”）拥有、管理和维护。</p>
        <p>请本网站使用者（以下称“您”或者“用户”）在使用本网站之前仔细阅读以下条款，如果您使用本网站、或与本网站链接即表明您承认您已阅读、理解并同意受这些条款的约束，并遵守所有适用的法律和法规；如果您不同意这些条款，请不要使用本网站或链接至本网站。</p>
        <p>真格可随时更新本使用条款以及本网站中包含的任何其他信息，而无需通知您；真格还可以随时对本网站中描述的服务及内容进行改进或更改，而无需另行通知。</p>
        <h4>一、网站使用</h4>
        <p>未经真格事先的书面同意，不得复印、复制、再次公布、上载、张贴、传播、分发或使用本网站及其中的任何内容创作演绎作品。您使用本网站的条件是：您不修改本网站上显示的内容，完整地保留所有的版权、商标和其他专有权声明并且您接受该内容随附的任何条款、条件和声明，及本网站中的所有其他规定。尽管有上述规定，可从本网站下载、访问或进行其他使用的任何内容须受各自的许可条款、条件和声明的约束。</p>
        <p>如果您未遵守本网站上的条款、条件和声明，则您使用本网站的权利将自动终止，而无需事先通知，并且您必须立即销毁您所拥有或掌握的所有已下载资料副本。真格不授予您关于任何商标、版权或其他专有权或知识产权的任何明示的或暗含的权利或许可。</p>
        <h4>二、网站信息</h4>
        <p>1、本网站上的信息不附带任何有关正确性、最新性及完整性的承诺和保证，并且本网站可能包含有不够准确的地方或输入排版错误。真格不承担以下责任（且明确声明免除以下责任）：更新本网站使信息保持最新、或者确保任何已发布信息的准确性或完整性。因此，基于本网站的信息作出任何决策之前，您应该确认所有信息的准确性和完整性。</p>
        <p>2、本网站所转载的内容并不代表本网站的意见或观点，也不意味着本网站赞同其观点或证实其内容的真实性。</p>
        <p>3、对于本网站用户发布的所有信息，其真实性、准确性、合法性由发布者负责，本网站不提供任何保证、也不承担任何法律责任；这些信息如果侵犯了第三方的知识产权或其它权利，全部责任由发布者本人承担，本网站对此不承担任何责任。</p>
        <h4>三、第三方网站链接</h4>
        <p>本网站提供对第三方网站的链接，这些链接仅作为一种方便提供给您。真格对于任何非真格的网站不作任何声明、保证或其他承诺，即使这些第三方网站可能引用了任何真格的网站。到某个非真格网站点的链接并不意味着真格认可此类网站点的内容、使用或其所有者。此外，真格不是您可能与任何第三方签署协议的任何交易的一方、也不对任何交易负责，即使您从真格的网站了解到此类第三方（或使用到此类第三方的链接）的情况下也是如此。因此，您承认并同意，真格不对任何非真格的网站的可用性负责，也不对可从那些网站或资源上获得的任何内容、服务、产品或其他资料承担任何责任或义务。</p>
        <p>当您访问某个非真格的网站点（即使该站点可能包含真格的徽标），请理解该网站与真格无关并且真格不控制该网站上的内容。您须谨慎从事，避免遭受病毒和其他可能的破坏性程序入侵并采取您认为适当的方式保护您的信息；如果您决定访问任何与本网站链接的第三方网站，其可能带来的结果和风险全部由您自己承担。</p>
        <h4>四、到本网站的链接</h4>
        <p>到本网站的所有链接必须经过真格书面同意。除非真格同意该链接以及由该链接激活的页面并不：
        <p>（1）围绕本网站上的任何页面创建框架或使用其他以任何方式改变本网站内任何内容及其视觉效果或外观；</p>
        <p>（2）歪曲或不正确地描述您与真格之间的关系；</p>
        <p>（3）暗示真格同意或认可您、您的网站、您提供的服务或产品；并且</p>
        <p>（4）提供任何有关真格的错误的或令人误解的印象、或者以其他方式损害与真格名称或商标相关的商誉。要获得链接到本网站的许可权，您还须同意，真格可以随时自主决定终止链接到本网站的许可权；在这种情况下，您同意立即除去到本网站的所有链接并停止使用任何真格徽标。</p>
        <h4>五、隐私保护</h4>
        <p>1、本网站可能会接收到这些信息：</p>
        <p>（1）访问者信息</p>
        <p>我们将通过您的IP地址、或者在您的浏览器设置Cookie来记录您作为访问者的一些信息，例如您的浏览器类别、操作系统版本、网络服务提供商、访问时间、页面等，以优化对您呈现的页面和内容、改进对您的服务。</p>
        <p>（2）个人资料</p>
        <p>当您在本网站注册、或获取某些服务时，经您同意，本网站将要求您提供一些个人资料，例如：</p>
        <p>识别资料，如：姓名、性别、年龄、出生日期、身份证号码（或护照号码）、电话、通信地址、住址、电子邮件地址等。</p>
        <p>背景资料，如：工作单位、职业、职务、教育程度、收入水平、婚姻、家庭状况等。</p>
        <p>（3）机构资料</p>
        <p>当您所代表的机构在本网站注册、或获取某些服务时，经您所代表机构同意，本网站将要求您提供该机构资料。例如：机构名称、地址、电话、电子邮件地址、法人代表人姓名、营业执照号码、组织机构代码等。</p>
        <p>2、真格并不想通过本网站接收您的保密信息或专有信息。将任何信息或资料发送至真格，您即授予真格无限制的、不可撤销的使用权，允许真格按自己的方式使用这些资料或信息。</p>
        <p>您同意真格可以通过您提供的电话、电子邮件、地址，采用通话、邮寄、发送电子邮件、发送手机短信等方式与您联系。</p>
        <p>3、真格不会将上述资料用于本网站提供服务之外的其它目的，不会泄露您的个人、机构资料或以其他方式公布您向真格提交资料或其它信息这一事实，除非：</p>
        <p>（1）得到您的同意；或者</p>
        <p>（2）真格事先通知您提交至本网站某特定部分的资料或其他信息将被发布；或者</p>
        <p>（3）法律法规要求。</p>
        <p>4、下列情况导致上述资料泄露、丢失、被盗用或被篡改时，本网站不承担任何责任：</p>
        <p>（1）您将网站账号密码告知他人、或与他人共享网站账号、或者您用于身份验证的电邮或手机为他人所用。</p>
        <p>（2）系统软硬件Bug、网络故障、电力故障、黑客政击、计算机病毒等。</p>
        <h4>六、不保证声明</h4>
        <p>使用本网站所带来的风险由您自行承担。本网站的所有资料、信息、服务均“按现状”提供，不附有任何形式的保证或担保。在法律许可的最大范围内，真格明确声明免除所有明示的、暗含的、法定的和其他保证、担保、声明或承诺，包括但不限于有关适销、适用于某种特定用途以及有关所有权和知识产权的非侵权的保证。真格不保证此网站
            会中断、及时、安全或无错误。</p>
        <p>您理解并同意，如果您从本网站以任何方式获得资料、信息，则您自行决定执行上述操作，且风险由您自行承担，并且您须自行负责可能产生的任何损害或赔偿。</p>
        <h4>七、免责声明</h4>
        <p>任何情况下，对于本网站导致的、或由于使用本网站、或由于使用链接到、引用本网站、或通过本网站访问的任何网站或资源，或者由于使用、下载或访问任何资料、信息或服务而导致的、或与之相关的任何直接的、间接的、附带的、特别的、惩戒性的或任何种类的后果性的损害赔偿，包括但不限于任何利润的损失、商业中断、可节省金额的损失或其他数据的丢失，真格均不对任何一方负责，即使真格已被明确告知可能有此类损害赔偿时，也是如此。由用户自行承担使用本网站的风险。</p>
        <p>本网站提供的特定资料、信息和服务可能附加不同的条款、条件或声明。如有任何冲突，此类附加的或不同的条款、条件和声明将优先适用于本使用条款。</p>
        <h4>八、法律法规</h4>
        <p>您在使用本网站的过程中必须遵守国家法律和法规、对自己的言论和行为承担责任。如果您的言论或行为违反国家的法律或法规，本网站可随时不经事先通知终止向您提供服务。</p>
        <h4>九、解释权</h4>
        <p>真格拥有对本网站及本使用条款的最终解释权。</p>
        <p>（正文完）</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-info " data-dismiss="modal">关闭</button>
      </div>
    </div>
  </div>
</div>

</div>
</body>
</html>