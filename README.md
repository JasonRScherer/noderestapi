# Node Restful API

This is an example of a basic noderestAPI that allows data to be written to a mongodb and indexed with apache SOLR.

#Features
  - Setup script to install MongoDB, NodeJS, Apache SOLR, and needed requirements
  - Ability to Index Messages with Apache SOLR for fast searching
  - Allow for basic REST Framework with messages and temperatures
  - Script to get data from Raspberry Pi Temp Sensor to MongoDB and outputted on HighStocks.Js

### Version
0.9.0

### Tech

NodeRestAPI uses a number of open source projects to work properly:

* [Twitter Bootstrap] - great UI boilerplate for modern web apps
* [node.js] - evented I/O for the backend
* [Express] - fast node.js network app framework [@tjholowaychuk]
* [jQuery] - For Ajax interaction
* <a href="http://MongoDB.org">MongoDB</a> - Database used 
* <a href="http://lucene.apache.org/solr/">Apache Solr</a> - Used for Fast Searching of MongoDB

### Installation

Navigate to Setup folder

Run setup
rs.initiate() database
### Issues
* Mongodb running in background with startMongo script not working correctly
* 

### Todo's

 - Write Tests
 - More Commenting


[Jason Scherer]:http://github.com/JasonRScherer

