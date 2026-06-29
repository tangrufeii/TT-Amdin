(function () {
  const articleRoot = document.querySelector('[data-role="articles"]');
  const data = {
    title: "Analog Notes",
    subtitle: "记录产品、工程和生活方式里的清醒判断。",
    articles: [
      {
        title: "插件系统别一开始就过度设计",
        excerpt: "先把安装、启停、路由和资源加载跑稳，再谈市场和编排。",
        category: "架构",
        publishedAt: "2026-06-12",
        imageUrl: "/portal/theme-assets/blog-clean/static/img/article-workspace.svg"
      },
      {
        title: "文件主题为什么适合门户第一版",
        excerpt: "主题作者能看懂目录、能替换页面，才是真的低门槛。",
        category: "门户",
        publishedAt: "2026-06-08",
        imageUrl: "/portal/theme-assets/blog-clean/static/img/article-theme.svg"
      },
      {
        title: "后台插件和门户主题不是一回事",
        excerpt: "后台需要权限和运维效率，门户要访问体验和内容表达。",
        category: "前端",
        publishedAt: "2026-05-30",
        imageUrl: "/portal/theme-assets/blog-clean/static/img/article-boundary.svg"
      }
    ]
  };

  function escapeHtml(value) {
    return String(value || "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function render() {
    const title = document.querySelector('[data-role="title"]');
    const subtitle = document.querySelector('[data-role="subtitle"]');
    if (title) title.textContent = data.title;
    if (subtitle) subtitle.textContent = data.subtitle;

    if (!articleRoot) return;
    articleRoot.innerHTML = data.articles
      .map(
        article => `
          <article class="article">
            <img src="${escapeHtml(article.imageUrl)}" alt="${escapeHtml(article.title)}" />
            <div>
              <span class="article__category">${escapeHtml(article.category)}</span>
              <h3>${escapeHtml(article.title)}</h3>
              <p>${escapeHtml(article.excerpt)}</p>
            </div>
            <time>${escapeHtml(article.publishedAt)}</time>
          </article>
        `
      )
      .join("");
  }

  render();
})();
