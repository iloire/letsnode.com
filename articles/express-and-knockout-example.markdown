Title: Node.js example application using express.js and knockout.js (for the LSWC)
Author: Ivan Loire
Date: Wed Nov 11 2011 12:15:53 GMT-0700 (PDT)

I created a simple express.js application for the speech I gave at the [Libre Software World Conference](http://www.libresoftwareworldconference.com/) conference. I used [express.js](http://www.expressjs.com) as web framework and [knockout.js](http://knockoutjs.com/) for view-model binding. The REST service is using REDIS as database.

<div class="alert alert-message">
26/02/2012 <strong>Note</strong>:  This application has evolved to become <a target="_blank" href="http://directorio.cachirulovalley.com">directorio.cachirulovalley.com</a>. You can <a target="_blank" href="https://github.com/iloire/cachirulovalleydirectory">check the project in github.</a>
</div>

## Steps to develop this simple app:

<img src="express-and-knockout-example/demo1.png" style="float: none"></img>

### 1. Creating the REST Service

I'm using [Journey][], a JSON HTTP routing module. 

The routes are defined as simple as this:

<pre class='brush: js'>
	//user related
	router.get('/v1/users/bytag').bind(function (req, res) {  service.GetUsersByTag(req,res) });
	router.get('/v1/users/bycat').bind(function (req, res) {  service.GetUsersByCat(req,res) });
	router.get('/v1/user').bind(function (req, res) {  service.GetUser(req,res) });

	//categories and tags
	router.get('/v1/tags').bind(function (req, res) {  service.GetTags(req,res) });
	router.get('/v1/cats').bind(function (req, res) {  service.GetCats(req,res) });

	//search engine
	router.get('/v1/search').bind(function (req, res) {  service.SearchUsers(req,res) });

	//default route
	router.any.bind(function (req, res) { res.send('Hi there!') });
</pre>

Then you need to implement each service, who will be responsible for accessing the database (REDIS in this case)

[Check the source code in GitHub](https://github.com/iloire/FreelanceDirectory-Server)

### 2. Creating the express app, and adding one http GET handler for the main request

Something like this would work for demo purposes:

<pre class='brush: js; highlight: [3]'>
	app.get('/', function(req, res){
		var service_url = config.serviceHost  + ':' + config.servicePort
		http_wrapper.Get(service_url + '/v1/cats', req, function (data, status){
			if (!data.error){
				res.render('index', {title: 'Home', categories : data.categories,  service_url: service_url});
			}else{
				res.end('error processing request'); //TODO: err handling
			}
		})
	});
</pre>

A [separate library](https://github.com/iloire/FreelanceDirectory-Web/blob/master/lib/http_wrapper.js) is being used to wrap http requests and return JSON data from response.

### 3. Using knockout to bind your UI to a javascript model (view-model binding)

These are the includes needed in the html page:
<pre class='brush: js'>
	<head>
		<title><%= title %></title>
		<link rel="stylesheet" href="/stylesheets/bootstrap.min.css">
		<link rel='stylesheet' href='/stylesheets/style.css' />
		<script src="/javascripts/jquery-1.6.4.min.js" type="text/javascript"></script>
		<script src="/javascripts/jquery.tmpl.min.js" type="text/javascript"></script>
		<script src="/javascripts/knockout-1.2.1.js" type="text/javascript"></script>
		<script src="/javascripts/directory.js" type="text/javascript"></script>
	</head>
</pre>

In the javascript file, we need to create the knockout model-view:

<pre class='brush: js; highlight: [2]'>
	var viewModel = {
	    professionals: ko.observableArray()
	};
</pre>

Take a look at [knockout.js](http://knockoutjs.com/) web site for documentation, training and examples

### 4. Use jQuery to asynchronously update your model (and hence all the UI controls that are binded to it)

Here were are directly calling the REST service, using an Cross Domain JSONP ajax call:

<pre class='brush: js;'>
	function LoadProfessionalsByCat(idcat){
		$('ul#professionals').hide();
		$.ajax({ url: server_root + '/v1/users/bycat', data: {id:idcat}, dataType: 'jsonp', success: function (data) {
			$('ul#professionals').fadeIn();
			viewModel.professionals (data.users);
		}
		});
	}
</pre>

The response (JSON format) is directly passed to the view-model that will render the necessary UI components.
	
## Online demo

<strike>Check the [online demo here](http://www.letsnode.com:8081)</strike><br />
Check <a target="_blank" href="http://directorio.cachirulovalley.com">directorio.cachirulovalley.com</a> better.

## Source code

You can find the source code in GitHub:
<ul>
	<li>[Entire App](https://github.com/iloire/cachirulovalleydirectory) </li>
		

[journey]: https://github.com/cloudhead/journey
[node.js]: http://www.nodejs.org
