'use strict';

// Function to toggle elements
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

// Function to handle navigation
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

// Function to load different sections dynamically
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
                    setupProjectFilter(); // Ensure project filter works after loading projects
                    setupFilterDropdown(); // Ensure dropdown works after loading projects
                }

                if (loadedCount === sections.length && callback) {
                    callback();
                }
            })
            .catch(error => console.error(`Error loading ${section.url}:`, error));
    });
}

// Function to setup project filtering
function setupProjectFilter() {
    const filterBtn = document.querySelectorAll("[data-filter-btn]");
    const filterItems = document.querySelectorAll("[data-filter-item]");
    const selectValue = document.querySelector("[data-select-value]");
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

function setupFilterDropdown() {
  const filterSelectBox = document.querySelector(".filter-select-box");
  const filterSelectButton = document.querySelector("[data-select]");
  const filterOptions = document.querySelectorAll("[data-select-item]");
  const selectValue = document.querySelector("[data-select-value]");
  const selectList = document.querySelector(".select-list");

  if (!filterSelectBox || !filterSelectButton) return; // Prevent errors if elements are missing

  // Toggle dropdown on click
  filterSelectButton.addEventListener("click", function (event) {
      event.stopPropagation(); // Prevent immediate closing
      filterSelectBox.classList.toggle("active");

      // Show or hide the dropdown list
      if (filterSelectBox.classList.contains("active")) {
          selectList.style.display = "block";
      } else {
          selectList.style.display = "none";
      }
  });

  // Handle option selection
  filterOptions.forEach(option => {
      option.addEventListener("click", function () {
          const selectedCategory = this.innerText.toLowerCase();

          // Update displayed value
          if (selectValue) {
              selectValue.innerText = this.innerText;
          }

          // Apply filtering
          document.querySelectorAll("[data-filter-item]").forEach(item => {
              if (selectedCategory === "all" || item.dataset.category === selectedCategory) {
                  item.classList.add("active");
              } else {
                  item.classList.remove("active");
              }
          });

          // Close dropdown after selection
          filterSelectBox.classList.remove("active");
          selectList.style.display = "none";
      });
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", function (event) {
      if (!filterSelectBox.contains(event.target) && !filterSelectButton.contains(event.target)) {
          filterSelectBox.classList.remove("active");
          selectList.style.display = "none";
      }
  });
}


// Load all sections and initialize navigation after completion
document.addEventListener("DOMContentLoaded", function () {
    loadSections(setupNavigation);
});
