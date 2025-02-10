'use strict';

// Fungsi untuk toggle elemen
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

// Sidebar toggle
document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.querySelector("[data-sidebar]");
  const sidebarBtn = document.querySelector("[data-sidebar-btn]");
  if (sidebar && sidebarBtn) {
    sidebarBtn.addEventListener("click", function () {
      elementToggleFunc(sidebar);
    });
  }
});

// Fungsi untuk mengatur navigasi
function setupNavigation() {
  const navigationLinks = document.querySelectorAll("[data-nav-link]");
  const pages = document.querySelectorAll("[data-page]");

  if (navigationLinks.length > 0 && pages.length > 0) {
    navigationLinks.forEach((link) => {
      link.addEventListener("click", function () {
        const pageName = this.innerText.toLowerCase();

        pages.forEach((page) => {
          if (page.dataset.page === pageName) {
            page.classList.add("active");
          } else {
            page.classList.remove("active");
          }
        });

        navigationLinks.forEach((nav) => nav.classList.remove("active"));
        this.classList.add("active");

        window.scrollTo(0, 0);
      });
    });
  }
}

// Fungsi untuk memuat bagian halaman secara dinamis
function loadSections(callback) {
  const sections = [
    { id: "skills-container", url: "html_components/skills.html" },
    { id: "services-container", url: "html_components/services.html" },
    { id: "resume-container", url: "html_components/resume.html" },
    { id: "contact-container", url: "html_components/contact.html" },
    { id: "blog-container", url: "html_components/blog.html" },
    { id: "projects-container", url: "html_components/projects.html" }
  ];

  let loadedCount = 0;

  sections.forEach(section => {
    fetch(section.url)
      .then(response => response.text())
      .then(data => {
        document.getElementById(section.id).innerHTML = data;
        loadedCount++;
        if (section.id === "projects-container") {
          setupProjectFilter(); // Pastikan filter proyek aktif setelah memuat proyek
        }
        if (loadedCount === sections.length && callback) {
          callback();
        }
      })
      .catch(error => console.error(`Error loading ${section.url}:`, error));
  });
}

// Fungsi untuk mengatur filter proyek
function setupProjectFilter() {
  const filterBtn = document.querySelectorAll("[data-filter-btn]");
  const filterItems = document.querySelectorAll("[data-filter-item]");
  const selectValue = document.querySelector("[data-selecct-value]");
  let lastClickedBtn = filterBtn[0];

  if (filterBtn.length > 0 && filterItems.length > 0) {
    filterBtn.forEach((btn) => {
      btn.addEventListener("click", function () {
        let selectedValue = this.innerText.toLowerCase();
        if (selectValue) {
          selectValue.innerText = this.innerText;
        }

        filterItems.forEach((item) => {
          if (selectedValue === "all" || item.dataset.category === selectedValue) {
            item.classList.add("active");
          } else {
            item.classList.remove("active");
          }
        });

        lastClickedBtn.classList.remove("active");
        this.classList.add("active");
        lastClickedBtn = this;
      });
    });
  }
}

// Muat semua bagian dan pasang event listener navigasi setelah selesai
document.addEventListener("DOMContentLoaded", function () {
  loadSections(setupNavigation);
});
