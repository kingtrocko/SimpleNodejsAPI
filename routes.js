var routes = [];
var url = require('url');

module.exports = {
  registerRoute: function(route, handler){
    routes.push({ method: 'GET', route: route, handler: handler});
  },
  process: function(req, res, next) {
		var urlInfo = url.parse(req.url, true);
	  	var info = {
	  		get: urlInfo.query,
		    path: urlInfo.pathname,
        method: req.method
		}
    if(info.path !== '/favicon.ico'){
	  	for(var i = 0; i < routes.length; i++) {
	  		var r = routes[i];
        var match = info.path.match(r.route);

        if((info.method === r.method || '' === r.method) && match) {
	    		info.match = match;
	    		r.handler(req, res, info);
	    		return;
	    	}
      }
    }
	    res.end('');
	}
};
