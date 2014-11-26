service mongod stop
mongod --dbpath ../data/ --replSet "messages" --quiet --fork --logpath /tmp/mongo.log --smallfiles --repair
