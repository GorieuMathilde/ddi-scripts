#!/bin/sh -x

TOMCAT=ves-hx-43.ebi.ac.uk
CLI=ebi-cli-001.ebi.ac.uk

FILENAME=`basename "$0"`

case $HOSTNAME in
${TOMCAT})
  echo "executing script on Tomcat server"

  cd /nfs/public/rw/webadmin/tomcat/bases/pride/tc-pst-prider_test/
  ./bin/stop
  ./bin/clean_dirs
  ./bin/start
  ;;
${CLI})
  echo "executing script on Cli server!"

    sudo -u pst_prd cp ~/web-1.1-SNAPSHOT.war /nfs/public/rw/webadmin/tomcat/bases/pride/tc-pst-prider_test/deploy/ddi-webapp-1.1-SNAPSHOT.war

    sudo -u tc_pst02 scp $0 ${TOMCAT}:
    sudo -u tc_pst02 ssh ${TOMCAT} "~/"${FILENAME}
  ;;
*)
  echo "executing script on local server"

  mvn clean install -P -ddi-security-local,ddi-security-dev
  scp ~/.m2/repository/uk/ac/ebi/ddi/maven/web/1.1-SNAPSHOT/web-1.1-SNAPSHOT.war ebi-cli-001.ebi.ac.uk:

  scp $0 ${CLI}:
  ssh ${CLI} "~/"${FILENAME}
   ;;
esac
