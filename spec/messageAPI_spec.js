var frisby = require('frisby');

frisby.create('Get API')
        .get('http://localhost:3000/msgs/messages')
        .expectStatus(200)
        .toss();
