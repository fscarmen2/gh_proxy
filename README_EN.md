# Description: This script is written by ChatGPT and deployed on Cloudflare Workers.

Documentation: English version | [中文版](https://github.com/fscarmen2/gh_proxy/blob/main/README.md)

## Purpose:
* Dual-stack support: Use Cloudflare edge to reverse proxy the target site, enabling IPv6 access to IPv4 websites without issues.
* Whitelist check: Allows you to control and permit access to specific target domains and URL strings, enhancing security.
* Proxy functionality: Forwards requests to the target domain, enabling proxy features.

## Deployments:

### 1. Copy the code into your Cloudflare Workers script.
### 2. Configure the ENABLE_WHITELIST_CHECK, targetDomains, and urlWhitelist as needed:
*ENABLE_WHITELIST_CHECK: A boolean value to control whether the whitelist check is enabled. If set to true, the whitelist check is performed; if set to false, the whitelist check is skipped.
*targetDomains: An array containing the target domains. Only target domains in the whitelist will be allowed.
*urlWhitelist: An array containing strings. The URL must contain at least one of these strings to be allowed. The string matching is case-insensitive.
*handleRequest(request): An asynchronous function that handles the request. It first checks if the target domain is in the whitelist, then checks if the URL contains any of the strings in the whitelist. If the request passes the whitelist check, it modifies the URL and forwards the request to the target domain.
### 3. Deploy the script and associate it with your domain (custom domain).

## Usage Example:

To access the address
```
https://api.github.com/repos/cloudflare/cloudflared/releases/latest
```
replace it with (replace your-cloudflare-worker-url with the URL of your deployed Cloudflare Worker)
```
https://your-cloudflare-worker-url/https://api.github.com/repos/cloudflare/cloudflared/releases/latest
```