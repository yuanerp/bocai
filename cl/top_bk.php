<?
session_start();
header("Expires: Mon, 26 Jul 1970 05:00:00 GMT");
header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
header("Cache-Control: no-cache, must-revalidate");
header("Pragma: no-cache");
header("Content-type: text/html; charset=utf-8");
include "../app/member/include/com_chk.php";
include "../app/member/include/address.mem.php";
include "../app/member/cache/website.php";
include_once($C_Patch."/app/member/class/sys_announcement.php");
$msg = sys_announcement::getOneAnnouncement();

?>
<!DOCTYPE html>
<html class="first zh-cn isLoginN ">
    <head>
    <meta charset="UTF-8">
    <title>Welcome</title>
    <link href="/cl/tpl/commonFile/css/standard.css" rel="stylesheet"/>
    <link href="/cl/tpl/starball/ver1/css/starball.css" rel="stylesheet"/>
    <script src="/cl/js/jquery-1.7.2.min.js"></script>
    <script src="/cl/js/common.js?v=2.0"></script>
    <script src="/cl/js/tools/upup.js"></script>
    <script src="/cl/js/tools/float.js"></script>
    <script src="/cl/js/pluging/swfobject.js"></script>
    <script src="/cl/js/pluging/jquery.cookie.js"></script>
    <script src="/cl/tpl/starball/ver1/js/starball.js"></script>
    <script src="/cl/js/tools/ScrollPic.js"></script>

    <!--[if IE 6]>
    <style type="text/css">
        html {
            overflow-x: hidden;
        }

        body {
            padding-right: 1em;
        }
    </style>
    <script src="/cl/js/pluging/jquery.ifixpng.js"></script>
    <script>
        $(function () {
            $('img[src$=".png?_=171"],img[src$=".png"],.blk_29 .LeftBotton, .blk_29 .RightBotton').ifixpng();
        });
        //修正ie6 bug
        try {
            document.execCommand("BackgroundImageCache", false, true);
        } catch (err) {
        }
    </script>
    <![endif]-->
    <script>
        <!--
        //Global variable for calculating page generation time
        var PageInitTime = new Date();
        var GameType = '';
		
		
		function _getYear(d){
			var yr=d.getYear();
			if(yr<1000) yr+=1900;
			return yr;
		}	
		function dateAdd(dateObj,days){
		var tempDate = dateObj.valueOf();
		tempDate = tempDate - days * 24 * 60 * 60 * 1000;
		tempDate = new Date(tempDate);
		return tempDate;
		} 
		function tick(){
			function initArray(){
				for(i=0;i<initArray.arguments.length;i++) this[i]=initArray.arguments[i];
			}
			var isnDays=new initArray("星期日","星期一","星期二","星期三","星期四","星期五","星期六","星期日");
			var todayy=new Date();
			var today =dateAdd(todayy,0.5);
			var hrs=today.getHours();
			var _min=today.getMinutes();
			var sec=today.getSeconds();
			var clckh=""+((hrs>12)?hrs-12:hrs);
			var clckm=((_min<10)?"0":"")+_min;clcks=((sec<10)?"0":"")+sec;
			var clck=(hrs>=12)?"下午":"上午";
			
			//document.getElementById("t_2_1").innerHTML = _getYear(today)+"/"+(today.getMonth()+1)+"/"+today.getDate()+"&nbsp;"+clckh+":"+clckm+":"+clcks+"&nbsp;"+clck+"&nbsp;"+isnDays[today.getDay()];
			document.getElementById("t_2_1").innerHTML ="美东时间:"+ _getYear(today)+"/"+(today.getMonth()+1)+"/"+today.getDate()+"&nbsp;"+clck+clckh+":"+clckm+":"+clcks;
			
			window.setTimeout("tick()", 100); 
		}

    function HotNewsHistory(){
            window.open('/app/member/help/noticle.php','newwindow','menubar=no,status=yes,scrollbars=yes,top=150,left=408,toolbar=no,width=575,height=550');
        }
		
		
        // -->
		function i(ur,w,h){
		document.write('<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0" width="'+w+'" height="'+h+'"> ');
		document.write('<param name="movie" value="' + ur + '">');
		document.write('<param name="quality" value="high"> ');
		document.write('<param name="wmode" value="transparent"> ');
		document.write('<param name="menu" value="false"> ');
		document.write('<embed src="' + ur + '" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="'+w+'" height="'+h+'" wmode="transparent"></embed> ');
		document.write('</object> ');
		} 
    </script>
    </head>
    <body>
    
