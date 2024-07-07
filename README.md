# 说明：这段代码是由 chatGPT 编写，并部署在 Cloudflare Workers。

Documentation: [English version](https://github.com/fscarmen2/gh_proxy/blob/main/README_EN.md) | 中文版

## 优点：
* 双栈反代：使用 Cloudflare edge 反向代理目标网，可以让 IPv6 无障碍访问 IPv4 网站
* 白名单检查：允许你控制允许访问的目标域名和特定 URL 字符串，提高安全性。
* 代理功能：可以将请求转发到目标域名，实现代理的功能。

## 部署方法：

### 1. 将代码复制到 Cloudflare Workers 脚本中。
### 2. 根据需要配置 ENABLE_WHITELIST_CHECK、targetDomains 和 urlWhitelist。
* ENABLE_WHITELIST_CHECK：一个布尔值，用于控制是否启用白名单检查。如果设置为 true，则会进行白名单检查；如果设置为 false，则跳过白名单检查。
* targetDomains：一个包含目标域名的数组。只有在白名单中的目标域名才会被允许。
* urlWhitelist：一个包含字符串的数组。URL 必须包含其中之一的字符串才会被允许。字符串匹配时不区分大小写。
* handleRequest(request)：处理请求的异步函数。它首先检查目标域名是否在白名单中，然后检查 URL 是否包含白名单中的字符串。如果通过了白名单检查，它将修改请求的 URL 并将请求转发到目标域名上。
### 3. 部署脚本并将其与你的域名关联（自定义域名）。

## 使用举例:

要访问地址为
```
https://api.github.com/repos/cloudflare/cloudflared/releases/latest
```
替换为 (将 `your-cloudflare-worker-url` 替换为你部署的 Cloudflare Worker 的 URL。)
```
https://your-cloudflare-worker-url/https://api.github.com/repos/cloudflare/cloudflared/releases/latest
```