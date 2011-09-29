Title: Moving from .NET to node.js
Author: Ivan Loire
Date: Wed Sept 28 2011 12:15:53 GMT-0700 (PDT)

I have been a Microsoft.NET programmer for a long time. [Not that I loved the way Microsoft was handling things as a company](http://www.lessonsoffailure.com/uncategorized/dear-microsoft/), butI liked the way I could handcraft software on the .NET platform, and make the most of **OOP, component orientation, design patterns, [ORM](http://en.wikipedia.org/wiki/Object-relational_mapping)** and so..

I have been doing [desktop and web applications for a while], and the .NET platform gave me a good IDE and a powerful framework to develop applications in a fast and efficient manner. Also enjoyed the way web development on the .NET platform has evolved from ASP.NET WebForms to [ASP.NET MVC](http://www.asp.net/mvc). Please, don't say that developing web applications in ASP.NET is painful if you haven't tried **ASP.NET MVC**.

Live was good.. and then [node.js][] came in the way...

## Starting with node.js

4 months ago, I was invited to join a startup focused in developing a high performance vertical social platform. They had already started by creating a basic **REST service functionality (using node.js)**, and native mobile applications (iOS and Android), and they needed the web version.

Basically, they needed a web and web mobile version of a social application.. for a potential audience of 2 million users... in two months.. in a technology I have never touch before.. it sounded like a real challenge you can not say no!

I joined a high skilled team, leaded by [@gimenete][], who [had been playing with node.js and redis for a while (link in spanish)](http://es.debugmodeon.com/articulo/introduccion-a-node-js), and started to work on my MacBook with a couple of iTerms consoles, a text editor (TextMate) and a web browser.... (quite a change from being used to work with a 2GB IDE - aka Visual Studio).

With the help of [@gimenete][] I quickly step over the learning curve of Javascript, asynchronous, event driven programming.. it was fun!

This were my thoughts about node.js, comparing to .NET ASP.NET MVC:

## node.js PROS:
 * node.js is **fast**....
 * node.js is **insanely fast!**
 * the only thing you need to program on node.js is a **text editor ([textmate is good enough](http://macromates.com/)), a web browser and a console.**
 * you can install modules and dependencies in a matter of seconds by using [Node Package Manager or 'npm'](http://npmjs.org/)
 * you get a **common language** for both client and server, and you can focus in being good at it :). Your javascript skills will improve a lot. You'll end up writing **better client-side code**.
 * transferring data from server to client and the other way became a simple task. They both speak **json** fluently.
 * you can **reuse the exact same code** (form validation code for example) in both client browser and server side.
 * node.js library is [non-blocking](http://blog.mixu.net/2011/02/01/understanding-the-node-js-event-loop/), and uses just **one thread per instance**, so you don’t have to worry when accessing system resources like files, since there will no be two clients accessing the same resource concurrently (unless you are using [more than on instance per machine](http://stackoverflow.com/questions/2387724/node-js-on-multi-core-machines))
 * you get your development environment ready to work in any machine in 10 minutes.
 * it’s **free**
 * it’s **open source**, and there is a nice, [active community](http://howtonode.org/) out there helping out people using node.js.
 * node.js hasn’t been there for long, but it already has [lots of modules](https://github.com/joyent/node/wiki/modules) you can use for common tasks
 * node.js is **really fast** (wait, I think I said that already, sorry)
 * if you are developing apps with node.js, you probably are (or will) using Mac Os X. And that's a pleasure to work with that OS...

## node.js CONS:
 * node hasn’t been there that much, so there are still bugs and things to be improved.
 * if you came from .NET, you miss some of the safeness of static typed languages. you will need to work on your tests to overcome that.
 * you will also miss intellisense and auto-completion.

### So is that important that my web site renders in 0.050 seconds instead of 0.100?

Well, think about it. There are a few reason why you may be interested in using the most efficient web server out there:

 * [Google is recently obsessed with speed too](http://googlewebmastercentral.blogspot.com/2010/04/using-site-speed-in-web-search-ranking.html) (ask your SEO about this)
 * The less pain you give to your visitors, the more visits you will have. [Read about the pain / value ratio] (http://designmind.frogdesign.com/blog/mobile-apps-must-die.html)
 * [Users hate slows sites](http://www.useit.com/alertbox/response-times.html) (in case you didn’t notice)
 * The fastest you return responses, the sooner you are ready to serve more, and you are avoiding server bottlenecks due to concurrency

Ok, ok, enough.. are you going to show me the code, or telling something about that project you worked in?
*- sure! stay tunned for the next blog entry, I will talk about some of the challenges we face, how visitors perceived speed when interacting with our app using mobile or web, how do we handle deploys and sys admin tasks and more..!*

### Are you going to keep using ASP.NET MVC then?

Yes, I will. Node.js is cool and fast, but I don't picture myself using it for every single web application (yet). If you know what you are doing, you can create decent and quite efficient applications on top of the .NET stack ([Ask stackoverflow](http://blog.stackoverflow.com/2008/09/what-was-stack-overflow-built-with/) if you don’t believe me) by fine tuning ASP.NET cache among other things.

I know all the following points can be debated and none of them by itself can be taken as decision trigger, but as a rule of thumb, I think I will use ASP.NET MVC / SQL Server as stack:

 * when I need to do [RAD development](http://en.wikipedia.org/wiki/Rapid_application_development) as products for private environments (intranets, internal applications, etc)
 * and/or when I need [ACID](http://en.wikipedia.org/wiki/ACID) and referential integrity in my application (yes, I know I could use a RDBMS with node)
 * and/or when the client demands it.. xD
 * yes, and I will continue [training people on the .NET platform using ASP.NET MVC](http://www.vitaminasdev.com/Cursos/6/fundamentos-de-asp-net-mvc-3)


I will use node.js (probably with a NoSQL database):

 * when I need to build a **interoperable** high performance REST service (specially if that server server data to mobile applications)
 * and/or when the database doesn’t need to be a RDBMS, or I can **sacrifice ACID for performance** (sometimes you can't, sometimes you do)
 * and/or when we are targeting a massive audience.
 * and/or when I know the application **can get viral** and get a punctual spike of concurrent users.
 * and/or when we will be handling **big amount of data** and we are going to split that **across many servers**, having to had in mind infrastructure costs.


[desktop and web applications for a while]: http://www.iloire.com
[@gimenete]: http://www.twitter.com/gimenete
[node.js]: http://www.nodejs.org