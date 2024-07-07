addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request))
})

// 是否启用白名单检查。如果想放开所有请求，只需将 ENABLE_WHITELIST_CHECK 设置为 false。如果你想启用白名单检查，设置为 true。
const ENABLE_WHITELIST_CHECK = false

// 目标域名白名单
const targetDomains = [
  "https://api.github.com",
  "https://raw.githubusercontent.com",
  "https://gist.githubusercontent.com"
]

// URL 白名单字符串
const urlWhitelist = [
  "user-id-1",
  "user-id-2"
]

async function handleRequest(request) {
  const url = new URL(request.url)
  const path = url.pathname + url.search

  // 分离出目标域名部分
  const targetUrl = path.substring(1) // 移除前导的 '/'
  const targetDomain = targetUrl.split('/')[0] // 获取目标域名

  // Check if the target domain is empty
  if (!targetDomain) {
    return new Response("Github: https://github.com/fscarmen2/gh_proxy\n", { status: 400 })
  }

  if (ENABLE_WHITELIST_CHECK) {
    // 判断目标域名是否在白名单中
    const isDomainAllowed = targetDomains.some(domain => targetUrl.startsWith(domain))
    if (!isDomainAllowed) {
      // 如要提示允许的目标地址，可以在 return 处加上 Allowed domains are: ${targetDomains.join(", ")}
      return new Response(` Error: Invalid target domain.\n Github: https://github.com/fscarmen2/gh_proxy\n`, { status: 400 })
    }

    // 判断 URL 是否包含白名单中的字符串（不区分大小写）
    const isUrlAllowed = urlWhitelist.some(whitelistString =>
      targetUrl.toLowerCase().includes(whitelistString.toLowerCase())
    )
    if (!isUrlAllowed) {
      // 如要提示允许的白名单，可以在 return 处加上 URL must contain one of the following strings: ${urlWhitelist.join(", ")}
      return new Response(` Error: The URL is not in the whitelist.\n Github: https://github.com/fscarmen2/gh_proxy\n`, { status: 403 })
    }
  }

  const newUrl = targetUrl

  const modifiedRequest = new Request(newUrl, {
    method: request.method,
    headers: request.headers,
    body: request.body,
    redirect: 'follow'
  })

  return fetch(modifiedRequest)
}