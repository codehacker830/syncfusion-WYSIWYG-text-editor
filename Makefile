default:
	./laravel-mysql.sh
update:
	/opt/plesk/php/7.2/bin/php composer.phar selfupdate
	/opt/plesk/php/7.2/bin/php composer.phar update
clear:
	/opt/plesk/php/7.2/bin/php composer.phar clearcache
	/opt/plesk/php/7.2/bin/php composer.phar dumpautoload
	/opt/plesk/php/7.2/bin/php artisan cache:clear
	/opt/plesk/php/7.2/bin/php artisan optimize:clear