(function () {
  const orbit = document.querySelector('[data-role="orbit"]');
  const scene = document.querySelector('[data-role="scene"]');
  const counter = document.querySelector('[data-role="counter"]');
  const detailTitle = document.querySelector('[data-role="photo-title"]');
  const detailDescription = document.querySelector('[data-role="photo-description"]');

  const data = {
    title: "Orbit Gallery",
    subtitle: "用空间层次展示作品、旅拍和项目现场。",
    photos: [
      {
        title: "Dawn Station",
        description: "清晨站台的玻璃反光和冷色空气。",
        location: "Tokyo",
        imageUrl: "/portal/theme-assets/gallery-3d/static/img/photo-dawn.svg"
      },
      {
        title: "Ridge Cabin",
        description: "山脊木屋前的风和长影。",
        location: "Nagano",
        imageUrl: "/portal/theme-assets/gallery-3d/static/img/photo-ridge.svg"
      },
      {
        title: "Quiet Atelier",
        description: "工作室里还没收起的纸样和模型。",
        location: "Shanghai",
        imageUrl: "/portal/theme-assets/gallery-3d/static/img/photo-atelier.svg"
      },
      {
        title: "Harbor Blue",
        description: "傍晚港口蓝调，灯光开始压过天色。",
        location: "Qingdao",
        imageUrl: "/portal/theme-assets/gallery-3d/static/img/photo-harbor.svg"
      }
    ]
  };

  let photos = data.photos;
  let activeIndex = 0;
  let pointerX = 0;
  let pointerY = 0;

  function escapeHtml(value) {
    return String(value || "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function renderCards() {
    if (!orbit) return;
    const count = photos.length || 1;
    orbit.innerHTML = photos
      .map((photo, index) => {
        const angle = (360 / count) * index;
        const depth = 360;
        return `
          <button class="photo-card${index === activeIndex ? " is-active" : ""}" type="button"
            data-index="${index}"
            style="transform: translate(-50%, -50%) rotateY(${angle}deg) translateZ(${depth}px);">
            <img src="${escapeHtml(photo.imageUrl)}" alt="${escapeHtml(photo.title)}" />
            <strong>${escapeHtml(photo.title)}</strong>
            <span>${escapeHtml(photo.location)}</span>
          </button>
        `;
      })
      .join("");
  }

  function updateDetail() {
    const photo = photos[activeIndex];
    if (!photo) return;
    if (counter) counter.textContent = String(activeIndex + 1).padStart(2, "0");
    if (detailTitle) detailTitle.textContent = photo.title || "";
    if (detailDescription) detailDescription.textContent = photo.description || "";
    document.querySelectorAll(".photo-card").forEach((card, index) => {
      card.classList.toggle("is-active", index === activeIndex);
    });
  }

  function updateOrbit() {
    if (!orbit || !photos.length) return;
    const baseAngle = -(360 / photos.length) * activeIndex;
    const tiltX = pointerY * -8;
    const tiltY = baseAngle + pointerX * 8;
    orbit.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
  }

  function bindEvents() {
    if (!orbit) return;
    orbit.addEventListener("click", event => {
      const card = event.target.closest(".photo-card");
      if (!card) return;
      activeIndex = Number(card.dataset.index || 0);
      updateDetail();
      updateOrbit();
    });

    if (scene) {
      scene.addEventListener("pointermove", event => {
        const rect = scene.getBoundingClientRect();
        pointerX = (event.clientX - rect.left) / rect.width - 0.5;
        pointerY = (event.clientY - rect.top) / rect.height - 0.5;
        updateOrbit();
      });
    }
  }

  function render() {
    const title = document.querySelector('[data-role="title"]');
    const subtitle = document.querySelector('[data-role="subtitle"]');
    if (title) title.textContent = data.title;
    if (subtitle) subtitle.textContent = data.subtitle;
    renderCards();
    updateDetail();
    updateOrbit();
  }

  bindEvents();
  render();
})();
