# frabble

inspirational credit:
=====================
https://medium.com/javascript-in-plain-english/build-an-8-puzzle-game-with-pure-javascript-efe424bc252a


how to change apache document root to /koushik/tesseract/frabble (from /var/www/html):
=======================================================================================
1. Change /etc/apache2/sites-available/000-default.conf --> Update value of "DocumentRoot" to "/koushik/tesseract/frabble"

2. Change /etc/apache2/apache2.conf, search for "Directory" --> there will be a few sections, append this at the end:

<Directory /koushik/tesseract/>
        Options Indexes FollowSymLinks Includes ExecCGI
        AllowOverride All
        Require all granted
</Directory>

3. sudo service apache2 restart