<style>
#mainBody_bg{background: url(../pic/header_bg.png) no-repeat scroll center top; height:228px;}
#mainBody{background:none;}
#header{ background:none;height:150px;}
.block1{height: auto;width: 1000px;}
#menu{ background:none;}
.blank4{height:0px;}
#menu .normal a, #menu .active a{color:#4B1300;font-weight:bolder;font-size:15px; display:block;width:108px; height:35px;}
#menu .normal a:hover{background:url(../pic/nav_bg.png);}
#menu ul{top:5px;}
#header-logo{width:420px; height:135px; margin-top:8px; background:none;}
#header-logo p{ color:#E0B600; margin-bottom:10px;}
#headtop{height:145px;}
#hdselect{background:none; padding-right:10px;}
.login_ip{height:30px;}
.login_ip1{background: url("/pic/text3.png") no-repeat scroll left top;width: 190px;}
.login_ip2{background: url("/pic/text3.png") no-repeat scroll left top;width: 140px;}
.login_ip3{background: url("/pic/text3.png") no-repeat scroll left top;width: 110px;}
.login_ip3 img{ margin-top:3px;}
.login_input01{background:none;color:#CAA956;height:21px;line-height:21px;outline:medium none;padding:3px 8px;}
.login_input02{background:none;color:#CAA956;height:21px;line-height:21px;outline:medium none;padding:3px 0 3px 5px;}
#loginbox1{float:right;width:440px;margin-top:25px; position: relative;
    left: 200px;}
#loginbox2{float:right;width:303px;top:-90px;    position: relative;
    left: 200px;}
#ibtnLogin{background: url("/pic/btn_login.png") no-repeat scroll left top;width:98px;height:36px; margin: -4px -1px;}
#loginbox2 a.forpwd{background:url("/pic/btn_forget.png") no-repeat scroll left top;width:98px;height:36px;    margin: -18px -1px;}
#loginbox2 a.zc{background:url("/pic/btn_joinus.png") no-repeat scroll left top;width:98px;height:36px; display:block;margin: -4px -1px;margin-left:-1px  \9;
*margin-left:-210px;_margin-left:-210px;}

#menu .normal, #menu .active {width:105px;}
#SU-Menual-first ul li{ padding:3px 0px;}
#SU-Menual-first ul li a{ padding:0 5px;}


</style>


    <div id="mainBody_bg">
    <div id="mainBody">



<div class="block1">

