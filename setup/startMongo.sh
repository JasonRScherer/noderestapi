service mongod stop
mongod --dbpath ../data/ --replSet "api" --quiet --smallfiles
