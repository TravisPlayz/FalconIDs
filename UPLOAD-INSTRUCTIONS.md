# Falcon IDs upload guide (cPanel)

Use this guide to publish the website to your domain via cPanel.

## 1) Files to upload
Upload these files to your domain document root (usually `public_html/`):

- `index.html`
- `privacy.html`
- `404.html`
- `styles.css`
- `script.js`
- `.htaccess`

## 2) cPanel steps
1. Log in to cPanel.
2. Open **File Manager**.
3. Go to `public_html` (or the subdomain folder tied to your domain).
4. Upload all files listed above.
5. If there is an old `index.html`, rename it first (for backup) then keep the new one.
6. Confirm permissions are standard: files `644`, folders `755`.

## 3) Connect the contact form
The form is validated and functional on-page. To send real messages:

1. Open `script.js`.
2. Set `CONTACT_ENDPOINT` to your form handler URL (for example your API endpoint).
3. Re-upload `script.js`.

Example:
```js
const CONTACT_ENDPOINT = 'https://yourdomain.com/api/contact';
```

## 4) Domain checks after upload
- Visit `https://yourdomain.com` and confirm homepage loads.
- Visit `https://yourdomain.com/privacy.html`.
- Visit a fake URL like `https://yourdomain.com/does-not-exist` and confirm custom 404 page.
- On mobile width, verify menu button opens/closes navigation.

## 5) If your domain still shows old content
- Clear browser cache.
- In cPanel, purge any caching plugin/proxy if enabled.
- Wait 1–5 minutes for host cache refresh.
