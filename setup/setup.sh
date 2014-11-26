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
apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10 > /dev/null

echo 'deb http://downloads-distro.mongodb.org/repo/debian-sysvinit dist 10gen' |  tee /etc/apt/sources.list.d/mongodb.list

apt-get update > /dev/null
apt-get install -y git
apt-get install -y mongodb-org=2.6.4 
apt-get install -y curl
apt-get install -y python-dev
apt-get install -y libxml2-dev
apt-get install -y libxslt1-dev
apt-get install -y vim
curl -sL https://deb.nodesource.com/setup | bash -

apt-get install -y nodejs python-pip openjdk-7-jre-headless

apt-get install -y tomcat7 tomcat7-admin
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

