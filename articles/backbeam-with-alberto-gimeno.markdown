Title: Developer interview: backbeam.io with Alberto Gimeno
Author: Ivan Loire
Date: Thu Oct 10 2013 12:15:53 GMT+0100

<a href="https://twitter.com/gimenete" target="_blank">Alberto Gimeno</a> is the founder of <a href="http://backbeam.io" target="_blank">backbeam.io</a>, a promissing high performance platform as a service build on nodejs. 

He has been keen to answer a few questions about backbeam internals. Enjoy!

[<img src="backbeam-with-alberto-gimeno/backbeam_logo.png" style="float: none"></img>](http://backbeam.io)


## Design / architecture

### 1. Could you briefly describe the architecture behind backbeam? How easily will scale up when you grow?

We have chosen technologies that are well known for their scalability. Almost everything is made in Node.js and we use Redis as our main database. Each project has its own Redis instance so we can migrate projects over servers without hassle thanks to its replication capabilities. For big projects we are experimenting to combine Redis with a disk-based key-value storage (LMDB).

### 2. What challenges do you think you will come across over the next months?

We are continuously improving our server infrastructure: automating and measuring everything and we are continuously planning new features and figuring out how to implement them in the most easy way for our users and our infrastructure. For example we are planning to add advanced versioning to server-side code written by our customers. We are going to use git under the hood and developers will be able to diff, branch and merge code between versions.

## Development

### 1. Name 5 npm modules you couldn't leave without, and 3 new ones you came across with while building Backbeam

Mocha is great to implement our unit tests. Combined with istanbul to estimate the code coverage is awesome. Of course socket.io has been crucial to implement the real-time API. The async module is a must-have for any nodejs project. And finally request is a nice wrapper on top of the HttpClient API that reduces drastically all the boilerplate code needed to perform HTTP requests.

We discovered a few great modules during the development. The apn module has been very useful to implement iOS push notifications. nodemailer is a no-brainer for sending emails from nodejs and shelljs is great to implement system administration tools in nodejs.

### 2. Can you tell us a little bit about the custom nodejs proxy you have developed for backbeam?

It is a must for our cloud service to provide high availability so we wanted no downtimes during deploys. We also needed other features such as the ability to add SSL certificates on the fly without restarting anything. So we decided to create our own http proxy on top of the great node-http-proxy module from nodejitsu. Now we deploy new versions of backbeam and when they are ready we tell the proxy to redirect to the new instance ports. The old instances still serve the ongoing requests and a few minutes later we kill them. This way we have no downtimes and no requests are dropped.

## Performance

### 1. Nodejs and redis are blazing fast. Could you give us some numbers about how fast backbeam is responding a request compared with other services?

Many requests are handled in about 3-5 ms. Usually 1-2ms is spent on the query itself, 1ms is spent on the crypto stuff (checking the request signature) and the rest is time spent on routing the request and generating the response. We are really happy with these numbers :D

### 2. Are you considering in distributing your hosting infrastructure globally (like AWS does) to reduce latency?

We are going to do a migration to a cloud hosting that provides us the ability to have servers in datacenters located in different continents. We have thought a few times on providing the ability for the users to choose a datacenter for each project. We could also provide the ability to have the project working on several datacenters at the same time but that’s more complicated. At this moment we only have our servers in Europe but that’s something we will change in the future.

## Testing 

### 1. Working with a dynamic language like Javascript requires a lot of (maybe extra) testing. Could you give us some numbers? How many tests do you have? How much coverage?

We have thousands of tests. I don’t like to say an exact number because we like to test many things in each single test. People say that tests should only have one reason to fail as a good practice, but we like to test “flows”. For example if we want to test the “change password” functionality we execute the whole process of signup, confirm-password by email, login, change password.

The code coverage is now around the 70%. We think that’s a lot and the parts with less code coverage are the ones that are less critical.

### 2. Which pattern/tools are you using for unit testing? (dependency injection, tools like 'proxyrequire', etc...)

Since we are using blazing fast technologies we like to test everything without mocking. So we actually do functional tests instead of unit tests. We only have mocks of external services such as email, push notifications, etc.

### 3. I believe you are using phantom.js and casper.js... for integration testing. Have you tried zombie.js to speed up some of your integration tests? 

That’s something we want to change. We are using casper (and thus we also use phantom but not directly) and we want to use zombie.js because in our experience casper/phantom is not fast enough and when a test fails the information given is not very useful.

## Databases

### 1. Do you have a different redis process per each particular user account or you share redis databases among users?

We have different redis instances for every project. We even have different redis instances for each environment of each project (each project has two environments: development and production). We’ve done this for many reasons. This way we can move projects across servers easily, the data is isolated for security reasons, the performance of a redis instance does not impact on the others, the I/O operations are distributed over time, etc. For example a redis dump can do a lot of I/O operations but if you have several small instances there is not a unique dump but several small dumps that can be distributed over time.

Redis instances are launched on demand when projects are created.

### 2. Tell us a bit about redis and durability. It is my data safe with backbeam?

Redis supports <a href="http://redis.io/topics/persistence" target="_blank" title="two persistence mechanisms">two persistence mechanisms</a>: AOF (append-only-file) and snapshotting. In backbeam we use both to have the benefits of both of them. In summary AOF writes every single command executed in redis to a file so you can restore all the commands at any moment if the redis instance is shutted down for any reason. On the other hand snapshots have the benefit that they have the minimal size to preserve all the data. Nevertheless redis also supports rewriting the whole AOF file to create the minimal set of commands required to recreate the database. So they are two different approaches that have their pros and cons.

If you are worried for the durability of Redis data you should check this article from its creator: <a href="http://oldblog.antirez.com/post/redis-persistence-demystified.html" target="_blank" title="Redis persistence demystified">Redis persistence demystified</a>. The main thing you should know is that modern operating systems do not actually save the data to disk when you write to the filesystem because the filesystem has several caching mechanisms to speed-up everything. The data is not saved on disk until you call fsync. For most SQL databases you need to tune some parameters to force fsync calls after each database operation if you need the highest durability. But this will decrease the performance of the database. Redis AOF let you tune this setting and we have this set to “everysec” so we have a great balance between speed and durability.

## Deployment

### 1. How does backbeam's release cycle work from the time you have a new feature until your customers see it?

We have a simple yet powerful branching model in our git repository so we have branches for each feature. Some of them are never released, other take weeks and other are implemented and released in one day. It all depends on the complexity of the feature. For example a few times some user has requested something and we have implemented and released it in one day. This is only of course if the feature is very simple to implement and doesn’t need further maintenance in the future.
 
### 2. Do you release new features to a small segment of you customer base first? How do you approach deployment rollbacks in anything fails? How do you handle customer data when rolling back?

We are very careful with data so we develop features taking care of any database state. So the code behaves correctly regardless if the data was generated before or after the feature was deployed. If something fails thanks to our branching model and our deploy system we can quickly roll back to the previous state. We have only needed to do so for trivial problems such as usability issues in the control panel due to JavaScript or CSS edge cases.

### 3. What's your approach on continuos integration and continous delivery? Do you have a build server? which one?

This is something we are working on. We do all the tests in our development machines and we have implemented a few tools to test the mobile SDKs (Android and iOS) from the command line. Our problem is that testing these SDKs in other environments is hard. For example we need to compile the iOS SDK in a Mac.

## Monitoring

### 1. How do you monitor your system for software or hardware failures? Which tools are you using? Have you had any major outage so far?

At the beginning we used htop a lot :) Now we are using statsd from Etsy with Graphite so we can measure many system metrics.

