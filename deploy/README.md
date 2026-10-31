# Deploy ATOMAK from GitHub to a VPS (AR / EN)

Standalone production deployment of ATOMAK Next.js, with no changes to Quoffa services.

## Configuration

- Source: https://github.com/AimsSoftware/atomak-real-estate-website-2026 (main)
- Domain: atomakrealestate.ae and www.atomakrealestate.ae
- App folder: /var/www/atomakrealestate/app
- PM2 app: atomak-web
- Internal Next.js address: 127.0.0.1:3002 (not publicly exposed)
- Nginx config: /etc/nginx/conf.d/atomakrealestate.ae.conf
- ATOMAK certificate/key files: /etc/ssl/atomakrealestate/fullchain.cer and /etc/ssl/atomakrealestate/private.key
- SSL workflow: acme.sh (if confirmed on the VPS), separately from Quoffa.

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

Both should print atomak-ok before attempting certificate issuance.

## 4. Obtain HTTPS certificate in the same .cer/.key layout as Quoffa

Check which ACME client Quoffa uses, read-only (DO NOT modify Quoffa):

    test -f /root/.acme.sh/acme.sh && echo acme.sh-is-installed
    command -v acme.sh || true
    openssl x509 -in /etc/ssl/quoffaapi/fullchain.cer -noout -issuer -subject -dates
    /root/.acme.sh/acme.sh --list

If /root/.acme.sh/acme.sh is present, use these ATOMAK-only commands; otherwise confirm the installed certificate manager before proceeding.
Find the certificate issuer above; acme.sh can use --server letsencrypt or --server zerossl. Use the matching issuer or your registered ACME account. The example below uses an existing acme.sh default CA and explicitly requests RSA 2048 so installation does not need --ecc:

    sudo mkdir -p /etc/ssl/atomakrealestate
    sudo chmod 700 /etc/ssl/atomakrealestate
    /root/.acme.sh/acme.sh --issue --webroot /var/www/atomakrealestate/acme -d atomakrealestate.ae -d www.atomakrealestate.ae --keylength 2048

After issuance succeeds, install the certificate to ATOMAK-only paths, preserving renewal reload configuration:

    /root/.acme.sh/acme.sh --install-cert -d atomakrealestate.ae --key-file /etc/ssl/atomakrealestate/private.key --fullchain-file /etc/ssl/atomakrealestate/fullchain.cer --reloadcmd 'nginx -t && systemctl reload nginx'
    chmod 600 /etc/ssl/atomakrealestate/private.key
    openssl x509 -in /etc/ssl/atomakrealestate/fullchain.cer -noout -issuer -subject -dates

Only after the files exist and contain a valid certificate, activate ATOMAK's separate HTTPS config:

    cp /var/www/atomakrealestate/app/deploy/nginx/atomak-https.conf /etc/nginx/conf.d/atomakrealestate.ae.conf
    nginx -t && systemctl reload nginx
    curl -I https://atomakrealestate.ae/ar
    curl -I https://www.atomakrealestate.ae/en

Verify the existing acme.sh renewal cron, without changing Quoffa renewals:

    crontab -l | grep acme.sh || true

Do not copy /etc/ssl/quoffaapi files to ATOMAK. A certificate for one domain usually cannot secure another domain unless explicitly included in the certificate SAN list.
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
