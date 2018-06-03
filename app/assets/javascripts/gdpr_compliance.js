//= require js.cookie

class GDPRCompliance {
  static get COMPLIANCE_COOKIES() {
    return [
      "gdpr_compliance_necessary",
      "gdpr_compliance_statistics",
      "gdpr_compliance_marketing"
    ];
  }

  gdprCookies() {
    var cookies = Cookies.get();

    Object.keys(cookies).forEach(function(key) {
      var compliance_cookie = GDPRCompliance.COMPLIANCE_COOKIES.indexOf(key) > -1;
      if (!compliance_cookie === true) {
        delete cookies[key];
      }
    });

    return cookies;
  }

  addListener(target) {
    if (target.attachEvent) {
      // Support for IE < 9
      target.attachEvent("onclick", this.setCookies);
    } else {
      target.addEventListener("click", this.setCookies, false);
    }
  }

  gdprCookiesButtonListen() {
    var gdprCookiesButton = document.getElementById("gdpr_compliance_btn");

    if (gdprCookiesButton) {
      this.addListener(gdprCookiesButton);
    }
  }

  setCookies() {
    const COOKIES = [
      "gdpr_compliance_necessary",
      "gdpr_compliance_statistics",
      "gdpr_compliance_marketing"
    ];

    for (var i = 0; i < COOKIES.length; i++) {
      let cookieId = "#" + COOKIES[i];

      Cookies.set(COOKIES[i], document.querySelector(cookieId).checked, {
				path: '/',
				expires: 365
			});
		}

    var container = document.getElementById("gdpr_compliance_banner");
    container.parentNode.removeChild(container);
	}

  showGdprBanner() {
    var gdprCookiesBanner = document.getElementById("gdpr_compliance_banner");
    gdprCookiesBanner.classList.toggle("hidden");
    this.gdprCookiesButtonListen();
  }
}

class turbolinkHandler {
	pageHasTurbolinks() {
		return 'Turbolinks' in window;
	}

	eventName(fallback) {
  	return this.pageHasTurbolinks() ? 'turbolinks:load' : fallback
  }
}

var tl = new turbolinkHandler();

var runGdprCompliance = function() {
  var gdprCompliance = new GDPRCompliance();

  if (Object.keys(gdprCompliance.gdprCookies()).length === 0) {
    gdprCompliance.showGdprBanner();
  }
};

document.addEventListener(tl.eventName("DOMContentLoaded"), function() {
	runGdprCompliance();
});


