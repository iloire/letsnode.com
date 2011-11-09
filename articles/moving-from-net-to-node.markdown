Title: ch.1: Moving from Microsoft .NET to node.js
Author: Ivan Loire
Date: Wed Sept 28 2011 12:15:53 GMT-0700 (PDT)

I have been a Microsoft.NET programmer for a long time. [Not that I love the way Microsoft was handling things as a company](http://www.lessonsoffailure.com/uncategorized/dear-microsoft/), but I like the way I can handcraft software on the .NET platform, and make the most of **OOP, component orientation, design patterns, [ORM](http://en.wikipedia.org/wiki/Object-relational_mapping)** and so..

I have been doing [desktop and web applications for a while], and the .NET platform gave me a good IDE and a powerful framework to develop applications in a fast and efficient manner. Also enjoyed the way web development on the .NET platform has evolved from ASP.NET WebForms to [ASP.NET MVC](http://www.asp.net/mvc). Please, don't say that developing web applications in ASP.NET is painful if you haven't tried **ASP.NET MVC**.

Life was good.. and then [node.js][] came along...

## Starting with node.js

4 months ago, I was invited to join a startup company focused in developing a high performance social platform. They had already created a basic **REST service functionality (using node.js)**, and native mobile applications (iOS and Android), and they needed the web version.

Basically, they needed the work to be done in two months (for a potential audience of 2 million users).. in a technology I had never touched before.. it sounded like the kind of challenge I would never turn down!

I joined a high skilled team, led by [@gimenete][], who [had been playing with node.js and redis for a while (link in spanish)](http://es.debugmodeon.com/articulo/introduccion-a-node-js), and started to work on my MacBook, a couple of iTerms consoles, a text editor (TextMate) and a web browser.... (quite a change from being used to working with a 2GB IDE - aka Visual Studio).

With the help of [@gimenete][] I quickly stepped over the learning curve of Javascript. Asynchronous, event driven programming was fun!

These are my thoughts about node.js, compared to .NET ASP.NET MVC:

## node.js PROS:
 * node.js is **fast**....
 * node.js is **insanely fast!**
 * the only thing you need to program on node.js is a **text editor ([textmate is good enough](http://macromates.com/)), a web browser and a system console.**
 * you can install node.js modules and dependencies in a matter of seconds by using [Node Package Manager or 'npm'](http://npmjs.org/)
 * you get a **common language** for both client and server, and you can focus on being good at it :). Your javascript skills will improve a lot. You'll end up writing **much better client-side code**.
 * transferring data from server to the client and the other way around becomes a simple task. They both speak **json** fluently. No need for marshalling or serialization.
 * you can **reuse the exact same code** (form validation code for example) in both client browser and server.
 * node.js library is [non-blocking](http://blog.mixu.net/2011/02/01/understanding-the-node-js-event-loop/), and uses just **one thread per instance**, so you don’t have to worry about accessing system resources like files, because there won't be two clients accessing the same resource at the same time (unless you are using [more than on instance per machine](http://stackoverflow.com/questions/2387724/node-js-on-multi-core-machines))
 * you get your development environment ready to work in any machine in 10 minutes.
 * it’s **free**
 * it’s **open source**, and there is a nice, [active community](http://howtonode.org/) out there helping out people using node.js.
 * node.js hasn’t been there for long, but it already has [lots of modules](https://github.com/joyent/node/wiki/modules) you can use for common tasks
 * node.js is **really fast** (wait, I think I said that already, sorry)
 * if you are developing apps with node.js, you probably are (or will be) using Mac Os X. (and that's a pleasure to work with)

## node.js CONS:
 * node.js hasn’t been there too long, so there are still bugs and things to be improved.
 * if you came from .NET, you will miss the feeling of safety that static typed languages give you. You will need to work harder on your tests to overcome that.
 * debugging is hard.
 * you will also miss intellisense and auto-completion.

### So is it that important that my web site renders in 0.050 seconds instead of 0.100 seconds?

Well, think about it. There are a few reasons why you may be interested in using the most efficient web server available:

 * [Google is recently obsessed with speed too](http://googlewebmastercentral.blogspot.com/2010/04/using-site-speed-in-web-search-ranking.html) (ask your SEO about this)
 * The less pain you give your visitors, the more visits you will have. [Read about the pain / value ratio](http://designmind.frogdesign.com/blog/mobile-apps-must-die.html)
 * [Users hate slow sites](http://www.useit.com/alertbox/response-times.html) (in case you didn’t notice)
 * The fastest you return responses, the sooner you will be ready to serve more, and you will avoid server bottlenecks

Ok, ok, enough.. are you going to show me the code?
*- sure! stay tunned for the next blog entry, I will talk about some of the challenges we face, how visitors perceived speed when interacting with our app using mobile or web, how do we handle deploys and sys admin tasks and more..!*

### Are you going to keep using ASP.NET MVC then?

Yes, I will. Node.js is very cool and fast, but I don't picture myself using it for every single web application. If you know what you are doing, you can create decent and efficient applications on top of the .NET stack ([Ask stackoverflow](http://blog.stackoverflow.com/2008/09/what-was-stack-overflow-built-with/)) by fine tuning ASP.NET cache amongst other things.

I know that all the following points can be debated and none of them by itself can be taken as decision trigger, but as a rule of thumb, I think I will use ASP.NET MVC / SQL Server as stack:

 * when I need to do [RAD development](http://en.wikipedia.org/wiki/Rapid_application_development) in products for private environments (intranets, internal applications, etc)
 * and/or when I need [ACID](http://en.wikipedia.org/wiki/ACID) and referential integrity in my application (yes, I know I could use a RDBMS with node)
 * and/or when the client demands it.. (and the project looks interesting) xD
 * yes, and I will continue [training people on the .NET platform using ASP.NET MVC](http://www.vitaminasdev.com/Cursos/6/fundamentos-de-asp-net-mvc-3)


I will use node.js (probably with a NoSQL database):

 * when I need to build a **interoperable** high performance REST service (specially if that server serves data to mobile applications)
 * and/or when the database doesn’t need to be a RDBMS, or I can **sacrifice ACID for performance** (sometimes you can't, a few times you do)
 * and/or when I know the application **can get viral** and can get a punctual spike of concurrent users or I'm targeting a massive audience.


[desktop and web applications for a while]: http://www.iloire.com
[@gimenete]: http://www.twitter.com/gimenete
[node.js]: http://www.nodejs.org