Title: Let's move!
Author: Ivan Loire
Date: Wed Sept 27 2011 12:15:53 GMT-0700 (PDT)

Hi all! New stack (node.js), new blog!

###Setting up this blog

Wasn't that hard (I promise):

 * Buy a domain name (I used namecheap.com)
 * Enroll de [Amazon EC2 free tier program](http://aws.amazon.com/es/free/) to get your Linux instance on Amazon Ec2 for free :D
 * Get an [Amazon Elastic IP](http://aws.amazon.com/articles/1346) and point your domain to that IP (A record)
 * Set up your environment:
  * Install [node and npm by following this instructions](https://github.com/joyent/node/wiki/Installation)
  * Clone [this blog repository](https://github.com/iloire/letsnode.com) (or whatever node app you would like to try) with git ()
  * Run the blog by installing the node dependencies "npm install" and then running the blog "node /server/server.js"

That wasn't that tough uh? I also changed the blog skin by adding [Twitter BootStrap CSS libraries](http://twitter.github.com/bootstrap/)

###Coming next

If you are new to node, you may find here interesting stuff for you to crack on (stay tunned)

I will post here some difficulties I had when I started working with node and express, interesting tools or modules, and infrastructure tricks to try and make the most of node.js

Thinks to cover (coming soon):

 * Creating a REST service in node.js
 * First application with express.js (MVC framework for node.js)
 * Installing a node.js application on EC2.
 * Using haproxy and fraggle to build a hot deployment, multi version scenario.
 * Some example code..
 * Consuming the REST service from iOS application
 * ...
