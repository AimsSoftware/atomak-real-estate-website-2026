# Deploy ATOMAK from GitHub to a VPS (AR / EN)

Standalone production deployment of ATOMAK Next.js, with no changes to Quoffa services.

## Configuration

- Source: https://github.com/AimsSoftware/atomak-real-estate-website-2026 (main)
- Domain: atomakrealestate.ae and www.atomakrealestate.ae
- App folder: /var/www/atomakrealestate/app
- PM2 app: atomak-web
- Internal Next.js address: 127.0.0.1:3002 (not publicly exposed)
- Nginx config: /etc/nginx/conf.d/atomakrealestate.ae.conf
- Let's Encrypt cert: /etc/letsencrypt/live/atomakrealestate.ae/

## 1. Check the intended VPS and set DNS

On the actual target VPS, read its public IPv4 from its hosting dashboard or run:

    curl -4 https://api.ipify.org

Set DNS for ATOMAK only: A record @ => the verified VPS public IPv4, and CNAME www => atomakrealestate.ae.
Do not reuse Quoffa's example IP without confirming the target VPS. Do not change Quoffa DNS.
Do not add AAAA records without a working IPv6 configuration.
Use dig to verify DNS propagation:

    dig +short A atomakrealestate.ae
    dig +short A www.atomakrealestate.ae

## 2. Clone from GitHub and run Next.js

Requires Git, npm, Node.js >=20 (22 recommended), PM2 and Nginx on the VPS.
First ensure TCP/80 and TCP/443 are open, and 3002 is free:

    ss -ltnp | grep ':3002 ' || true

Then run:

    sudo mkdir -p /var/www/atomakrealestate
    sudo git clone --branch main https://github.com/AimsSoftware/atomak-real-estate-website-2026.git /var/www/atomakrealestate/app
    cd /var/www/atomakrealestate/app
    node -v
    npm -v
    pm2 -v
    npm install --no-package-lock
    npm run build
    pm2 start ecosystem.config.cjs --only atomak-web
    pm2 save
    curl -I http://127.0.0.1:3002/ar

Do not clone into an existing directory; use git pull --ff-only instead.

## 3. Enable HTTP (before requesting a certificate)

    sudo mkdir -p /var/www/atomakrealestate/acme/.well-known/acme-challenge
    sudo cp /var/www/atomakrealestate/app/deploy/nginx/atomak-http.conf /etc/nginx/conf.d/atomakrealestate.ae.conf
    sudo nginx -t && sudo systemctl reload nginx
    curl -I -H 'Host: atomakrealestate.ae' http://127.0.0.1/

Test publicly accessible ACME files after ATOMAK DNS points to this VPS:

    echo atomak-ok | sudo tee /var/www/atomakrealestate/acme/.well-known/acme-challenge/test
    curl -fsS http://atomakrealestate.ae/.well-known/acme-challenge/test
    curl -fsS http://www.atomakrealestate.ae/.well-known/acme-challenge/test

Both should print atomak-ok before Certbot issuance.

## 4. Obtain HTTPS certificate

Install Certbot using the VPS OS package manager. On AlmaLinux if available:

    sudo dnf install -y certbot

Request the certificate without letting Certbot rewrite Nginx configuration:

    sudo certbot certonly --webroot -w /var/www/atomakrealestate/acme --cert-name atomakrealestate.ae -d atomakrealestate.ae -d www.atomakrealestate.ae

Only after successful certificate issuance, activate the separate ATOMAK HTTPS config:

    sudo cp /var/www/atomakrealestate/app/deploy/nginx/atomak-https.conf /etc/nginx/conf.d/atomakrealestate.ae.conf
    sudo nginx -t && sudo systemctl reload nginx
    curl -I https://atomakrealestate.ae/ar
    curl -I https://www.atomakrealestate.ae/en
    sudo certbot renew --dry-run

Check that automatic Certbot renewal is scheduled using systemctl list-timers or your system's cron.

## 5. Deploy later GitHub updates

    cd /var/www/atomakrealestate/app
    bash deploy/deploy-vps.sh

This pulls only the main branch for ATOMAK, rebuilds it and reloads only the atomak-web PM2 process.

## Debug

    sudo nginx -t
    pm2 status
    pm2 logs atomak-web --lines 50
    ss -ltnp | grep ':3002 '
    curl -I http://127.0.0.1:3002/ar
    curl -I https://atomakrealestate.ae/ar

On AlmaLinux with SELinux enforcing, Nginx proxy permissions may require additional configuration if 502 errors occur. Inspect errors first.
Never commit SSL private keys, passwords or production .env files to this public GitHub repository.
