<?php
class Conf {

	var $smtphost;
	var $dbhost;
	var $dbport;
	var $dbname;
	var $dbuser;
	var $version;

	function Conf() {

		$this->dbhost	= '10.60.6.38';
		$this->dbport 	= '3306';
		$this->dbname	= 'hr_mysql';
		$this->dbuser	= 'orange';
		$this->dbpass	= '';
		$this->version = '2.5-beta.17';

		$this->emailConfiguration = dirname(__FILE__).'/mailConf.php';
		$this->errorLog =  realpath(dirname(__FILE__).'/../logs/').'/';
	}
}
?>