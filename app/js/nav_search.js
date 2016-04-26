var userCurrentKeyword="";
V.addListener($("keyword"),"keyup",function(){
	userCurrentKeyword=$("keyword").value;
});
var header_search = 
{
	default_keyword : "",
	option_timeout : null,
	get_obj : function (id)
	{
		if(!id)
		{
			return null;
		}
		else if(typeof id=='string')
		{
			return document.getElementById(id);
		}
		else if(typeof id=='object')
		{
			return id;
		}
	},
	show_option : function ()
	{
		this.get_obj("loginFldselectop").style.display = "block";
	},
	hide_option : function ()
	{
		this.get_obj("loginFldselectop").style.display = "none";
	},
	over_option : function ()
	{
		if (this.option_timeout)
		{
			clearTimeout(this.option_timeout);
		}
	},
	out_option : function ()
	{
		if (this.option_timeout)
		{
			clearTimeout(this.option_timeout);
		}
		this.option_timeout = setTimeout("header_search.hide_option()", 500);
	},
	select_option : function (type)
	{
		this.get_obj("loginUl").innerHTML = type;
		this.hide_option();

		if (type == "站内")
		{
			this.default_keyword = PH_HOTWORDS[1];

			this.get_obj("search_form").action = "http://search.ifeng.com/sofeng/search.action";
			
			this.get_obj("keyword").name = "q";
			this.get_obj("keyword").value = userCurrentKeyword==""?this.default_keyword:userCurrentKeyword;
			this.get_obj("keyword").onkeyup = "";
			this.get_obj("keyword").onkeydown = "";
			
			this.get_obj("param1").disabled = false;
			this.get_obj("param1").name = "c";
			this.get_obj("param1").value = "1";
			
			this.get_obj("param2").disabled = true;
		}
		else if (type == "站外")
		{
			this.default_keyword = PH_HOTWORDS[1];

			this.get_obj("search_form").action = "http://sou.ifeng.com/bsearch/bsearch.do";

			this.get_obj("keyword").name = "q";
			this.get_obj("keyword").value = userCurrentKeyword==""?this.default_keyword:userCurrentKeyword;
			this.get_obj("keyword").onkeyup = "";
			this.get_obj("keyword").onkeydown = "";
			
			this.get_obj("param1").disabled = true;

			this.get_obj("param2").disabled = true;
		}
		else if (type == "证券")
		{
			this.default_keyword = PH_HOTWORDS[0];

			this.get_obj("search_form").action = "http://app.finance.ifeng.com/hq/search.php";

			this.get_obj("keyword").name = "keyword";
			this.get_obj("keyword").value = userCurrentKeyword==""?this.default_keyword:userCurrentKeyword;
			this.get_obj("keyword").onkeyup = function(){ finance_suggest.typewrite(this.value) };
			this.get_obj("keyword").onkeydown = function(event){ evt = event ? event :(window.event ? window.event : null); finance_suggest.move(evt) };

			this.get_obj("param1").disabled = true;

			this.get_obj("param2").disabled = true;
		}
		else if (type == "汽车")
		{
			this.default_keyword = "输入品牌或车系";

			this.get_obj("search_form").action = "http://car.auto.ifeng.com/lib/car/suggest_go.php";

			this.get_obj("keyword").name = "keyword";
			this.get_obj("keyword").value = userCurrentKeyword==""?this.default_keyword:userCurrentKeyword;
			this.get_obj("keyword").onkeyup = function(){ car_suggest.typewrite(this.value) };
			this.get_obj("keyword").onkeydown = function(event){ evt = event ? event :(window.event ? window.event : null); car_suggest.move(evt) };

			this.get_obj("param1").disabled = false;
			this.get_obj("param1").name = "bname";
			this.get_obj("param1").value = "";

			this.get_obj("param2").disabled = false;
			this.get_obj("param2").name = "sname";
			this.get_obj("param2").value = "";
		}
		else if (type == "视频")
		{
			this.default_keyword = PH_HOTWORDS[1];

			this.get_obj("search_form").action = "http://search.ifeng.com/sofeng/search.action";

			this.get_obj("keyword").name = "q";
			this.get_obj("keyword").value = userCurrentKeyword==""?this.default_keyword:userCurrentKeyword;
			this.get_obj("keyword").onkeyup = "";
			this.get_obj("keyword").onkeydown = "";
			
			this.get_obj("param1").disabled = false;
			this.get_obj("param1").name = "c";
			this.get_obj("param1").value = "5";
			
			this.get_obj("param2").disabled = true;
		}
	},
	clean_default : function (value)
	{
		if (value == this.default_keyword)
		{
			this.get_obj("keyword").value = "";
		}
	},
	set_default : function (value)
	{
		if (value == "")
		{
			this.get_obj("keyword").value = this.default_keyword;
		}
	}
}

