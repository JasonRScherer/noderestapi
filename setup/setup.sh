#######################################################
#
#   Script used to install MongoDB, Node and SOLR
#   Used for Debian
#
#
#######################################################
echo -e "##################"
echo -e "# Add needed key #"
echo -e "##################"
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6 > /dev/null

echo "deb [ arch=amd64,arm64 ] http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list
echo -e "#########################"
echo -e "#   Updating and        #"
echo -e "# Installing software   #" 
echo -e "#########################\n"
apt-get update > /dev/null
apt-get install -y git
apt-get install -y mongodb-org
apt-get install -y curl
apt-get install -y python-dev
apt-get install -y libxml2-dev
apt-get install -y libxslt1-dev
apt-get install -y vim
apt-get install -y build-essential

curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -


apt-get install -y nodejs python-pip default-jdk
groupadd tomcat
useradd -s /bin/false -g tomcat -d /opt/tomcat tomcat


curl -O http://www-us.apache.org/dist/tomcat/tomcat-7/v7.0.79/bin/apache-tomcat-7.0.79.tar.gz
mkdir /opt/tomcat
tar xzvf apache-tomcat-7*tar.gz -C /opt/tomcat --strip-components=1
chgrp -R tomcat /opt/tomcat
chmod -R g+r /opt/tomcat/conf
chmod g+x /opt/tomcat/conf
chown -R tomcat /opt/tomcat/webapps/ /opt/tomcat/work/ /opt/tomcat/temp/ /opt/tomcat/logs/ 
##HERE STOPPED


echo -e "#########################"
echo -e "#        Back up        #"
echo -e "#    Tomcat-users.xml   #" 
echo -e "#########################\n"
cp /etc/tomcat7/tomcat-users.xml /etc/tomcat7/tomcat-users.xml.bak
echo -e "#########################"
echo -e "#      Copy Basic       #"
echo -e "#   Tomcat Users File   #"
echo -e "#########################\n"
cp ./tomcat-users.xml /etc/tomcat7/tomcat-users.xml

curl http://archive.apache.org/dist/lucene/solr/4.6.1/solr-4.6.1.tgz | tar xz
endent
echo -e "#########################"
echo -e "# Copy libraries needed #"
echo -e "#########################\n"
cp solr-4.6.1/example/lib/ext/* /usr/share/tomcat7/lib/
echo -e "#########################"
echo -e "#     Copy solr.war     #"
echo -e "#########################\n"
cp solr-4.6.1/dist/solr-4.6.1.war /var/lib/tomcat7/webapps/solr.war
echo -e "#########################"
echo -e "#     Copy support      #"
echo -e "#        files          #"
echo -e "#########################\n"
cp -R solr-4.6.1/example/solr /var/lib/tomcat7
chown -R tomcat7:tomcat7 /var/lib/tomcat7/solr

echo -e "#########################"
echo -e "#      Install lxml     #"
echo -e "#########################\n"
pip install lxml

echo -e ""

echo -e "########################"
echo -e "#   Copying updated    #"
echo -e "#   schema.xml file    #"
echo -e "########################"

cp schema.xml /var/lib/tomcat7/solr/collection1/conf/
service tomcat7 restart
git clone https://github.com/10gen-labs/mongo-connector.git
cd mongo-connector
python setup.py install
cd ..

echo -e "#########################"
echo -e "#      Cleaning up      #"
echo -e "#########################"

rm -r mongo-connector
rm -r solr-4.6.1


npm install -g express
npm install -g express-generator
pip install cssselect

echo -e "########################"
echo -e "#   Copying updated    #"
echo -e "#    pysolr.py file    #"
echo -e "########################"

cp pysolr.py /usr/local/lib/python2.7/dist-packages/pysolr-3.2.0-py2.7.egg/pysolr.py


cd .. && npm install
mkdir data
