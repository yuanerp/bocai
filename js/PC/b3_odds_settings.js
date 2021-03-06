(function (space) {
    //更新賠率timer
    var _timer = null;
    //一字或二字快選群組
    var _rtypeGroup1 = ["W2","D2MC","D2MU","D2CU","W1","D1M","D1C","D1U"];
    //三字快選群組
    var _rtypeGroup2 = ["W3","W32","W33","D3MCU"];
    //遊戲分頁
    var _tab = [
                  {W1 : Lang('Portfolio'), D1M : "口XX", D1C : "X口X", D1U : "XX口"},
                  {W2 : Lang('Portfolio'), D2MC : "口口X", D2MU : "口X口", D2CU : "X口口"},
                  {W3 : Lang('Portfolio'), W32 : Lang("GS3"), W33 : Lang("GS6"), D3MCU : "口口口"},
                  {MCUF : "口口口", MCF : "口口X", MUF : "口X口", CUF : "X口口"},
                  {SN : "口口口", MCS : "口口X", MUS : "口X口", CUS : "X口口"}
                ];
    //動態下注例外的rtype
    //var _rtypeOther = ['GSS', 'GST', 'WP', 'FU4'];
    var _rtypeOther = ['FU4', 'W3', 'W32', 'W33', 'D3MCU'];
    //快選rtype
    var _rtypeQuick = ['W1','D1M','D1C','D1U','W3', 'W32', 'W33', 'D3MCU', 'W2', 'D2MC', 'D2MU', 'D2CU','GSS', 'GST', 'WP'];
    var _isIE6 = ((navigator.userAgent.indexOf("MSIE 6.") != -1) && (navigator.userAgent.indexOf("Opera") == -1));
    var _isIE7 = ((navigator.userAgent.indexOf("MSIE 7.") != -1) && (navigator.userAgent.indexOf("Opera") == -1));
    var _isIE8 = ((navigator.userAgent.indexOf("MSIE 8.") != -1) && (navigator.userAgent.indexOf("Opera") == -1));

    var _grpHeight = 0;

    //config set
    var _config = {
        url : {
            normal : 'odds_action.php',
            normal_hp : '/member/b3/b3.php',
            quick : 'odds_action2.php',
            fill_d3 : '/member/quickD3B3.php',
            switch_md : '/script/member/switchMode.php',
            switch_g : 'action.php',
            switch_a : 'oddssetting/B3/quick_action.php'
        },
        reg : {
            check1 : /^(GSS|GST|FU4)$/,
            check2 : /^WP$/,
            tips : /^OEOU$/,
            grp_w3 : /^W3(2|3)$/,
            grp_d3 : /^(D3MCU|W3)$/,
            grp_d3_head : /^Rio_H\[\]$/,
            grp_d3_mid : /^Rio_M\[\]$/,
            grp_d3_end : /^Rio_E\[\]$/,
            grp_d3_snf : /^Rio\[\]$/,
            grp_d2 : /^(W2|D2MC|D2MU|D2CU)$/,
            grp_d1 : /^(W1|D1M|D1C|D1U)$/,
            close_play : /^(W3|W32|W33|D3MCU)$/,
            ticked_grp : /^(W2|D2MC|D2MU|D2CU)$/
        },
        id : {
            grpBtn : 'GrpBtnB3',
            form : 'formB3',
            rtype : 'sRtype',
            gtype : 'sGtype',
            tips_n : 'Tips',
            tips_oe : 'Tips2',
            tab : 'tab',
            tab_line : 'space'
        },
        class_name : {
            on : 'ON',
            tab_on : 'onTagClick',
            tab_un : 'unTagClick',
            game_cancel : 'game_is_cancel',
            menu_on : 'NowPlay',
            menu_ani : 'aniDissolve'
        },
        selector : {
            grp_title : '#D3quick > p.grp-title',
            grp_tag : '#W3quick, #D3quick, #D2quick',
            grp_d3 : '#D3quick',
            grp_arrow : '#D3quick p.grp-title > span',
            grp_w3 : '#W3quick',
            grp_w3_a : '#W3quick a.quickH',
            grp_d3_rd : '#D3quick input[type=radio]',
            grp_d3_pk : '#D3quick p.cc input[name=pickup]',
            grp_d3_clr : '#D3quick p.cc input[name=Clear]',
            grp_d3_head : '#sHead',
            grp_d3_mid : '#sMid',
            grp_d3_end : '#sEnd',
            grp_d3_snf : '#get_num1',
            grp_d3_sn : '#get_num2',
            grp_d3_d : '#get_num3',
            grp_d3_checked : "#D3quick input[name='sCondition[]']:checked",
            grp_d3_rio : "#D3quick input[name^='Rio']:checked",
            grp_d2 : '#D2quick',
            grp_d2_head : '#D2quick > p a.quicka',
            grp_d2_end : '#D2quick > p a.quickb',
            grp_d1 : '#W1quick_Tbl',
            grp_d1_a : '#W1quick_Tbl a.activeA',
            gs_cb : "input[name='concede[]']",
            gs_all : "input.order[name='GTSALL']",
            fu4_cb : "input[name='concede[]']",
            fu4_h : 'input.FU4H:checked',
            fu4_t : 'input.FU4T:checked',
            fu4_o : 'input.FU4O:checked',
            wp_cb : "input[name*=concede]",
            wp_submit : '#SendB3 input[name=order]',
            wp_cancel : '#SendB3 input[name=Cancel]',
            cb : "input[name='concede[]']",
            submit : '#SendB3 input[name=order], #GrpBtnB3 p.cc input[name=order]',
            cancel : '#SendB3 input[name=Cancel], #GrpBtnB3 p.cc input[name=Cancel]',
            tab_now : 'div#tab > ul > li.onTagClick > span',
            tab_on : 'div#tab > ul > li.onTagClick',
            tab : 'div#tab > ul > li > span',
            range : 'div.Range > span > input[type=radio]',
            pkg : 'fieldset#PackgeBox > input.quickb',
            gsfu4_submit : '#SendB3 input[name=order]',
            gsfu4_cancel : '#SendB3 input[name=Cancel]',
            goldui : "input.G[name='gold[]']",
            switch_md : '#switchMode',
            fill_md : '#quickD3',
            quick : 'input.quickH,a.quickH,a.quickM,a.quickE,a.quicka,a.quickb,a.activeA,a.activeB',
            cb_total : "input[type=checkbox][name='concede[]']:checked",
            all_td : "table.GameTable td",
            rd_total : "input[type=radio][name*=concede]:checked",
            total : "#total_bet"
        }
    };
    /**
     * 計算秒數的格式
     * @param sec 秒數
     * @return r
     */
    function time_format (sec) {
        var r = {};
        r.d = Math.floor(sec / (24 * 3600));
        r.h = Math.floor((sec % (24*3600))/3600);
        r.m = Math.floor((sec % 3600)/(60));
        r.s = Math.floor(sec % 60);
        return r;
    }
    /**
     * 依rtype傳回相對應分頁陣列
     * @param rtype
     * @return array
     */
    function _checkShow(rtype) {
        switch (rtype) {
            case 'W1':
            case 'D1M':
            case 'D1C':
            case 'D1U':
                return _tab[0];
                break;
            case 'W2':
            case 'D2MC':
            case 'D2MU':
            case 'D2CU':
                return _tab[1];
                break;
            case 'W3':
            case 'W32':
            case 'W33':
            case 'D3MCU':
                return _tab[2];
                break;
            case 'MCUF':
            case 'MCF':
            case 'MUF':
            case 'CUF':
                return _tab[3];
                break;
            case 'SN':
            case 'MCS':
            case 'MUS':
            case 'CUS':
                return _tab[4];
                break;
            default:
                return null;
        }
    }
    /**
     * 手機網頁檢查是否顯示送出
     * @param intCheck 勾選的球號(包組模式)或下注金額(動態下注模式)
     */
    function mobileCheck(intCheck) {
        if (document.getElementById('Pad3D')) {
            var inputB = document.getElementById('Pad3D').getElementsByTagName('input');
            if (intCheck > 0) {
               inputB[0].style.display = '';
               inputB[1].style.display = '';
               if (inputB.length >= 3 && document.getElementById('isGrp')) {
                   inputB[2].style.display = 'none';
               }
            } else {
               inputB[0].style.display = 'none';
               inputB[1].style.display = 'none';
               if (inputB.length >= 3 && document.getElementById('isGrp')) {
                   if(document.getElementById('QuickDiv').x == 1){
                       inputB[2].style.display = 'none';
                   } else {
                       inputB[2].style.display = '';
                   }
               } else if (inputB.length >= 3) {
                   inputB[2].style.display = 'none';
               }
            }
        }
    }
    /**
     * 將陣列排序並join顯示
     * @return string
     */
    function show_a(shownum){
        return shownum.sort().join(',');
    }
    space.GameB3 = function (_json) {
        if (typeof _json == 'string') {
        } else if (_json != null) {
            var me = this;
            this._showTag = _json.showTag;
            (_json.FCDL instanceof jQuery) && (this.tagFCDL = _json.FCDL);
            (_json.FCDH instanceof jQuery) && (this.tagFCDH = _json.FCDH);
            (_json.FCDS instanceof jQuery) && (this.tagFCDS = _json.FCDS);
            if (_json['hall']) {
                _json.hall.click(function () {
                    var tp = document.getElementById('touchPadZone');
                    if (tp.x == 1) {
                        tp.x = 0;
                        tp.style.display = 'none';
                    } else {
                        tp.x = 1;
                        tp.style.display = 'block';
                        if (_isIE6) {
                        } else {
                            var idx = $('#Pad > div#' + me._gtype + '_Content').index();
                            $('.flexslider').flexslider({
                                selector: "#Pad.slides > div",
                                animation: "slide",
                                animationLoop : false,
                                slideshow : false,
                                startAt : idx
                            });
                        }
                    }
                });
            }
            if (_json.inner_box instanceof jQuery) {
                this._boxTag = _json.inner_box;
                this._boxTag.bind('animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd', function () {
                    this.className = '';
                });
            }
            if (_json.menu instanceof jQuery) {
                this.menu = _json.menu;
                this.menu.click(function () {
                    (me.onGameSwitch) && me.onGameSwitch.call(this, me);
                    return false;
                });
            }
            (_json.ticked) && (this.tickedTag = _json.ticked);
            (_json.tickedH) && (this.headTag = _json.tickedH);
            (_json.tickedM) && (this.midTag = _json.tickedM);
            (_json.tickedE) && (this.endTag = _json.tickedE);
            (_json.cname) && (this.cnameTag = _json.cname);
            (_json.ynum) && (this.ynumTag = _json.ynum);
            (_json.show_ticked) && (this.tickedBoxG = _json.show_ticked);
            (_json.show_ticked_one) && (this.tickedBox = _json.show_ticked_one);
            (_json.info_ticked) && (this.tickedInfo = _json.info_ticked);

            if (document.getElementById(_config.id.grpBtn)) {
                this.grpBtn = document.getElementById(_config.id.grpBtn);
                var _selector = _config.selector;
                $(_selector.grp_title, this.grpBtn).bind('click', function () {
                    if (this.x != 1) {
                        $(_selector.grp_d3, me.grpBtn).animate({height:_grpHeight + 'px'}, 600);
                        $(_selector.grp_arrow, me.grpBtn).html('▲');
                        this.x = 1;
                    } else {
                        $(_selector.grp_d3, me.grpBtn).animate({height:'24px'}, 600);
                        $(_selector.grp_arrow, me.grpBtn).html('▼');
                        this.x = 0;
                    }
                });
                $(_selector.grp_w3_a, this.grpBtn).bind('click', function () {
                     (me.onGsQuickClick) && me.onGsQuickClick.call(this, me);
                });
                $(_selector.grp_d3_rd, this.grpBtn).bind('click', function () {
                     (me.onD3RadioClick) && me.onD3RadioClick.call(this);
                });
                $(_selector.grp_d3_pk, this.grpBtn).bind('click', function () {
                     (me.onD3quickFilter) && me.onD3quickFilter.call(this, me);
                });
                $(_selector.grp_d3_clr, this.grpBtn).bind('click', function () {
                     (me.onFilterClear) && me.onFilterClear.call(this);
                });
                $(_selector.grp_d2_head, this.grpBtn).bind('click', function () {
                     (me.onD2HeadClick) && me.onD2HeadClick.call(this, me);
                });
                $(_selector.grp_d2_end, this.grpBtn).bind('click', function () {
                     (me.onD2EndClick) && me.onD2EndClick.call(this, me);
                });
            }
        }
    }
    space.GameB3.prototype = {
        //更新賠率的ajax後端網址
        odds_url : 'odds_action.php',
        //遊戲的checkbox
        _inpCb : {},
        //切換玩法的主要區域
        _boxTag : null,
        //顯示遊戲的主要區域
        _showTag : null,
        //遊戲表單
        _form : null,
        //提示的div
        tipsDiv :null,
        //下注模式
        _betMode : 0,
        //倒數秒數
        _reciprocal_sec : 1,
        //rtype
        _rtype : 'W1',
        //gtype
        _gtype : 'D3',
        //頭
        _head : [],
        //中
        _mid : [],
        //尾
        _end : [],
        //是否處於切換狀態
        _onSwitch : 0,
        //最小選取
        gsMin : 0,
        //最大選取
        gsMax : 0,
        //倒數計時tag
        tagFCDL : null,
        //倒數計時tag
        tagFCDH : null,
        //倒數計時tag
        tagFCDS : null,
        //快選div
        grpBtn : null,
        //選單
        menu : null,
        //顯示已勾選的html tag
        tickedTag : null,
        //顯示已勾選的頭html tag
        headTag : null,
        //顯示已勾選的中html tag
        midTag : null,
        //顯示已勾選的尾html tag
        endTag : null,
        //玩法中文名稱的html tag
        cnameTag : null,
        //年期數的html tag
        ynumTag : null,
        //顯示勾選資料的html tag (包含頭中尾)
        tickedBoxG : null,
        //顯示勾選資料的html tag (不包含頭中尾)
        tickedBox : null,
        //顯示勾選資訊的html tag
        tickedInfo : null,
        //組選送出
        btnSubmit : null,
        //組選取消
        btnCancel : null,
        /**
         * 初始化3D玩法設定
         */
        init : function () {
            var me = this, _id = _config.id, _selector = _config.selector, _reg = _config.reg;
            this._form = null;
            if (document.getElementById(_config.id.form)) {
                this._form = document.getElementById(_id.form);
            }
            (this._form) && (this._form.onsubmit = function () {return false;});
            if (_isIE6 || _isIE7 || _isIE8) {
                $('div.round-table', this._showTag).append('<div class="round-top-left" /><div class="round-top-right" /><div class="round-bottom-left" /><div class="round-bottom-right" />');
            }
            this._rtype = document.getElementById(_id.rtype).value;
            this._gtype = document.getElementById(_id.gtype).value;
            //设置mianFrame的高度
            var mainFrameHeight = 548;
            if(this._rtype=="W2"){
                mainFrameHeight = 600;
            }else if(this._rtype== "D2MC" || this._rtype== "D2MU" ||this._rtype== "D2CU"){
                mainFrameHeight = 825;
            }
            $(window.parent.document).find("#mainFrame").height(mainFrameHeight);

            if (this._betMode && ($.inArray(this._rtype, _rtypeOther) < 0)) {
                this.odds_url = _config.url.quick;
            } else {
                this.odds_url = _config.url.normal;
            }
            if (document.getElementById(_id.tips_n) && document.getElementById(_id.tips_oe)) {
                if (_reg.tips.test(this._rtype)) {
                    this.tipsDiv = document.getElementById(_id.tips_oe).style;
                } else {
                    this.tipsDiv = document.getElementById(_id.tips_n).style;
                }
            }
            var _over = function (e) {
                (me.onOver) && (me.tipsDiv) && me.onOver.call(me.tipsDiv, e);
            }
            var _out = function () {
                (me.onOut) && (me.tipsDiv) && me.onOut.call(me.tipsDiv);
            }
            //清空_inpCb
            this._inpCb = {};

            var _click = function () {
                (me.onCbClick) && me.onCbClick.call(this, me);
            }, _clickGS = function () {
                (me.onGsCbClick) && me.onGsCbClick.call(this, me);
            }, _clickFu4 = function () {
                (me.onCbFu4Click) && me.onCbFu4Click.call(this, me);
            };
            if (this._rtype == 'GSS' || this._rtype == 'GST') {
                $(_selector.gs_cb, this._form).each(function () {
                    this.onclick = _clickGS;
                    me._inpCb[this.value] = this;
                });
            } else if (this._rtype == 'FU4') {
                $(_selector.fu4_cb, this._form).each(function () {
                    this.onclick = _clickFu4;
                    me._inpCb[this.value] = this;
                });
            } else if (this._rtype == 'WP') {
                $(_selector.wp_cb, this._form).click(function () {
                    (me.onRadioClick) && me.onRadioClick.call(this);
                });
            } else {
                $(_selector.cb, this._form).each(function () {
                    this.onclick = _click;
                    me._inpCb[this.value] = this;
                    var td = this.parentNode;
                    td.onmouseover = _over;
                    td.onmouseout = _out;
                });
            }
            var _tabClick  = function () {
                (me.onTabClick) && me.onTabClick.call(this, me);
            }, _rangeClick = function () {
                this.form.Start.value = this.value;
                var span = $(_selector.tab_now).get(0);
                (me.onTabClick) && me.onTabClick.call(span, me);
            }, _boxClick = function () {
                (me.onPkgBtnClick) && me.onPkgBtnClick.call(this, me);
            };
            //綁定分頁切換事件
            $(_selector.tab).die().live('click', _tabClick);
            $(_selector.range, this._form).die().live('click', _rangeClick);
            $(_selector.pkg).die().live('click', _boxClick);
            if (this._rtype == 'GST') {
                this.gsMin = 5;
                this.gsMax = 10;
                $(_selector.gs_all, this._form).die().live('click', function () {
                    (me.onGsAllClick) && me.onGsAllClick();
                });
            }
            if (this._rtype == 'GSS') {
                this.gsMin = 4;
                this.gsMax = 8;
            }
            this.btnSubmit = null;
            this.btnCancel = null;
            var _Enter;
            if (_reg.check1.test(this._rtype)) {
                this.btnSubmit = $(_selector.gsfu4_submit, this._form);
                this.btnCancel = $(_selector.gsfu4_cancel, this._form);
                _Enter = function () {
                    (me.onFormSubmit) && me.onFormSubmit.call(me._form);
                    return false;
                }
                this.btnSubmit.die().live('click', _Enter);
                this.btnCancel.die().live('click', function () {
                    (me.onFormReset) && me.onFormReset.call(me._form, me);
                    return false;
                });
            } else if (_reg.check2.test(this._rtype)) {
                this.btnSubmit = $(_selector.wp_submit, this._form);
                this.btnCancel = $(_selector.wp_cancel, this._form);
                _Enter = function () {
                    (me.onWpSubmit) && me.onWpSubmit.call(me._form);
                    return false;
                }
                this.btnSubmit.die().live('click', _Enter);
                this.btnCancel.die().live('click', function () {
                    (me.onFormReset) && me.onFormReset.call(me._form, me);
                    return false;
                });
            } else {
                this.btnSubmit = $(_selector.submit);
                this.btnCancel = $(_selector.cancel);
                _Enter = function () {
                    (me.onFormSubmit) && me.onFormSubmit.call(me._form);
                    return false;
                };
                var _CANCEL = function () {
                    (me.onFormReset) && me.onFormReset.call(me._form, me);
                    return false;
                };
                this.btnSubmit.die().live('click', _Enter);
                this.btnCancel.die().live('click', _CANCEL);
            }
            //綁定按Enter event
            if (this._form) {
                var _Ent = 0;
                var _keyEvent = function (e) {
                    e = e || window.event 
                    var _key = (window.event) ? e.keyCode : e.which;
                    if (_key == 13 && _Ent == 0) {
                        _Ent = 1;
                        setTimeout(function (){ _Ent = 0;}, 1000);
                        _Enter();
                    }
                };
                if (this._betMode && ($.inArray(this._rtype, _rtypeOther) < 0)) {
                } else {
                    this._form.onkeyup = _keyEvent;
                    (this.grpBtn) && (this.grpBtn.onkeyup = _keyEvent);
                }
            } else {
                (this.grpBtn) && (this.grpBtn.onkeyup = function () {});
                //document.onkeyup = function () {}
            }
            if (this._betMode && ($.inArray(this._rtype, _rtypeOther) < 0)) {
                //这里初始化b3Order.js文件------------------------
                var b = self.betSpace.betB3.instance(this._gtype);
                b.rtypeGrp = this._rtype;
                b.initActive();
                self.GoldUI.installInput($(_selector.goldui, this._form));
            }
            var _switchMode = $(_selector.switch_md)
            _switchMode.die().live('click', function () {
                (me.onSwitchModeClk) && me.onSwitchModeClk.call(this, me);
            });
            (_reg.close_play.test(me._rtype)) && (_switchMode.hide());
            $(_selector.fill_md).die().live('click', function () {
                self.location = _config.url.fill_d3 + '?gid=' + this.form.gid.value + '&gtype=' + me._gtype + '&rtype=' + me._rtype;
            });

            //快選
            var _d1Tag = $(_selector.grp_d1)
            _d1Tag.hide();
            $(_selector.grp_d1_a).removeClass(_config.class_name.on);
            if (this.grpBtn != null) {
                if ($.inArray(this._rtype, _rtypeQuick) >= 0) {
                    this.grpBtn.style.display = 'block';
                    $(_selector.grp_tag, this.grpBtn).hide();
                    if (_reg.grp_w3.test(this._rtype)) {
                        $(_selector.grp_w3).show();
                    } else if (_reg.grp_d3.test(this._rtype)) {
                        var _divShow = $(_selector.grp_d3);
                        _divShow.show();
                        if (_grpHeight == 0) {
                            _grpHeight = _divShow.height();
                            _divShow.css('height', '24px');
                        }
                    } else if (_reg.grp_d1.test(this._rtype)) {
                        _d1Tag.show();
                    } else if (_reg.grp_d2.test(this._rtype)) {
                        $(_selector.grp_d2).show();
                    }
                } else {
                    this.grpBtn.style.display = 'none';
                }
                if (this._form) {
                } else {
                    (this.grpBtn) && (this.grpBtn.style.display = 'none');
                    _d1Tag.hide();
                }
            }
            //調整已勾選位置
            if (_reg.ticked_grp.test(this._rtype)) {
                if ((this.tickedTag) && (this.tickedBox) && (this.tickedTag.parentNode.id == this.tickedBox.id)) {
                    (this.headTag) && (this.tickedBoxG.insertBefore(this.tickedTag, this.headTag));
                } 
                (this.tickedBox) && (this.tickedBox.style.display = 'none');
            } else if (this._rtype == 'WP'){
                (this.tickedBox) && (this.tickedBox.style.display = 'none');
            } else {
                if ((this.tickedTag) && (this.tickedBoxG) && (this.tickedTag.parentNode.id == this.tickedBoxG.id)) {
                    (this.tickedBox) && (this.tickedBox.appendChild(this.tickedTag));
                }
                (this.tickedBox) && (this.tickedBox.style.display = 'block');
            }
            if (this._form) {
            } else {
                (self.GoldUI) && (self.GoldUI.closeGoldMenu());
                (this.tickedBox) && (this.tickedBox.style.display = 'none');
                (this.tickedBoxG) && (this.tickedBoxG.style.display = 'none');
            }
            this._onSwitch = 0;
            //this.filterRule();
            this.count_reciprocal();
            if (!this._betMode) {
                mobileCheck(0);
            }
        },
        /**
         * 重畫tab分頁
         * @param _rtype 玩法頁面
         */
        reDrawTab : function (_rtype) {
            var _id = _config.id,
                _class = _config.class_name,
                div = document.getElementById(_id.tab),
                ul = div.getElementsByTagName('ul')[0],
                lis = ul.getElementsByTagName('li');
            //清除分頁
            for (var i = lis.length; i > 0; i--) {
                ul.removeChild(lis[i-1]);
            }
            var _list = _checkShow(_rtype);
            var _li = document.createElement('li'), _span = document.createElement('span'), _b = document.createElement('b');
            if (_list) {
                var nNode = document.createDocumentFragment();
                var li, span, b;
                for (var key in _list) {
                    li = _li.cloneNode(1);
                    if (_rtype == key) {
                        li.className = _class.tab_on;
                    } else {
                        li.className =_class.tab_un;
                    }
                    span = _span.cloneNode(1);
                    span.className = key;
                    b = _b.cloneNode(1);
                    b.innerHTML = _list[key];
                    span.appendChild(b);
                    li.appendChild(span);
                    nNode.appendChild(li);
                }
                li = _li.cloneNode(1);
                li.setAttribute('id', _id.tab_line);
                nNode.appendChild(li);
                ul.appendChild(nNode);
                div.style.display = 'block';
            } else {
                div.style.display = 'none';
            }
        },
        /**
         * 顯示倒數時間
         */
        reciprocal_show : function (_sec) {
            var D = time_format(_sec);
            if( _sec > 0 ){
                var His = "";
                His += (D.h + (D.d * 24) < 10) ? "0" + (D.h + (D.d * 24)) + ":" : (D.h + (D.d * 24)) + ":";
                His += (D.m < 10) ? "0" + D.m + ":" : D.m + ":";
                His += (D.s < 10) ? "0" + D.s : D.s;
                if (this.tagFCDL) {
                    this.tagFCDL.show();
                    this.tagFCDS.text(_sec);
                    this.tagFCDH.text(His);
                }
            }else{
                if (this.tagFCDL) {
                    this.tagFCDL.hide();
                    this.tagFCDS.text(_sec);
                    this.tagFCDH.text("00:00:00");
                    (this.tickedTag) && (this.tickedTag.innerHTML = Lang('Ticked').replace("%s", '0'));
                }
                if (this._gtype == 'BT' && $.cookie('bbinwin') == 'true' && $.trim($("#YearNum").text()) != '') {
                    BBINWIN.bbwin_triger();
                }
            }
        },
        /**
         * 封盤倒數
         */
        count_reciprocal : function () {
            var me = this;
            (_timer) && clearInterval(_timer);
            var _run = function () {
                if (self.game_status && self.game_status.isCancel) {
                    me._showTag.innerHTML = '<div class="' + _config.class_name.game_cancel + '">'+ Lang('game_canceled')+'(' + self.game_status.iNum +')</div>';
                    return;
                }
                me._reciprocal_sec -= 1;
                var _FCDS = me.tagFCDS.text() - 1;
                me.reciprocal_show(_FCDS);
                var start = 0
                if (me._form) {
                    (typeof me._form.Start != 'undefined') && (start = me._form.Start.value);
                }
                if (me._reciprocal_sec == 0) {
                    $.ajax({
                        url:me.odds_url,
                        type: 'GET',
                        dataType: 'script',
                        timeout: 5000,
                        data:"rtype=" + me._rtype + "&gtype=" + me._gtype + '&Start=' + start
                    });
                    me._reciprocal_sec = 10;
                }
            }
//            _run();
//            _timer = setInterval(_run, 1000);
        },
        /**
         * 點擊選單切換玩法事件,比如一字、二字、组选三、组选六等切换
         * @param me GameB3 物件
         */
        onGameSwitch : function (me) {
            if (me._onSwitch == 0) {
                me._onSwitch = 1;
                var _rtype = getParamString('rtype', this.href), _reg = _config.reg.close_play;
                _rtype = (_rtype == '') ? 'W1' : _rtype;
                var _normalMode = false;
                if (me._betMode == 0) {
                    _normalMode = true;
                } else {
                    //if (_reg.test(_rtype)) {
                    //    me._rtype = _rtype;
                    //    me.onSwitchModeClk(me);
                    //    return false;
                    //}
                    var _nowInOther = $.inArray(me._rtype, _rtypeOther),
                        _goInOther =  $.inArray(_rtype, _rtypeOther);
                    if (_goInOther >= 0 && _nowInOther >= 0) {
                        _normalMode = true;
                    } else if(_goInOther >= 0 || _nowInOther >= 0) {
                        self.location = this.href;
                        return;
                    }
                }
                //$('#' + me._gtype + '_Content > #bottombar' + me._gtype + ' > a').removeClass('nowPage');
                //this.className = 'nowPage';
                var _class = _config.class_name;
                me.menu.removeClass(_class.menu_on);
                $(this).addClass(_class.menu_on);
                (me._boxTag) && (me._boxTag.addClass(_class.menu_ani));
                if (_normalMode) {
                    document.getElementById(_config.id.rtype).value = _rtype;
                    if (me._form) {
                        me.onFormReset.call(me._form, me);
                    }
                    var aTag = this;
                    $.ajax({
                        url : _config.url.switch_g + '?rtype=' + _rtype + '&gtype=' + me._gtype,
                        type : 'GET',
                        dataType : 'json',
                        timeout : 5000,
                        beforeSend : function () {
                            $(me._showTag).html("<span style='color:red;font-weight:bold;'>loading..</span>");
                        },
                        success : function (res) {
                            if (self.game_status && self.game_status.isCancel) {
                                $(me._showTag).html('<div class="' + _class.game_cancel + '">'+Lang('game_canceled')+'('+self.game_status.iNum+')</div>');
                            } else {
                                $(me._showTag).empty().html(res.Game);
                                (me.tickedTag) && (me.tickedTag.innerHTML = Lang('Ticked').replace("%s", '0'));
                                (me.cnameTag) && (me.cnameTag.innerHTML = res.c_rtype);
                                if(document.title){
                                    document.title = res.c_rtype;
                                }
                                me.reDrawTab(_rtype);
                                (me.ynumTag) && (me.ynumTag.innerHTML = res.YearNum);
                                me.init();
                            }
                        }

                    });
                } else {
                    me.reDrawTab(_rtype);
                    (me.tickedTag) && (me.tickedTag.innerHTML = Lang('Ticked').replace("%s", '0'));
                    $.ajax({
                        url : _config.url.switch_a,
                        type : 'GET',
                        dataType : 'script',
                        timeout : 5000,
                        data : 'rtype=' + _rtype + '&gtype=' + me._gtype
                    });
                }
            }
        },
        /**
         * 點擊分頁切換玩法事件，比如一字里面的tab页切换
         * @param me GameB3 物件
         */
        onTabClick : function (me) {
            var _selector = _config.selector, _class = _config.class_name;
            if (me._onSwitch == 0) {
                me._onSwitch = 1;
                $(_selector.tab_on).removeClass(_class.tab_on).addClass(_class.tab_un);
                $(this.parentNode).addClass(_class.tab_on);
                me._rtype = this.className;
                document.getElementById(_config.id.rtype).value = me._rtype;
                me._head.length = 0;
                me._mid.length = 0;
                me._end.length = 0;
                $(_selector.quick).each(function () {
                    $(this).removeClass(_class.on);
                    this.x = 0;
                });
                (me.tickedInfo) && (me.tickedInfo.text(''));
                if (me._betMode && $.inArray(me._rtype, _rtypeOther) < 0) {
                    var start = 0;
                    (me._form) && (typeof me._form.Start != 'undefined') && (start = me._form.Start.value);
                    $.ajax({
                        url : _config.url.switch_a,
                        type : 'GET',
                        dataType : 'script',
                        timeout : 5000,
                        data : 'rtype=' + me._rtype + '&gtype=' + me._gtype + '&Start=' + start,
                        beforeSend : function () {
                            me._showTag.innerHTML = "<span style='color:red;font-weight:bold;'>loading..</span>";
                        }
                    });
                } else {
                    $.ajax({
                        url : _config.url.switch_g,
                        type : 'GET',
                        dataType : 'json',
                        timeout : 5000,
                        data : 'rtype=' + me._rtype + '&gtype=' + me._gtype,
                        beforeSend : function () {
                            me._showTag.innerHTML = "<span style='color:red;font-weight:bold;'>loading..</span>";
                        },
                        success : function (res) {
                            if (self.game_status && self.game_status.isCancel) {
                                $(me._showTag).html('<div class="' + _class.game_cancel + '">'+Lang('game_canceled')+'('+self.game_status.iNum+')</div>');
                            } else {
                                me._showTag.innerHTML = res.Game;
                                (me.tickedTag) && (me.tickedTag.innerHTML = Lang('Ticked').replace("%s", '0'));
                                (me.cnameTag) && (me.cnameTag.innerHTML = res.c_rtype);
                                (me.ynumTag) && (me.ynumTag.innerHTML = res.YearNum);
                                me.init();
                            }
                        }

                    });
                }
            } else {
                return false;
            }
        },
        /**
         * 勾選checkbox事件
         * @param me GameB3 物件
         */
        onCbClick : function (me) {
            var checkbox_total = 0;
            for (var k in me._inpCb) {
                (me._inpCb[k].checked) && (checkbox_total++);
            }
            if(this.checked){
                this.parentNode.style.backgroundColor = 'yellow';
            }else{
                this.parentNode.style.backgroundColor = '';
            }
            (me.tickedTag) && (me.tickedTag.innerHTML = Lang('Ticked').replace("%s", checkbox_total));
            mobileCheck(checkbox_total);
        },
        /**
         * 組選三全包
         */
        onGsAllClick : function () {
            for (var k in this._inpCb) {
                this._inpCb[k].checked = true;
                (this.onGsCbClick) && this.onGsCbClick.call(this._inpCb[k], this);
            }
        },
        /**
         * 組選三、組選六勾選checkbox事件
         * @param me GameB3 物件
         */
        onGsCbClick : function (me) {
            var iGSChk = 0;
            for (var k in me._inpCb) {
                (me._inpCb[k].checked) && (iGSChk++);
            }
            if(this.checked){
                this.parentNode.style.backgroundColor = 'yellow';
            }else{
                this.parentNode.style.backgroundColor = '';
            }
            (me.tickedTag) && (me.tickedTag.innerHTML = Lang('Ticked').replace("%s", iGSChk));
            var _cb, _dis = (iGSChk >= me.gsMax);
            for (k in me._inpCb) {
                _cb = me._inpCb[k];
                if (!_cb.checked) {
                    if (_dis) {
                        _cb.disabled = true;
                        _cb.parentNode.style.backgroundColor = '#ccc';
                    } else {
                        _cb.disabled = false;
                        _cb.parentNode.style.backgroundColor = '';
                    }
                }
            }
            if(iGSChk <= me.gsMax && iGSChk >= me.gsMin){
                (me.btnSubmit) && (me.btnSubmit.attr('disabled', false));
            }else{
                (me.btnSubmit) && (me.btnSubmit.attr('disabled', true));
            }
        },
        /**
         * 複式組合勾選checkbox事件
         * @param me GameB3 物件
         */
        onCbFu4Click : function (me) {
            var _form = this.form;
            if(this.checked){
                this.parentNode.style.backgroundColor = 'yellow';
            }else{
                this.parentNode.style.backgroundColor = '';
            }
            var iFU4Chk = 0;
            for (var k in me._inpCb) {
                (me._inpCb[k].checked) && (iFU4Chk++);
            }
            (me.tickedTag) && (me.tickedTag.innerHTML = Lang('Ticked').replace("%s", iFU4Chk));
            var _cb, _dis = (iFU4Chk >= 21);
            for (k in me._inpCb) {
                _cb = me._inpCb[k];
                if (!_cb.checked) {
                    if (_dis) {
                        _cb.disabled = true;
                        _cb.parentNode.style.backgroundColor = '#ccc';
                    } else {
                        _cb.disabled = false;
                        _cb.parentNode.style.backgroundColor = '';
                    }
                }
            }
            var _selector = _config.selector,
                iHChk = $(_selector.fu4_h, _form).length,
                iTChk = $(_selector.fu4_t, _form).length,
                iOChk = $(_selector.fu4_o, _form).length;
            if( iFU4Chk <=21 && iFU4Chk >=9 && iHChk && iTChk && iOChk ){
                (me.btnSubmit) && (me.btnSubmit.attr('disabled', false));
            }else{
                (me.btnSubmit) && (me.btnSubmit.attr('disabled', true));
            }
        },
        /**
         * 一字過關勾選radio事件
         */
        onRadioClick : function () {
            var RadioName = this.name;
            var RadioForm = this.form;
            for (var i = 0, t = RadioForm[RadioName].length; i < t; i++) {
                if(RadioForm[RadioName][i].checked){
                    $(RadioForm[RadioName][i]).parent("td").css('background-color','yellow');
                }else{
                    $(RadioForm[RadioName][i]).parent("td").css('background-color','');
                }
            }
        },
        /**
         * 表單送出事件
         */
        onFormSubmit : function () {
            var checkbox_true = $(_config.selector.cb_total,this).length;
            if(checkbox_true == 0){
                new_alert(Lang('MSG_PLZ_CHK_UnChked'));
                return false;
            } else {
                $.ajax({
                    url : this.action,
                    type : 'POST',
                    dataType : 'script',
                    data : $(this).serialize()
                });
            }
        },
        /**
         * 一字過關表單送出事件
         */
        onWpSubmit : function () {
            var radio_true = $(_config.selector.rd_total,this).length;
            if(radio_true < 2){
                new_alert(Lang('Msg1_WP'));
                return false;
            } else {
                $.ajax({
                    url : this.action,
                    type : 'POST',
                    dataType : 'script',
                    data : $(this).serialize()
                });
            }
        },
        /**
         * 表單取消事件
         * @param me GameB3 物件
         */
        onFormReset : function (me) {
            //表單reset
            this.reset();
            //清空background-color
            var _selector = _config.selector;
            $(_selector.all_td, this).css('background-color','');
            me._head.length = 0;
            me._mid.length = 0;
            me._end.length = 0;
            (me.tickedTag) && (me.tickedTag.innerHTML = Lang('Ticked').replace("%s", '0'));
            $(_selector.quick).each(function () {
                $(this).removeClass(_config.class_name.on);
                this.x = 0;
            });
            me.btnSubmit.attr('disabled', false);
            me.btnCancel.attr('disabled', false);
            if(_config.reg.check1.test(me._rtype)){
                me.btnSubmit.attr('disabled', true);
                for (var k in me._inpCb) {
                    me._inpCb[k].disabled = false;
                }
            }
            (me.tickedInfo) && (me.tickedInfo.text(''));
            $(_selector.total).text('0.00');
            if (!me._betMode) {
                mobileCheck(0);
            }
        },
        /**
         * 一字定位包組
         * @param me GameB3 物件
         */
        onPkgBtnClick : function (me) {
            var key = this.name;
            var aType = {
                'ODD':['1','3','5','7','9'],
                'EVEN':['0','2','4','6','8'],
                'OVER':['5','6','7','8','9'],
                'UNDER':['0','1','2','3','4'],
                'PRIME':['1','2','3','5','7'],
                'COMPO':['0','4','6','8','9']
            };
            var _Chk = aType[key], _inp, i;
            for (var k in me._inpCb) {
                _inp = me._inpCb[k];
                i = _inp.value.substr((_inp.value.length - 1),1);
                if ($.inArray(i, _Chk) >= 0) {
                     _inp.checked = true;
                } else {
                     _inp.checked = false;
                }
                (me.onCbClick) && me.onCbClick.call(_inp, me);
            }
        },
        /**
         * 點選快選功能btn
         * @param me GameB3 物件
         */
        onBtnQkClick : function (me) {
            var div = document.getElementById('QuickDiv');
            if (div.x == 1) {
                (me.onQuickDivHide) && me.onQuickDivHide.call(div);
            } else {
                (me.onQuickDivShow) && me.onQuickDivShow.call(div);
            }
        },
        /**
         * 顯示快選
         */
        onQuickDivShow : function () {
            this.x = 1;
            this.className = 'ShowRight';
            this.style.display = '';
            $('#W3quick, #D3quick, #D2quick').hide();
            var _rtype = $('#sRtype').val();
            if (_rtype == 'W32' || _rtype == 'W33') {
                $('#W3quick').show();
            } else if (_rtype == 'D3MCU' || _rtype == 'W3') {
                $('#D3quick').show();
            } else {
//                $('#D2quick').show();
            }
        },
        /**
         * 隱藏快選
         */
        onQuickDivHide : function () {
            this.x = 0;
            this.className = 'HideRight';
            setTimeout("document.getElementById('" + this.id + "').style.display = 'none';", 300);
        },
        /**
         * 三字快選
         * @param me GameB3 物件
         */
        onGsQuickClick : function (me) {
            var _num = this.innerHTML, _inp, n, a, _on = _config.class_name.on;
            if (this.x == 1) {
                this.x = 0;
                $(this).removeClass(_on);
                var sHead = me._head.join('');
                me._head = (sHead.replace(_num, '')).split('');
            } else {
                this.x = 1;
                $(this).addClass(_on);
                ($.inArray(_num, me._head) < 0) && (me._head.push(_num));
            }
            for (var k in me._inpCb) {
                _inp = me._inpCb[k];
                n = _inp.value;
                a = me._head;
                if (($.inArray(n.substr(2,1), a) >= 0) && ($.inArray(n.substr(3,1), a) >= 0) && ($.inArray(n.substr(4,1), a) >= 0)) {
                    _inp.checked = true;
                } else {
                    _inp.checked = false;
                }
                (me.onCbClick) && me.onCbClick.call(_inp, me);
            }
        },
        /**
         * 根據二字的頭尾，選出號碼
         * @return _Chk 籂選好的陣列
         */
        getNumbAryII : function () {
            var _Chk = [];
            var _all = ['0','1','2','3','4','5','6','7','8','9'];
            if (this._head.length == 0 && this._end.length == 0) {
                return [];
            }
            var h = (this._head.length > 0) ? this._head : _all;
            var e = (this._end.length > 0) ? this._end : _all;
            for (var a = 0, aa = h.length; a < aa; a++) {
                for (var c = 0, cc = e.length; c < cc; c++) {
                    _Chk.push(([h[a] ,e[c]]).join(''));
                }
            }
            return _Chk;
        },
        /**
         * 根據三字的頭尾中，選出號碼
         * @return _Chk 籂選好的陣列
         */
        getNumbAryIII : function () {
            var _Chk = [];
            var _all = ['0','1','2','3','4','5','6','7','8','9'];
            if (this._head.length == 0 && this._mid.length == 0 && this._end.length == 0) {
                return [];
            }
            var h = (this._head.length > 0) ? this._head : _all;
            var m = (this._mid.length > 0) ? this._mid : _all;
            var e = (this._end.length > 0) ? this._end : _all;
            for (var a = 0, aa = h.length; a < aa; a++) {
                for (var b = 0, bb = m.length; b < bb; b++) {
                    for (var c = 0, cc = e.length; c < cc; c++) {
                        _Chk.push(([h[a] ,m[b], e[c]]).join(''));
                    }
                }
            }
            return _Chk;
        },
        /**
         * 顯示二字快選的頭尾
         */
        showTicketII : function () {
            var num_x = 0;
            for (var k in this._inpCb) {
                (this._inpCb[k].checked) && (num_x++);
            }
            (this.headTag) && (this.headTag.innerHTML = Lang('TickedH') + "：" + show_a(this._head));
            (this.endTag) && (this.endTag.innerHTML = Lang('TickedF') + "：" + show_a(this._end));
            (this.tickedTag) && (this.tickedTag.innerHTML = Lang('Ticked').replace("%s",num_x));
            mobileCheck(num_x);
        },
        /**
         * 顯示三字快選的頭中尾
         */
        showTicketIII : function () {
            var num_x = 0;
            for (var k in this._inpCb) {
                (this._inpCb[k].checked) && (num_x++);
            }
            (this.headTag) && (this.headTag.innerHTML = Lang('TickedH') + "：" + show_a(this._head));
            (this.midTag) && (this.midTag.innerHTML = Lang('TickedM') + "：" + show_a(this._mid));
            (this.endTag) && (this.endTag.innerHTML = Lang('TickedF') + "：" + show_a(this._end));
            (this.tickedTag) && (this.tickedTag.innerHTML = Lang('Ticked').replace("%s",num_x));
            mobileCheck(num_x);
        },
        /**
         * 二字頭快選
         * @param me GameB3 物件
         */
        onD2HeadClick : function (me) {
            var he = 4;
            if (me._rtype == 'W2') {
                he = 2;
            }
            var _num = this.innerHTML, _on = _config.class_name.on;
            if (this.x == 1) {
                this.x = 0;
                $(this).removeClass(_on);
                me._head = ((me._head.join('')).replace(_num, '')).split('');
            } else {
                this.x = 1;
                $(this).addClass(_on);
                if ( $.inArray(_num, me._head) < 0) {
                    me._head.push(_num);
                }
            }
            var _select = me.getNumbAryII(), _inp, n;
            for (var k in me._inpCb) {
                _inp = me._inpCb[k];
                n = _inp.value.substr(he, 3);
                if ($.inArray(n, _select) >= 0) {
                    _inp.checked = true;
                    _inp.parentNode.style.backgroundColor = 'yellow';
                } else {
                    _inp.checked = false;
                    _inp.parentNode.style.backgroundColor = '';
                }
            }
            me.showTicketII();
        },
        /**
         * 二字尾快選
         * @param me GameB3 物件
         */
        onD2EndClick : function (me) {
            var he = 4;
            if (me._rtype == 'W2') {
                he = 2;
            }
            var _num = this.innerHTML, _on = _config.class_name.on;
            if (this.x == 1) {
                this.x = 0;
                $(this).removeClass(_on);
                me._end = ((me._end.join('')).replace(_num, '')).split('');
            } else {
                this.x = 1;
                $(this).addClass(_on);
                if ( $.inArray(_num, me._end) < 0) {
                    me._end.push(_num);
                }
            }
            var _select = me.getNumbAryII(), _inp, n;
            for (var k in me._inpCb) {
                _inp = me._inpCb[k];
                n = _inp.value.substr(he, 3);
                if ($.inArray(n, _select) >= 0) {
                    _inp.checked = true;
                    _inp.parentNode.style.backgroundColor = 'yellow';
                } else {
                    _inp.checked = false;
                    _inp.parentNode.style.backgroundColor = '';
                }
            }
            me.showTicketII();
        },
        /**
         * 三字定位頭快選
         * @param me GameB3 物件
         */
        onD3HeadClick : function (me) {
            var he = 2;
            if (me._rtype.substr(0,2) == 'D3') {
                he = 5;
            }
            var _num = this.innerHTML, _on = _config.class_name.on;
            if (this.x == 1) {
                this.x = 0;
                $(this).removeClass(_on);
                me._head = ((me._head.join('')).replace(_num, '')).split('');
            } else {
                this.x = 1;
                $(this).addClass(_on);
                if ( $.inArray(_num, me._head) < 0) {
                    me._head.push(_num);
                }
            }
            var _select = me.getNumbAryIII(), _inp, n;
            for (var k in me._inpCb) {
                _inp = me._inpCb[k];
                n = _inp.value.substr(he, 3);
                if ($.inArray(n, _select) >= 0) {
                    _inp.checked = true;
                    _inp.parentNode.style.backgroundColor = 'yellow';
                } else {
                    _inp.checked = false;
                    _inp.parentNode.style.backgroundColor = '';
                }
            }
            me.showTicketIII();
        },
        /**
         * 三字定位中快選
         * @param me GameB3 物件
         */
        onD3MidClick : function (me) {
            var he = 2;
            if (me._rtype.substr(0,2) == 'D3') {
                he = 5;
            }
            var _num = this.innerHTML, _on = _config.class_name.on;
            if (this.x == 1) {
                this.x = 0;
                $(this).removeClass(_on);
                me._mid = ((me._mid.join('')).replace(_num, '')).split('');
            } else {
                this.x = 1;
                $(this).addClass(_on);
                if ( $.inArray(_num, me._mid) < 0) {
                    me._mid.push(_num);
                }
            }
            var _select = me.getNumbAryIII(), _inp, n;
            for (var k in me._inpCb) {
                _inp = me._inpCb[k];
                n = _inp.value.substr(he, 3);
                if ($.inArray(n, _select) >= 0) {
                    _inp.checked = true;
                    _inp.parentNode.style.backgroundColor = 'yellow';
                } else {
                    _inp.checked = false;
                    _inp.parentNode.style.backgroundColor = '';
                }
            }
            me.showTicketIII();
        },
        /**
         * 三字定位尾快選
         * @param me GameB3 物件
         */
        onD3EndClick : function (me) {
            var he = 2;
            if (me._rtype.substr(0,2) == 'D3') {
                he = 5;
            }
            var _num = this.innerHTML, _on = _config.class_name.on;
            if (this.x == 1) {
                this.x = 0;
                $(this).removeClass(_on);
                me._end = ((me._end.join('')).replace(_num, '')).split('');
            } else {
                this.x = 1;
                $(this).addClass(_on);
                if ( $.inArray(_num, me._end) < 0) {
                    me._end.push(_num);
                }
            }
            var _select = me.getNumbAryIII(), _inp, n;
            for (var k in me._inpCb) {
                _inp = me._inpCb[k];
                n = _inp.value.substr(he, 3);
                if ($.inArray(n, _select) >= 0) {
                    _inp.checked = true;
                    _inp.parentNode.style.backgroundColor = 'yellow';
                } else {
                    _inp.checked = false;
                    _inp.parentNode.style.backgroundColor = '';
                }
            }
            me.showTicketIII();
        },
        /**
         * 三字定位radio快選
         */
        onD3RadioClick : function () {
            var ii = '', _value = this.value, _name = this.name, _reg = _config.reg, _selector = _config.selector;
            (_value == '0') && (ii = '13579');
            (_value == '1') && (ii = '02468');
            (_value == '2') && (ii = '56789');
            (_value == '3') && (ii = '01234');

            (_reg.grp_d3_head.test(_name)) && ($(_selector.grp_d3_head).val(ii));
            (_reg.grp_d3_mid.test(_name)) && ($(_selector.grp_d3_mid).val(ii));
            (_reg.grp_d3_end.test(_name)) && ($(_selector.grp_d3_end).val(ii));
            (_reg.grp_d3_snf.test(_name)) && ($(_selector.grp_d3_snf).val(ii));
        },
        /**
         * 三字定位新快選
         * @param me GameB3 物件
         */
        onD3quickFilter : function (me) {
            var he = 2, _select = [], _selector = _config.selector;
            (me._rtype.substr(0,2) == 'D3') && (he = 5);
            var _h = $(_selector.grp_d3_head).val(),
                _m = $(_selector.grp_d3_mid).val(),
                _e = $(_selector.grp_d3_end).val();
            if (isFinite(_h) && isFinite(_m) && isFinite(_e)) {
                me._head = _h.split('');
                me._mid = _m.split('');
                me._end = _e.split('');
                _select = me.getNumbAryIII();
            } else {
                new_alert(Lang('MSG_PLZ_CHK_UnChked'));
                return;
            }
            var reg = /^[0-9,]*$/, reg1 = /^[0-9]*$/, _group = char_group,
                _snf = $(_selector.grp_d3_snf).val(),
                _sn = $(_selector.grp_d3_sn).val(),
                _d = $(_selector.grp_d3_d).val();
            if (reg.test(_sn) && reg1.test(_snf) && reg1.test(_d)) {
                var _id = [_snf, _sn, _d], _key = ['T', 'S', 'D'], _val, _ary, _a, _b;
                for (var i = 0; i <3; i++) {
                    _val = _id[i];
                    if (_val != '') {
                        _a = [];

                        if( i == 1) {
                            _ary = _val.split(',');
                        } else {
                            _ary = _val.split('')
                        }

                        for (var j = 0, _max = _ary.length; j < _max; j++) {
                            _b = _group[_key[i] + _ary[j]];
                            (_a.length == 0) ? (_a = _b) : (_a = _a.concat(_b));
                        }
                        if (_select.length > 0) {
                            _select = _.intersection(_select, _a);
                        } else {
                            _select = _a;
                        }
                    }
                }
            } else {
                var Err = '';
                if (_snf !== '' && ! reg1.test(_snf))
                {
                    Err = Err + Lang('tailNum_pl_kin_num')+"\n";
                }
                if (_sn !== '' && ! reg.test(_sn))
                {
                    Err = Err + Lang('sumNum_pl_kin_num')+"\n";
                }
                if (_d !== '' && ! reg1.test(_d))
                {
                    Err = Err + Lang('dan_pl_kin_num')+"\n";
                }
                if(Err != '') {
                    new_alert(Err);
                    return;
                }
            }
            var _checked = $(_selector.grp_d3_checked);
            if (_checked.length > 0) {
                var _tag = 0, _aCondition = [];
                _checked.each(function () {
                    var _chk = _group[this.value];
                    if (typeof _chk != 'undefined') {
                        if (_aCondition.length == 0 && _tag == 0) {
                            _aCondition = _chk;
                        } else {
                            if (_aCondition.length > 0) {
                                _aCondition = _.intersection(_aCondition, _chk);
                                (_aCondition.length == 0) && (_tag = 1);
                            }
                        }
                    }
                });
                if (_select.length > 0) {
                    _select = _.intersection(_select, _aCondition);
                } else {
                    _select = _aCondition;
                }
            }
            var _inp, n, num_x = 0;
            for (var k in me._inpCb) {
                _inp = me._inpCb[k];
                n = _inp.value.substr(he, 3);
                if ($.inArray(n, _select) >= 0) {
                    _inp.checked = true;
                    _inp.parentNode.style.backgroundColor = 'yellow';
                } else {
                    _inp.checked = false;
                    _inp.parentNode.style.backgroundColor = '';
                }
                (_inp.checked) && (num_x++);
            }
            (me.tickedTag) && (me.tickedTag.innerHTML = Lang('Ticked').replace("%s", num_x));
            //me.showTicketIII();
        },
        /**
         * 三字定位快選clear
         */
        onFilterClear : function () {
            var _selector = _config.selector;
            $(_selector.grp_d3_checked).attr('checked', false);
            $(_selector.grp_d3_rio).attr('checked', false);
            $(_selector.grp_d3_head).val('');
            $(_selector.grp_d3_mid).val('');
            $(_selector.grp_d3_end).val('');
            $(_selector.grp_d3_snf).val('');
            $(_selector.grp_d3_sn).val('');
            $(_selector.grp_d3_d).val('');
        },
        /**
         * 切換下注模式
         * @param me GameB3 物件
         */
        onSwitchModeClk : function (me) {
            var _mode = (me._betMode == 0) ? 1 : 0, _url = _config.url;
            var _back = _url.normal_hp;
            $.ajax({
                url : _url.switch_md + '?mode=' + _mode + '&rtype=' + me._rtype + '&gtype=' + me._gtype + '&back=' + _back,
                type : 'GET',
                dataType : 'script'
            });
        },
        /**
         * 規則說明過濾顯示
         */
        filterRule : function () {
            var _rtype = this._rtype;
            $('div#RuleText > ol > li').hide().filter('li.rule' + _rtype).show();
            if (_rtype == 'OEOU'){
                $('#RuleText').css('width', '410px');
            } else {
                $('#RuleText').css('width', '');
            }
            if ($.inArray(_rtype, _rtypeOther) < 0) {
                (_rtype != 'OEOU') && $('div#RuleText > ol > li.ruleTips').hide().filter(function(i){return (i==0);}).show();
                (_rtype == 'OEOU') && $('div#RuleText > ol > li.ruleTips').hide().filter(function(i){return (i==1);}).show();
            } else {
                $('div#RuleText > ol > li.ruleTips').hide();
            }
            document.getElementById('left').style.display = 'none';
            document.getElementById('left').style.display = '';
        },
        /**
         * 滑鼠經過提示有拖拉下注功能
         * @param event
         */
        onOver : function (e) {
            e = e || window.event;
            var doe = document.documentElement, dob = document.body;
            this.left = (doe.scrollLeft + dob.scrollLeft + e.clientX - 120) + 'px';
            this.top = (doe.scrollTop + dob.scrollTop + e.clientY + 25) + 'px';
            this.display = '';
        },
        /**
         * 滑鼠離開隱藏提示
         */
        onOut : function () {
            this.display = 'none';
        },
        /**
         * 設定option
         * @param type option類型
         * @param key option key
         * @param val option value
         */
        setConfig : function (type, key , val) {
            if (type == null || key == null || val == null) {
                return false;
            }
            if ($.inArray(type, ['url', 'reg', 'id', 'class', 'selector']) < 0) {
                return false;
            }
            if (typeof _config[type][key] != 'undefined') {
                _config[type][key] = val;
            }
        },
        /**
         * 設定option 陣列
         * @param type option類型
         * @param ary option array
         */
        setTypeConfig : function (type, ary) {
            if (type == null || ary == null || typeof ary == 'string') {
                return false;
            }
            if ($.inArray(type, ['url', 'reg', 'id', 'class', 'selector']) < 0) {
                return false;
            }
            for (var k in _config[type]) {
                if (typeof ary[k] != 'undefined') {
                    this.setOption(type, k, ary[k]);
                }
            }
        },
        /**
         * 設定option 全部陣列
         * @param ary option array
         */
        setAllConfig : function (ary) {
            for (var k in _config) {
                if (typeof ary[k] != 'undefined') {
                    this.setTypeOption(k, ary[k]);
                }
            }
        },
        /**
         * 取得option 全部陣列
         * @return _config array
         */
        getConfig : function () {
            return _config;
        }
    };
    /**
     * instance
     * @param _json option設定
     */
    space.GameB3.instance = function (_json) {
        if (!this._instance && document.body) {
            this._instance = new this(_json);
        }
        return this._instance;
    };
    /**
     * 產生遊戲物件，執行事件
     */
    space.GameB3.install = function (_arr, _betMode) {
        var _gameB3 = space.GameB3.instance(_arr);
        if (arguments.length > 1) {
            _gameB3._betMode = _betMode;
        }
        _gameB3.init();
    };
    space.GameB3.onFinishRest = function () {
        var _gameB3 = space.GameB3.instance();
        if (_gameB3._form) {
            (_gameB3.onFormReset) && _gameB3.onFormReset.call(_gameB3._form, _gameB3);
        }
        if (_gameB3._betMode) {
            var b = self.betSpace.betB3.instance(_gameB3._gtype);
            if ($.inArray(_gameB3._rtype, _rtypeOther) < 0) {
                b.rtypeGrp = _gameB3._rtype;
                b.initActive();
            }
        }
    };
})(self);
document.oncontextmenu = function () {return false;}