var finance_suggest = 
{
	line: 0,
	count: 0,
	keyword: "",
	move: function(_evt) {
		switch (_evt.keyCode) {
			case 38: // up
				if (this.line > 1) {
					document.getElementById("suggest_" + this.line).className = "";
					this.line = this.line - 1;
					document.getElementById("suggest_" + this.line).className = "current";
				}
				break;
			case 40: // down
				if (this.line > 0 && this.line < this.count) {
					document.getElementById("suggest_" + this.line).className = "";
				}
				if (this.line < this.count) {
					this.line = this.line + 1;
					document.getElementById("suggest_" + this.line).className = "current";
				}
				break;
			case 13: // enter
				if (this.line >= 1 && this.line <= this.count) {
					document.getElementById("param1").disabled = false;
					document.getElementById("param1").name = "select_type";
					document.getElementById("param1").value = suggest_json[this.line-1]["t"];

					document.getElementById("param2").disabled = false;
					document.getElementById("param2").name = "select_code";
					document.getElementById("param2").value = suggest_json[this.line-1]["c"];
				}
				break;
			default:
				break;
		}
	},
	display: function(_display) {
		if (_display == "inline") {
			var table_html = document.getElementById("suggest_list").innerHTML;
			if (table_html != "") {
				document.getElementById("suggest_list").style.display = _display;
			}
		} else if (_display == "none") {
			document.getElementById("suggest_list").style.display = _display;
		}
	},
	mark_keyword: function(_str, _keyword) {
		return _str.replace(_keyword, "<font class='red bold'>" + _keyword + "</font>");
	},
	work: function() {
		var _type_conf = {
			"stock": "股票",
			"fund": "基金",
			"hkstock": "港股",
			"forex": "外汇",
			"bond": "债券"
		};
		var table_html = "";
		this.line = 0;
		this.count = 0;
		for (var i = 0; i < suggest_json.length; i++) {
			this.count++;

			var code = suggest_json[i]["c"];
			var symbol = suggest_json[i]["s"];
			var name = suggest_json[i]["n"];
			var pinyin = suggest_json[i]["p"];
			var type = suggest_json[i]["t"];

			var _type = _type_conf[type];

			var bgcolor = "";
			if (i % 2 == 1) {
				bgcolor = "bgcolor='#F5F5F5'";
			}

			if (type == "forex") {
				table_html += "  <tr id=\"suggest_" + (parseInt(i) + 1) + "\" onmouseover=\"javascript:this.className='current';this.style.cursor='pointer'\" onmouseout=\"javascript:this.className=''\" onclick=\"javascript:window.open('http://finance.ifeng.com/app/hq/" + type + "/" + symbol + "/')\" >";
			}
			else {
				table_html += "  <tr id=\"suggest_" + (parseInt(i) + 1) + "\" onmouseover=\"javascript:this.className='current';this.style.cursor='pointer'\" onmouseout=\"javascript:this.className=''\" onclick=\"javascript:window.open('http://finance.ifeng.com/app/hq/" + type + "/" + code + "/')\" >";
			}
			table_html += "    <td " + bgcolor + ">" + finance_suggest.mark_keyword(symbol.toUpperCase(), this.keyword.toUpperCase()) + "</td>";
			table_html += "    <td " + bgcolor + ">" + finance_suggest.mark_keyword(name, this.keyword) + "</td>";
			table_html += "    <td " + bgcolor + ">" + finance_suggest.mark_keyword(pinyin.toUpperCase(), this.keyword.toUpperCase()) + "</td>";
			table_html += "    <td " + bgcolor + ">" + _type + "</td>";
			table_html += "  </tr>";
		}
		if (table_html != "") {
			table_html = "<table width='100%' border='0' cellspacing='0' cellpadding='0' class='tab'>" + table_html + "</table>";
		}
		document.getElementById("suggest_list").innerHTML = table_html;
		if (table_html != "") {
			finance_suggest.display("inline");
		} else {
			finance_suggest.display("none");
		}
	},
	typewrite: function(_keyword) {
		var search_name = document.getElementById("loginUl").innerHTML;
		if (_keyword != this.keyword && search_name == '证券') {
			this.keyword = _keyword;
			var oHead = document.getElementsByTagName('HEAD').item(0);
			var oScript = document.createElement("script");
			oScript.type = "text/javascript";
			oScript.src = "http://app.finance.ifeng.com/hq/suggest_v2.php?t=all&q=" + _keyword + "&cb=finance_suggest.work();";
			oHead.appendChild(oScript);
		}
	}
}

