<?php

$get_time = date('Y-m-d',strtotime('-6 day'))." 00:00:00";
$sql	=	"select id,order_value,order_num,update_time,user_id,assets,status,about from money where `user_id`='".$_SESSION["userid"]."' and (`type`='在线支付' or `type`='后台充值') and `update_time`>='$get_time' order by id desc";
$query	=	$mysqli->query($sql);
while($row = $query->fetch_array()){
    $cunkuan_list[] = $row;
}

$subPage = '';
$sum = 0;
if($cunkuan_list && count($cunkuan_list)>0){
    foreach ($cunkuan_list as $key =>$cunkuan_info) {
        $statusString = "";
        if($cunkuan_info["status"]=="成功"){
            $sum += $cunkuan_info["order_value"];
            $statusString =  '<span style="color:#FF0000;">成功</span>';
        }else if($cunkuan_info["status"]=="失败") {
            $statusString = '<span style="color:#000000;">失败</span>';
        }else{
            $statusString = '<span style="color:#0000FF;">系统审核中</span>';
        }

        $subPage = $subPage.'
<tr >
<td style="text-align:center;">'.$cunkuan_info["order_num"].'</td>
<td style="text-align:center;">'.$cunkuan_info["update_time"].'</td>
<td style="text-align:center;">'.$cunkuan_info["order_value"].'</td>
<td style="text-align:center;">'.$statusString.'</td>
<td style="text-align:center;">'.$cunkuan_info["about"].'</td>
</tr>';
    }
    $subPage .= '<tr ><td colspan="5" style="text-align:center;">本页存款成功总金额：'.$sum.'</td></tr>';
}else{
    $subPage = '<td colspan="5" style="text-align:center;">暂时没有存款信息。</td>';
}
?>
<script type="text/javascript">
    function chgType(type) {
        switch(type) {
            case 'ballRecord':
                f_com.MChgPager({method: 'ballRecord'});
                break;
            case 'lotteryRecord':
                f_com.MChgPager({method: 'lotteryRecord'});
                break;
            case 'liveHistory':
                f_com.MChgPager({method: 'liveHistory'});
                break;
            case 'gameHistory':
                f_com.MChgPager({method: 'gameHistory'});
                break;
            case 'skRecord':
                f_com.MChgPager({method: 'skRecord'});
                break;
            case 'a3dhHistory':
                f_com.MChgPager({method: 'a3dhHistory'});
                break;
            case 'TPBFightHistory':
                f_com.MChgPager({method: 'TPBFightHistory'});
                break;
            case 'TPBSPORTHistory':
                f_com.MChgPager({method: 'TPBSPORTHistory'});
                break;
            case 'cqRecord':
                f_com.MChgPager({method: 'cqRecord'});
                break;
            case 'chakan_qukuan':
                f_com.MChgPager({method: 'chakan_qukuan'});
                break;
            case 'chakan_cunkuan':
                f_com.MChgPager({method: 'chakan_cunkuan'});
                break;
            case 'chakan_huikuan':
                f_com.MChgPager({method: 'chakan_huikuan'});
                break;
        }
    }

    var oMsg = {
        "totalPage": {},    //總頁數
        "pageMsg": 10,      //每頁顯示訊息數
        "msglist": $('#general-msg'),
        'currentPage': 1,    //當前頁碼
        "page": function(p) {
            this.msglist.find("tr").css({"background-color": ""});
            $(".msgcontent").remove();
            oMsg.currentPage = p;
            this.totalPage = Math.ceil(this.msglist.find("tr").length / this.pageMsg);

            if(this.totalPage > 1) {
                $("#msgfoot").show();
            }
            if(this.totalPage == 1) {
                $("#msgfoot").hide();
            }
            $("#msgfoot tr td").html("");
            oMsg.msglist.find("tr").hide();

            //判斷最後一頁是否有筆數
            if(oMsg.currentPage > this.totalPage) {
                oMsg.currentPage = this.totalPage ;
            }
            for(var i = ((oMsg.currentPage-1) * oMsg.pageMsg ) ; i < oMsg.pageMsg + ((oMsg.currentPage - 1) * oMsg.pageMsg); i++) {
                oMsg.msglist.find("tr:eq(" + i + ")").show();
            }
            for(var t = 1 ; t <= this.totalPage ; t++) {
                if(oMsg.currentPage == t) {
                    $("#msgfoot tr td").append("<span id='currentpage'>" + t + "</span>");
                } else {
                    $("#msgfoot tr td").append("<a class='pagelink' href='#' onclick='oMsg.page(" + t + ")'>" + t + "</a>");
                }
            }
        }
    }

    oMsg.page(oMsg.currentPage);

    $(".MMain tbody tr").hover(function(){
        $("td", this).addClass("mouseenter");
        $("td a", this).addClass("mouseenter");
    }, function() {
        $("td", this).removeClass("mouseenter");
        $("td a", this).removeClass("mouseenter");
    });
</script>
<div id="MACenterContent">
    <div id="MNav">
        <span class="mbtn" >交易记录</span>
        <div class="navSeparate"></div>
    </div>
    <div id="MNavLv2">
        <span class="MGameType MCurrentType" onclick="chgType('liveHistory');">真人记录</span>｜
        <span class="MGameType" onclick="chgType('skRecord');">彩票投注记录</span>｜
		<span class="MGameType" onclick="chgType('ballRecord');">体育投注记录</span>｜
        <span class="MGameType" onclick="chgType('cqRecord');">存取款记录</span>｜
    </div>
    <div id="MMainData" style="margin-top: 8px;">
        <div class="MControlNav">
            日期：
            <input type="text" value="<?=date('Y-m-d',strtotime('-6 day'))?>" style="width: 70px;background-color: white;" disabled="disabled"/> ~
            <input type="text" value="<?=date('Y-m-d')?>" style="width: 70px;background-color: white;" disabled="disabled"/>

            &nbsp;&nbsp;&nbsp;&nbsp;
            <input type="button" class="MBtnStyle" value="在线存款记录" onclick="chgType('chakan_cunkuan');" onmouseover="mover(this);" onmouseout="mout(this);" />
            <input type="button" class="MBtnStyle" value="汇款记录" onclick="chgType('chakan_huikuan');" onmouseover="mover(this);" onmouseout="mout(this);" />
            <input type="button" class="MBtnStyle" value="取款记录" onclick="chgType('chakan_qukuan');" onmouseover="mover(this);" onmouseout="mout(this);" />
        </div>

        <table class="MMain" border="1">
            <thead>
            <tr>
                <th width="28%" align="center">存款流水号</th>
                <th width="22%" align="center">存款时间</th>
                <th width="15%" align="center">存款金额</th>
                <th width="15%" align="center">存款状态</th>
                <th width="20%" align="center">备注</th>
            </tr>
            </thead>
            <tbody id="general-msg">
            <?=$subPage?>
            </tbody>
            <tfoot id="msgfoot" style="display:none;">
            <tr><td colspan='5' style='text-align:center;'></td></tr>
            </tfoot>
        </table>
    </div>
</div>