Title: Installing node on Ubuntu with VirtualBox in 15 minutes
Author: Ivan Loire
Date: Sun March 25 2012 12:15:53 GMT-0700 (PDT)

You can have **node.js installed in a virtualbox image** in 15 minutes following these instructions:

## 1. Install VirtualBox

[VirtualBox home page](https://www.virtualbox.org/)

## 2. Get an Ubuntu ready-to-use VirtualBox image

[http://virtualboxes.org/images/ubuntu/](http://virtualboxes.org/images/ubuntu/)

Remember the **login credentials** (usually _ubuntu/reverse_),

## 3. Install node.js

After you login for the first time, type this commands in the console:

	$ sudo apt-get update
	$ sudo apt-get install git-core curl build-essential openssl libssl-dev
	$ git clone https://github.com/joyent/node.git && cd node
	$ git checkout v0.6.13
	$ ./configure
	$ make
	$ sudo make install
	$ node -v

#### Notes:

 * From 0.6, [npm comes with node.js](http://npmjs.org/doc/README.html), **so there is no need for a separate installation**
 * Install the most recent **stable version** (in this case 0.6.13)

# Good to go!!

<img src="installing-node-ubuntu-virtualbox/ubuntu01.png" alt="Ubuntu running node"></img>