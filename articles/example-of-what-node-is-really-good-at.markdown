Title: Example of what Node.js is really good at: a single threaded HTTP monitor
Author: Ivan Loire
Date: Wed Dec 19 2011 12:15:53 GMT+0100

An **HTTP monitor** is a service that pings web sites or services in predefined intervals to check if they are up and running as they are supposed to.

## How would you write a program of this kind? 

### If you are using single threaded programming model, you may need to do something like this:
<pre class='brush: js'>
	function ping (host){
		// do stuff, record status in database, etc...
	}

	while (true){ //let's create a endless loop
		foreach (var host in list_of_hosts)
		{
			ping (host)
		}
		sleep (5000) //sleep until next loop. Here were are pinging every 5 seconds.
	}
</pre>

There are several problems with this approach:

- You don't know how much time each ping request is going to take, so you are not really pinging in the desired intervals, since **every call depends on the previous one.**
- You can not defined different ping intervals for each host.
- Your server (your current thread) <strong>is blocked</strong> while you are sleeping or processing ping requests.
	
### The second approach could be by creating threads, one for each ping request:

<pre class='brush: js'>
	function ping (host){
		// do stuff, record status in database, etc...
	}

	while (true){ //let's create a endless loop
		foreach (var host in list_of_hosts)
		{
			var thread=new thread(); //use threadpool or something...
			thread.work (ping (host));
		}
		sleep (1000) //sleep until next loop
	}
</pre>

With this approach, we are creating a separate thread to run each ping request, so each request doesn't depend on the previous one, so we can count on having the right ping intervals between each request.

The problems we face now are:

- The **cost of creating a thread is expensive**. Also context-switching across threads is expensive.
- You may be **limited by the number of current threads** you can currently run. In order to make it efficiently you may need to use a thread pool, etc.
- We are also **blocking the main thread by calling sleep().**
- You need to worry about **controlling access to shared resources.**
- Programming gets complicated...

### Node.js approach: No threads, async calls

Node.js is fantastic for this kind of job. Since everything is async and non-blocking, you can just do something like this:

<pre class='brush: js'>
	
	function ping (host, callback){
		//do http request here.
		//when finish, call "callback"
		callback(status);
	}

	function query_host (host){
		ping(host, function (status) {
			//..  do stuff like saving status in database, etc.
			setTimeout (query_host(host), 2000) //queue for next ping in the next predefined interval
		}));
	}
	
	//main
	foreach (var host in list_of_hosts)
	{
		setTimeout (query_host(host), 2000) //queue job. Every 2 seconds, query_host will be called.
	}

</pre>

By the async nature of node.js, where all **I/O is evented and asynchronous**, every ping request is issued and then **queued, waiting for response**. Once the response is received, the proper callback is called. There is no blocking code anywhere, and memory footprint for an opened socket is low, so your server can handle hundreds or thousands of requests per second easily :-)

**Try that with threads! :)**

## Real life example: Watchmen, HTTP monitor in Node.js 

<img style="max-width:700px" src="https://github.com/iloire/WatchMen/raw/master/screenshots/list_hosts.png" style="float: none" />


I have created an HTTP Monitor in Node.js, so have a look at GitHub. 

<div class="alert-message block-message warning">
	<h3>Download HTTP monitor source code in GitHub</h3>
	<p>Http monitor in Node.js is available in Github</p>
	<div class="alert-actions">
	<a class="btn" href="https://github.com/iloire/WatchMen" target="_blank">HTTP Monitor in Node.js</a>
	</div>
</div>

Note: this article is <a target="_blank" href="https://github.com/iloire/letsnode.com/tree/master/articles">publicly available on GitHub</a>. Feel free to pull request if you want to contribute.

