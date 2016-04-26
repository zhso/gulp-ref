if (typeof(regionOrientProv) == 'undefined') {
    var regionOrientProv = '';
    var regionOrientCity = '';
    var regionOrientWeatherCity = '';
    var regionOrientIP = '';
    var regionOrientVersion = '';
    var regionVer = '1.2';
    
    //start
    function getRegionCookie(N) {
    	var c = document.cookie.split("; ");
    	for(var i = 0; i < c.length; i ++) {
    		var d = c[i].split("=");
    		if(d[0] == N){
    			return unescape(d[1]);
    		}
    	}
    	return "";
    }
    
    //Q is 1 min.
    function setRegionCookie(N, V, Q) {
    	var L = new Date();
    	var z = new Date(L.getTime() + Q * 60000);
    	var domain = document.domain;
    	var a = domain.split('.');
    	if (a.length >=2) {
    	    domain = '.'+a[a.length-2]+'.'+a[a.length-1];
    	    document.cookie = N + "=" + escape(V) + ";path=/;domain=" + domain + ";expires=" + z.toGMTString() + ";"
    	}
    };
    
    //callback function----1440 1day; 43200 30days
    function setRegionCookies(locationStr){
        var COOKIE_EXPIRES = 43200;
    	var regionArray = locationStr.split("[");
    	var regionStr = regionArray[0].slice(0,-1);
    	var regionTempArray = regionStr.split("_");
    	var regionProv = regionTempArray[0];
    	var regionCity = regionTempArray[1];
    	var regionWeatherCity = regionArray[1].slice(0,-1);
    	var regionIP = regionArray[2].slice(0,-1);
    	regionIP = regionIP.substring(0,regionIP.lastIndexOf("."))+".x";
        
    	setRegionCookie('prov', regionProv, COOKIE_EXPIRES);
    	setRegionCookie('city', regionCity, COOKIE_EXPIRES);
    	setRegionCookie('weather_city', regionWeatherCity, COOKIE_EXPIRES);
    	setRegionCookie('region_ip', regionIP, COOKIE_EXPIRES);
    	setRegionCookie('region_ver', regionVer, COOKIE_EXPIRES);
    
    	regionOrientProv = getRegionCookie('prov');
        regionOrientCity = getRegionCookie('city');
        regionOrientWeatherCity = getRegionCookie('weather_city');
        regionOrientIP = getRegionCookie('region_ip');
        regionOrientVersion = getRegionCookie('region_ver');
    }
    
    //get the region cookie
    regionOrientProv = getRegionCookie('prov');
    regionOrientCity = getRegionCookie('city');
    regionOrientWeatherCity = getRegionCookie('weather_city');
    regionOrientIP = getRegionCookie('region_ip');
    regionOrientVersion = getRegionCookie('region_ver');
    
    //If there isn't region version cookie value, get the values and then set them in cookie
    if (typeof(regionOrientVersion) == 'undefined' || regionOrientVersion == 'undefined' || regionOrientVersion == '' || regionOrientVersion != regionVer) {
    	document.write('<scr'+'ipt type="text/javascript" src="http://region.ifeng.com/get?format=js&callback=setRegionCookies"><'+'/script>');
    }
}
