const panels = {
  veli: {
    title: "Aklınız çocuğunuzda. Bilgiler elinizin altında.",
    text: "Günlük rapor, yemek programı ve okuldan gelen haberler. Birden fazla çocuğunuz varsa her birinin gününü aynı yerden takip edin.",
    bullets: ["Yalnızca kendi çocuğunuza ait paylaşımlar", "Öğretmenle çocuk bazlı mesajlaşma", "Fotoğraf paylaşım izni sizin elinizde"],
    preview: "veli"
  },
  ogretmen: {
    title: "Daha düzenli işler. Çocuklara daha çok odak.",
    text: "Atandığınız sınıfların yoklamasını, günlük raporlarını ve bakım kayıtlarını aynı gün akışı içinde takip edin.",
    bullets: ["Sınıf bazlı yoklama, giriş ve çıkış", "Taslak ve doğrulanmış günlük raporlar", "Program, duyuru ve veli iletişimi"],
    preview: "ogretmen"
  },
  yonetici: {
    title: "Okulun bütünü, anlaşılır bir görünümde.",
    text: "Sınıflar, öğretmen atamaları ve veli eşleştirmeleri. Günlük işlerden aidat takibine kadar okulunuzun düzenini koruyun.",
    bullets: ["Öğrenci, sınıf ve hesap yönetimi", "Aylık fatura ve havale bildirimleri", "Okul geneli duyurular ve anketler"],
    preview: "yonetici"
  }
};

document.querySelectorAll("[data-role]").forEach((button) => {
  button.addEventListener("click", () => {
    const role = panels[button.dataset.role];
    document.querySelectorAll("[data-role]").forEach((item) => item.setAttribute("aria-selected", item === button ? "true" : "false"));
    const title = document.querySelector("[data-role-title]");
    const text = document.querySelector("[data-role-text]");
    const list = document.querySelector("[data-role-list]");
    if (!role || !title || !text || !list) return;
    title.textContent = role.title;
    text.textContent = role.text;
    list.replaceChildren(...role.bullets.map((bullet) => {
      const item = document.createElement("li");
      item.textContent = bullet;
      return item;
    }));
    document.querySelectorAll("[data-preview]").forEach((panel) => {
      panel.classList.toggle("hidden", panel.dataset.preview !== role.preview);
    });
  });
});

const menu = document.querySelector("#more");
document.querySelector("[data-open-more]")?.addEventListener("click", () => menu?.showModal());
menu?.addEventListener("click", (event) => { if (event.target === menu) menu.close(); });
