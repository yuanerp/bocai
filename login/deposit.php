<?php
	session_start();
	if(!isset($_SESSION["uid"]) || !isset($_SESSION["username"])){
		header("Location:/login/login.php");
		exit();
	}
	session_start();
	if($_SESSION["username"]==''){
		header("Location: /login/login.php");
		exit;
	}
?>
<!DOCTYPE HTML>
<html>
	<head>
		<title>汇款中心</title>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width,user-scalable=no,target-densitydpi=medium-dpi" />
		<script src="/js/jquery-1.10.1.min.js" type="text/javascript"></script>
		<script>
			var ClientW = $(window).width();
			$('html').css('fontSize',ClientW/3+'px');
		</script>
		<style>
		*{ margin:0; padding:0; }
		html{ height:100%; background:#1A1309; }
		body{ font-size:0.14rem; height:100%;  font-family: "Arial","Microsoft YaHei","ºÚÌå","ËÎÌå",sans-serif;}
			.mainBox{ width:100%; height:100%; overflow:hidden;  background:#1A1309; }
			#headerBox{ width:100%; height:0.35rem; line-height:0.35rem; background:#986600; box-sizing:border-box; overflow:hidden;  position:relative;  }
			#headerBox a{ padding:0.12rem; border-radius:0.12rem; background:rgba(0,0,0,0.3) url(../../img/index_ico.png) center center no-repeat; background-size:70%; position:absolute; left:0.1rem; top:calc(0.18rem - 0.12rem); }
			#headerBox .logo{ display:block; position:absolute; left:calc(1.5rem - 0.54rem); top:calc(0.18rem - 0.16rem); height:0.3rem; }
			h1, .bank{ display:block; width: 100%;  height: 0.6rem;  text-indent: 0.5rem;  line-height: 0.6rem;  color: #fff;  font-size: 0.13rem;  border-bottom: 3px solid #000;     text-decoration:none; }
			h1{ background:none;  height:0.3rem; line-height:0.3rem; color:rgb(198, 164, 71); text-indent:0.2rem;}
			.bank:nth-of-type(3){ background:url(../img/erweima.png) no-repeat 0.15rem center;  background-size: 0.2rem;  }
			 .bank:nth-of-type(2){ background:url(../img/yihang.png) no-repeat 0.15rem center;  background-size: 0.2rem;  }
			  .bank:nth-of-type(1){background:url(../img/history.png) no-repeat 0.15rem center;  background-size: 0.17rem;   }
			  #footer{ width:3rem; height:0.35rem; line-height:0.35rem; overflow:hidden; text-align:center; color:#fff; background:#986600; position:absolute; bottom:0;}
			#footer a{ font-size:0.14rem; color:#E8E8E8; font-weight:bolder; display:inline-block; width:1rem; float:left; text-align:center; text-decoration:none; }
		</style>
	</head>
	<body>
		<article class="mainBox">
			<header id="headerBox">
				<a href="../wap.php"></a>
				<img class="logo" src="../img/logo.png" />
			</header>
			<h1>汇款方式</h1>
			<a class="bank" href="/cl/pages/bankM.php">在线存款</a>
			<a class="bank" href="/cl/pages/huikuanM.php">银行卡划款</a>
			<a class="bank" href="/cl/pages/huikuanMM.php">二维码支付</a>
			<footer id="footer">
				<a href="/register/register.php">免费开户</a>
				<!--<a href="/newag2/ed5.php">额度转换</a> -->
				<a href="http://www.yl00853.com/index1.php">电脑版</a> 
				<a href="/login/login.php">登录</a>
			</footer>
		</article>
	</body>
</html>