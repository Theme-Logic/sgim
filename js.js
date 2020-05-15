var SGIM = {
  setCookie: function(name, value, days) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  },
  getCookie: function(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  },
  eraseCookie: function(name) {
    document.cookie = name + "=; Max-Age=-99999999;";
  },
  injectPaywall: function() {
    $(
      '<div class="paywall"> <div class="paywall__content"> <img src="https://higherlogicdownload.s3.amazonaws.com/SGIM/3459987d-891c-4a21-adb7-5c9b9684418a/UploadedImages/sgim_logo.svg"/> <h1>Ooops, you have reached your limit of 2 free articles</h1> <p> In order to continue reading the SGIM Newsletters, you will need to log in </p><p> <a class="paywall__button" href="https://www.sgim.org/home/members-login" >Login</a > <a class="paywall__button" href="https://connect.sgim.org/newsletters/home" >Go to Home</a > </p></div></div>'
    ).appendTo("body");
    $(".lib-article").addClass("blurred")
  },
  initPaywall: function() {
    var articlesRead = SGIM.getCookie("sgim-reads"),
      times = 0;
	  
	console.log(articlesRead);
	
    times = articlesRead.length > 0 ? parseInt(articlesRead) : 0;
    if (times > 2) {
      SGIM.injectPaywall();
    } else {
      SGIM.setCookie("sgim-reads", times + 1, 30);
    }
  }
};

$(document).ready(function() {
  SGIM.initPaywall();
});