var car_suggest =
{
	line: 0,
	count: 0,
	keyword: '',
	trim: function (_str) {
		return _str.replace(/(^\s*)|(\s*$)/g, "");
	},
	move: function(_evt) {
		switch (_evt.keyCode) {
			case 38: //up
				if (this.line > 1) {
					document.getElementById('suggest_' + this.line).className = '';
					this.line = this.line - 1;
					document.getElementById('suggest_' + this.line).className = 'current';
				}
				break;
			case 40: //down
				if (this.line > 0 && this.line < this.count) {
					document.getElementById('suggest_' + this.line).className = '';
				}
				if (this.line < this.count) {
					this.line = this.line + 1;
					document.getElementById('suggest_' + this.line).className = 'current';
				}
				break;
			case 13: //enter
				if (this.line >= 1 && this.line <= this.count) {
					document.getElementById("param1").disabled = false;
					document.getElementById("param1").name = "bname";
					document.getElementById("param1").value = suggest_json[this.line-1][0];

					document.getElementById("param2").disabled = false;
					document.getElementById("param2").name = "sname";
					document.getElementById("param2").value = suggest_json[this.line-1][1];

					document.getElementById("keyword").value = "";
				}
				break;
			default:
				break;
		}
	},
	display: function(_display) {
		if (_display == 'inline') {
			var table_html = document.getElementById("suggest_list").innerHTML;
			if (table_html != '') {
				document.getElementById("suggest_list").style.display = _display;
			}
		}
		else if (_display == 'none') {
			document.getElementById("suggest_list").style.display = _display;
		}
	},
	mark_keyword: function(_str, _keyword) {
		return _str.replace('<font color=red>' + this.trim(_keyword) + '</font>', '<font class="red bold">' + this.trim(_keyword) + '</font>');
	},
	work: function() {
		var table_html = '';
		this.line = 0;
		this.count = 0;

		for (var i = 0; i < suggest_json.length; i++) {
			this.count++;
			var brand_name = suggest_json[i][0]; //品牌
			var serial_name = suggest_json[i][1]; //车系
			var search_content = suggest_json[i][2]; //匹配的完整内容(品牌+车系)

			var bgcolor = '';
			if (i % 2 == 1) {
				bgcolor = 'bgcolor="#F5F5F5"';
			}
			table_html += '<tr id="suggest_' + (parseInt(i) + 1) + '" onmouseover="javascript:this.className=\'current\'; this.style.cursor=\'pointer\'" onmouseout="javascript:this.className=\'\'" onclick="javascript:window.open(\'http://car.auto.ifeng.com/lib/car/suggest_go.php?bname=' + escape(brand_name) + '&sname=' + escape(serial_name) + '\')">';
			table_html += '<td ' + bgcolor + '>' + car_suggest.mark_keyword(search_content, this.keyword) + '</td>';
			table_html += '</tr>';

			//将第一个模糊匹配值存数bname和sname
			if (i == 0) {
				document.getElementById("param1").value = brand_name;
				document.getElementById("param2").value = serial_name;
			}
		}
		if (table_html != '') {
			table_html = '<table width="100%" border="0" cellspacing="0" cellpadding="0" class="tab">' + table_html + '</table>';
		}

		document.getElementById("suggest_list").innerHTML = table_html;

		if (table_html != '') {
			car_suggest.display('inline');
		}
		else {
			car_suggest.display('none');
			document.getElementById("suggest_list").style.display = 'none';
		}
	},
	typewrite: function(_keyword) {
		if (_keyword != this.keyword) {
			this.keyword = _keyword;
			var oHead = document.getElementsByTagName('HEAD').item(0);
			var oScript = document.createElement('script');
			oScript.type = 'text/javascript';
			oScript.src = 'http://car.auto.ifeng.com/lib/car/suggest_jsonp.php?keyword=' + this.trim(_keyword) + '&callback=car_suggest.work();';
			oHead.appendChild(oScript);
		}
	}
}

header_search.select_option('站内');
