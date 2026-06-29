(function () {
  const productRoot = document.querySelector('[data-role="products"]');

  function escapeHtml(value) {
    return String(value || "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  async function loadData() {
    const response = await fetch("/portal/plugins/shop/products", {
      headers: { Accept: "application/json" }
    });
    if (!response.ok) {
      throw new Error(`shop demo api failed: ${response.status}`);
    }
    const result = await response.json();
    return result.data || {};
  }

  function render(data) {
    const title = document.querySelector('[data-role="title"]');
    const subtitle = document.querySelector('[data-role="subtitle"]');
    if (title && data.title) title.textContent = data.title;
    if (subtitle && data.subtitle) subtitle.textContent = data.subtitle;

    const products = Array.isArray(data.products) ? data.products : Array.isArray(data) ? data : [];
    if (!productRoot) return;
    productRoot.innerHTML = products
      .map(
        product => `
          <article class="product">
            <span class="product__tag">${escapeHtml(product.tag)}</span>
            <img src="${escapeHtml(product.imageUrl)}" alt="${escapeHtml(product.name)}" />
            <h3>${escapeHtml(product.name)}</h3>
            <p>${escapeHtml(product.description)}</p>
            <strong>${escapeHtml(product.price)}</strong>
          </article>
        `
      )
      .join("");
  }

  loadData().then(render).catch(() => {
    if (productRoot) {
      productRoot.innerHTML = '<p class="theme-error">商品数据加载失败。</p>';
    }
  });
})();