<div id="header">

      <div id="header-logo">
      	<p>欢迎光临皇冠国际</p>
      	<script type="text/javascript" language="javascript">i('/pic/logo.swf','320','98')</script>
      </div> 
      
       
      <div id="headtop">
	       <div id="hdselect">
                       <a href="/member/check/speed.php" target="_blank">备用网址</a>&nbsp;| &nbsp;<a href="javascript:f_com.setHomepage('<?= BROWSER_IP ?>');">设为首页</a>&nbsp;|&nbsp;<a href="javascript:f_com.bookmarksite('<?= BROWSER_IP ?>','<?= $web_site['web_name'] ?>');">收藏本站</a>&nbsp;|&nbsp;语言:简体中文
					 
		   </div>
	<?
    //如果未登入
    if (!$uid){
    ?>
          <!-- <div id="loginbox3">
				 <div id="idxreg"><a onclick="click_url('/cl/reg.php')" href="javascript:void(0);"></a></div>
				 <div id="idxkefu"><a onclick="BBOnlineService();" href="javascript://"></a></div>
		   </div>-->		
		   <div class="clear"></div>       
       <form name="LoginForm" id="LoginForm" onsubmit="return false;">         
	        <div id="loginbox1">	    
			      <div class="login_ip login_ip1">
							<input type="text" onfocus="if(this.value=='账号'){this.value='';}" onblur="if(this.value==''){this.value='账号';}" value="账号" class="login_input01" maxlength="20" tabindex="1" id="username" name="username">
				   </div>
				   <div class="login_ip login_ip2">
                            <input type="text" class="login login_input01" id="mockpass" value="密码" onfocus="document.getElementById('mockpass').style.display='none'; document.getElementById('passwd').style.display=''; document.getElementById('passwd').focus();">
							<input type="password" style="display: none;" onblur="if(this.value=='') {document.getElementById('passwd').style.display='none'; document.getElementById('mockpass').style.display='';}" class="login login_input01" id="passwd" name="passwd">
				   </div>			   
				   <div class="login_ip login_ip3">
                            <input type="text" value="验证码" onfocus="if(this.value==this.defaultValue) {this.value=''}" onblur="if(this.value=='') {this.value=this.defaultValue}" class="rmNum  login_input02" id="rmNum" maxlength="4" name="rmNum" style="width:50px;">
        					<img width="45" height="20" border="0" align="absmiddle" src="/yzm.php" onclick="getKey();" id="vPic">
				   </div>			   
			</div>
			<div id="loginbox2">
			    <a class="zc" onclick="click_url('/cl/reg.php')"  href="javascript:void(0);"></a><br>
			     <a class="forpwd" href="javascript:alert('请联系客服咨询！');"></a><br>
				  <input type="button" id="ibtnLogin" name="formsub" onclick="aLeftForm1Sub();"><br>
			</div> 
			</form>
        	  <?
            }else{
            ?>
            <div style="width:500px;float:right;text-align:right;margin-right:5px;">
            <div id="top_login">
              <ul>
                <li>AG余额:<font size="2" id="tz_money">---</font></li>
                <li>BB余额:<font size="2" id="live_money">0</font></li>
                <li>账户余额:<font size="2" id="user_money">0</font></li>
                <li>帐号:<font size="2"><b>
                <?= $username; ?>
                </b></font></li>
              </ul>
            </div>
            <div id="mp3"></div>
            
            <!--  sub  --> 
            <!--[if IE 6]>
        <div></div><![endif]-->
            <div id="SU-Menual-first">
              <ul>
                <li> <a id="su-macenter" href="javascript: f_com.MGetPager('MACenterView','memberData');" title="会员中心">会员中心</a> &nbsp;|&nbsp; </li>
                <li> <a id="su-deposite" href="javascript: f_com.MGetPager('MACenterView','bankSavings');" title="线上存款">线上存款</a> &nbsp;|&nbsp; </li>
                <li> <a id="su-withdraw" href="javascript: f_com.MGetPager('MACenterView','bankTake');" title="线上取款">线上取款</a> &nbsp;|&nbsp; </li>
                
                <li> <a id="su-switch" href="javascript: f_com.MGetPager('MACenterView','moneyView');" title="额度转换">额度转换</a> &nbsp;|&nbsp; </li>
                <li> <a id="su-account" href="javascript: f_com.MGetPager('MACenterView','ballRecord');" title="往来记录">往来记录</a> &nbsp;|&nbsp; </li>
                <li> <a id="su-msg" href="javascript: f_com.MGetPager('MACenterView','msg');" title="未读讯息"><span id="msg_num_total">未读讯息(<span id="msg_num"></span>)</span> &nbsp;</a> |&nbsp; </li>
                <li> <a id="su-logout" href="javascript: f_com.logoff('/app/member/logout.php');" title="登出">退出</a> </li>
              </ul>
            </div>
           </div>
            <? } ?>
	  </div> 
</div>
        
        <div class="clear"></div>       
        <div class="blank4"></div>
        <div id="menu">
            <div style="position:absolute;z-index:2;left:275px;top:0px;"><img src="/images/re.gif"></div>
            <ul>
                  <li class="normal"><a class="pngfix"  onclick="click_url('/cl/main.php')" href="javascript:void(0);">首页</a></li>
                  <li class="normal"><a class="pngfix " target="_self" onclick="click_url('/app/member/sport.php')" href="javascript:void(0);">体育赛事</a></li>
                  <li class="normal"><a class="pngfix " onclick="click_url('/member/zhenren/mylive.php')" href="javascript:void(0);">真人视讯</a></li>
                  
                   <li class="normal"><a class="pngfix " onclick="click_url('/member/zhenren/dzyx.php')" href="javascript:void(0);">电子游戏</a></li>
                  <li class="normal"><a class="pngfix " onclick="click_url('/member/lt/?rtype=SPbside')" href="javascript:void(0);">六合彩</a></li>
                 <li class="normal"><a class="pngfix " onclick="click_url('/member/lottery/Cqssc.php?1=1')" href="javascript:void(0);">彩票游戏</a></li>
				 <!--  <li class="normal"><a class="pngfix " onclick="click_url('http://777.tzh2.com/')" href="javascript:void(0);" target="_blank">彩票游戏</a></li> -->
                  <li class="normal"><a target="_self" onclick="click_url('/cl/offer.php')" href="javascript:void(0);" id="textGlitter">优惠活动</a></li>
                  <!--<li class="normal"><a class="pngfix" target="_blank" href="/member/mobile/mobile.html">手机投注</a></li>-->
                  <li class="normal"><a href="javascript:click_url('/app/member/help/dlhz.php');">代理合作</a></li>
                  <!--<li class="normal"><a href="/member/check/speed.php" target="_blank">备用网址</a></li>-->
                  
                  <li class="normal"><a onclick="window.open('http://t.ibangkf.com/i/chat-hg66g.html?l=hg66g&page=file%3A///C%3A/Documents%2520and%2520Settings/Administrator/%25E6%25A1%258C%25E9%259D%25A2/hs.html&t=1460449591311', '皇冠国际娱乐城', 'height=400, width=700, top=200, left=200, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no');" href="javascript:;"> 在线客服</a></li>
                  
                  <!--<li class="normal"><a <? if (!$uid){?> href="javascript:alert('请先会员登录后在充值!');" <?php }else{?> href="javascript: f_com.MGetPager('MACenterView','bankSavings');" <?php }?>>在线存款<span class="kf_rr"></span></a></li>-->
            </ul>
        </div>
        <!--<div class="blank1"></div>-->
        <div style="clear: both;width:1000px; height:30px;margin-top:5px; overflow:hidden;"><div style="padding: 10px auto; height: 25px; float: left; width: 100px; text-align: center; color: yellow; line-height: 25px;vertical-align: middle;">最新消息:</div><div style="float: left; width: 900px; height: 25px; line-height: 25px;vertical-align: middle;color:#fff;"><marquee onclick="HotNewsHistory();" style="cursor:pointer;" scrollamount="2"><?=$msg;?></marquee></div></div>
        </div>

    </div>
 </div>