We had a minor outage in one server a few days ago and we have done many things to prevent this in the future. We had a filesystem failure but thanks to our backups we just needed to fix the filesystem and restart the server.

Finally we are also using a third party service (raygun.io) that emails us when an error occurs. This service is great because it’s smart enough to know whether an error is new or not and it shows you all the occurrences of the same error.
Builds

## Backup

### 1. What's your approach on backup?

We are making complete and incremental backups of our entire machines combined with rdiff-backup. The main benefit of rdiff-backup is that you can easily restore separated files. For example if a customer removed something very important by mistake we can recover that file without recovering the state of the whole machine.

## And the last two questions:

### 1. Three decisions you made, and you would not repeat, if you had to rebuild the whole project from scratch.

- Not testing enough at the beginning. In the first months of development (while the product wasn’t even in public beta) some changes broke a lot of things. With enough tests you find and fix the errors more quickly because you know exactly what broke that thing that was working fine until that moment.

- Not communicating or documenting the service enough at the beginning. In the first weeks we had to answer many questions of things that were just not enough documented. With better documentation from the beginning those users and our team wouldn’t have had to invest that time writing and answering email messages. 

- Not measuring enough at the beginning. It helps you a lot finding potential things to optimize.

Other than that we have learnt a lot of JavaScript patterns to do the code more readable, maintainable and easy to evolve without having to change many things at many places even for small changes :)

### 2. Three decisions you made and you are really proud of

- Choosing nodejs as main development platform and redis as main database.
- Making the SDKs Open Source.
- Waiting to implement some features that are important but you don’t know how to implement them because there are many possible approaches to follow. As the time goes the usage tells you which way is the right way to implement them. If you make too early decisions you can end having a feature that you can’t scale or change without breaking compatibility, etc.

## Is there any other thing you would like to share with us?

I think your questions have covered the most important parts of the development process. So I only have left to invite anyone to start using Backbeam to focus on their next apps instead of worrying about the infrastructure. We take care of the infrastructure and the boring stuff for you :)