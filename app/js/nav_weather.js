function loadScript(src)
{
	var head = document.getElementsByTagName("head")[0];
	var js = document.createElement("script");
	js.setAttribute("src",src);
	head.appendChild(js);
}
function weather_city_callback(_weather_city)
{
	weather_city = _weather_city;
	get_weather();
}
function get_weather()
{
	loadScript("http://news.ifeng.com/weather/js/"+weather_city+".js");
}
function weather_callback(_weather_yb)
{
	var weather = _weather_yb.weather1;
	document.getElementById("nav_weather").innerHTML = "<a href='http://weather.ifeng.com/' target='_blank'>"+_weather_yb.city+"</a><a href='http://weather.ifeng.com/' target='_blank' title='"+_weather_yb.weather1+"'><img src='"+_weather_yb.icon1+"' border='0' width='15' height='15' style='vertical-align:top' /></a><a href='http://weather.ifeng.com/' target='_blank'>"+weather+"</a><a href='http://weather.ifeng.com/' target='_blank'>"+_weather_yb.temperature1+"℃～"+_weather_yb.temperature2+"℃</a>";
}

var weather_city = BX.Cookie.getCookie("weather_city");
if (weather_city == "")
{
	loadScript("http://loc.news.ifeng.com/ipdata/weather_city.php");
}
else 
{
	get_weather();
}