</body>
</html>
<script src="/cl/js/tools/tab.js"></script>
<script src="/pt/assets/js/lib/sound.js"></script>
<script>
    <!--
    //最新消息
    $.ajax({
        type: 'POST',
        url: '?module=MGetData&method=GetHotNews&_r=' + Math.random(),
        cache: false,
        success: function (data) {
            $('#msgNews').html(data.replace(/<\s*br\/*>/gi, "&nbsp;&nbsp;"));
        }
    });
    // 密碼驗證
    $('input[name=passwd]').LoginPW({
       // 'Upper': '提醒：密码须为小写，大写锁定启用中',
        'Short': '密码长度不能少于6个字元',
        'Long': '密码长度不能多于20个字元'
        //'False': '密码须符合0~9及a~z字元'
    });
    function inputCheck() {
        if (document.LoginForm.username.value == "") {
            alert('请输入帐号!!');
            document.LoginForm.username.focus();
            return false;
        } else if (document.LoginForm.passwd.value == "") {
            alert('请输入密码!!');
            document.LoginForm.passwd.focus();
            return false;
        } else if (document.LoginForm.passwd.value.length > 0 && document.LoginForm.passwd.value.length < 6) {
            alert('密码长度不能少于6个字元');
            document.LoginForm.passwd.focus();
            return false;
        } else if (document.LoginForm.rmNum.value == "") {
            alert('请输入验证码!!');
            document.LoginForm.rmNum.focus();
            return false;
        }
        return true;
    }
    function Go_forget_pwd() {
        window.open("/app/member/forget_pwd.php?uid=guest", "Go_forget_pwd", "width=350,height=250,status=no");
    }

    function Language(langx) {
        parent.location = '".BROWSER_IP."';
    }

    function getKey() {
        $("#vPic").attr("src",'/yzm.php?'+Math.random());
        $("#vPic").css("display", "inline");
        $("#crPic").css("display", "inline");
        $("input[name='rmNum']").val("");
    }

    //下載版JS
    function downloadvwin() {
        window.open('/cl/?module=MRule&method=InstallationInstruction&type=download', 'downloadnew', 'width=1024,height=640,status=no,scrollbars=yes');
    }

    //文字閃爍
    new toggleColor('#textGlitter', ['#4B1300', '#F00A0A'], 500);

    //按鈕特效
    $('.hover_fade > a, .hover_fade > span, #event a, #joinUs a, #welcome div').hover(
        function () {
            $(this).stop().animate({'opacity': 0}, 650);
        }, function () {
            $(this).stop().animate({'opacity': 1}, 650);
        }
    );

    $("li.LS-live, li.LS-game").subTabs();

    //表單效果
    $("#LoginForm label").InputLabels();


    //設為首頁
    f_com.setHomepage = function (url) {
        if (document.all) {
            document.body.style.behavior = 'url(#default#homepage)';
            document.body.setHomePage(url);
        } else {
            alert("您的浏览器未支援此功能!");
        }
    };

    // 加入最愛
    f_com.bookmarksite = function (url, title) {
        if (window.sidebar || window.opera) {
            // for firfox
            window.sidebar.addPanel(title, url, "");
        } else if (document.all) {
            // for IE
            window.external.AddFavorite(url, title);
        } else {
            alert("您的浏览器未支援此功能!");
        }
    };
    //-->
</script>

<?php if ($uid) { ?>

    <script language="javascript">
         function top_money1(){
            $.get("/newag2/cha.php?callback=?",function(data){
                 data = eval('('+data+')');
                     $("#tz_money").html(data.general);                         
                 }
            );
            $.get("/newbbin2/cha.php?callback=?",function(data){
                data = eval('('+data+')');
                $("#live_money").html(data.general);
            });
            $.getJSON("/app/member/getdata.php?callback=?",function (json)
            {
                    if (json.close == 1) {
                        parent.location.href = '/close.php';
                    }
                    $("#user_money").html(json.user_money);
            });  

        }
        function top_money() {
            $.getJSON("/app/member/getdata.php?callback=?", function (json) {
                    if (json.close == 1) {
                        parent.location.href = '/close.php';
                    }
                    $("#tz_money").html(json.tz_money);
                    $("#user_money").html(json.user_money);
                    $("#live_money").html(json.live_money);
                    if(json.unread_count && json.unread_count>0){
                        $("#msg_num").html(json.unread_count);
                        shake($("#msg_num_total"),"red",5);
                        $("#mp3").html("<embed src='/images/new_info.mp3' width='0' height='0'></embed>");
                    }else{
                        $("#msg_num").html(0);
                    }

                }
            );
            setTimeout("top_money()", 5000);
        }
        setInterval('top_money1();',5000);
        function shake(ele,cls,times){
            var i = 0,t= false ,o =ele.attr("class")+" ",c ="",times=times||2;
            if(t) return;
            t= setInterval(function(){
                i++;
                c = i%2 ? o+cls : o;
                ele.attr("class",c);
                if(i==2*times){
                    clearInterval(t);
                    ele.removeClass(cls);
                }
            },200);
        };
    </script>
<? } ?>



<!-- END ProvideSupport.com Custom Images Chat Button Code --><!--[if IE 6]>
<div id="ie6-infoBar">
    <span></span>
    <a id="ie6-boxclose" href="###">關閉</a>
    系统侦测到您使用旧版的浏览器,为维持最佳的浏览品质建议立即前往<a href="javascript:downloadvwin();">下载区</a>升级你的浏览器,建议使用较新版本的IE8,IE9,IE10,BB浏览器
    <iframe class="ie6-zindexHack"></iframe>
</div>
<script type="text/javascript">
    window.downloadvwin || (window.downloadvwin = function () {
        window.open('http://windows.microsoft.com/zh-CN/internet-explorer/products/ie/home', 'download', 'top=0,left=0,width=1000,height=600,location=yes,menubar=no,resizable=yes,scrollbars=yes,status=no,toolbar=no');
    })
    $(function () {
        var ie6InfoDiv = $("#ie6-infoBar");
        ie6InfoDiv.width($(window).width());
        $("#ie6-boxclose").click(function (e) {
            e.preventDefault();
            ie6InfoDiv.slideUp();
        });
        setTimeout(function () {
            ie6InfoDiv.slideToggle(800);
        }, 20000);

        ie6InfoDiv.slideToggle(800);
    });
</script>
<style type="text/css">
    * html {
        text-overflow: ellipsis;
    }

    #ie6-boxclose {
        float: right;
        padding-right: 20px;
        height: 25px;
    }

    #ie6-infoBar {
        display: none;
        font-size: 12px;
        width: 100%;
        position: absolute;
        top: expression(eval(document.documentElement.scrollTop));
        bottom: auto;
        left: 0px;
        color: #000;
        z-index: 9999;
        font-weight: 600;
        text-align: left;
        overflow: hidden;
        background: #DDD;
        height: 30px;
        line-height: 30px;
    }

    .ie6-zindexHack {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: -1; /*讓iframe在div下方*/
        filter: alpha(opacity=0); /*一定要使背景透明*/
    }

    #ie6-infoBar span {
        background: url(/cl/tpl/commonFile/images/warning.png) 0 0 no-repeat;
        width: 15px;
        height: 15px;
        margin: 6px 5px 0 5px;
        float: left;
    }

    #ie6-infoBar a {
        color: #F57900;
    }

    #ie6-infoBar a:hover {
        color: #FF9A37;
    }
</style>
<![endif]-->