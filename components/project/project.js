// завантажуємо дані з файлу JSON
function loadProjects() {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", "projects.json");
      xhr.onload = () => {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject(xhr.statusText);
        }
      };
      xhr.onerror = () => reject(xhr.statusText);
      xhr.send();
    });
  }
  
  // створюємо HTML-код для проекту
  function createProjectHTML(project) {
    return `
      <div class="project ${project.category}">
        <img src="${project.image}" alt="${project.title}">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <a href="${project.link}" target="_blank">View Project</a>
      </div>
    `;
  }
  
  // створюємо HTML-код для кнопки фільтру
  function createFilterButtonHTML(category) {
    return `
      <button class="filter-button" data-category="${category}">
        ${category}
      </button>
    `;
  }
  
  // вставляємо HTML-код для проектів та категорій на сторінку
  function renderProjects(projects) {
    // отримуємо контейнер для проектів та категорій
    const projectContainer = document.querySelector(".project-container");
    const filterContainer = document.querySelector(".filter-container");
  
    // створюємо HTML-код для кожного проекту та вставляємо його в контейнер
    projectContainer.innerHTML = projects
      .map((project) => createProjectHTML(project))
      .join("");
  
    // отримуємо унікальні категорії проектів
    const categories = [...new Set(projects.map((project) => project.category))];
  
    // створюємо HTML-код для кожної категорії та вставляємо його в контейнер
    filterContainer.innerHTML = categories
      .map((category) => createFilterButtonHTML(category))
      .join("");
  
    // додаємо обробник кліку на кожну кнопку фільтру
    const filterButtons = document.querySelectorAll(".filter-button");
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const category = button.getAttribute("data-category");
        filterProjects(category);
        toggleActiveFilterButton(button);
      });
    });
  }
  
  // додаємо клас "active" до вибраної кнопки фільтру
  function toggleActiveFilterButton(button) {
    const filterButtons = document.querySelectorAll(".filter-button");
    filterButtons.forEach((btn) => {
      if (btn === button) {
        btn
        .classList.add("active");
    } else {
    btn.classList.remove("active");
    }
    });
    }
    
    // фільтруємо проекти за категорією
    function filterProjects(category) {
    const projects = document.querySelectorAll(".project");
    projects.forEach((project) => {
    if (category === "all" || project.classList.contains(category)) {
    project.classList.remove("hidden");
    } else {
    project.classList.add("hidden");
    }
    });
    }
    
    // відображаємо три останні проекти по одному з кожної категорії за замовчуванням
    function showDefaultProjects() {
    loadProjects().then((projects) => {
    const defaultProjects = [];
    const categories = [...new Set(projects.map((project) => project.category))];
    categories.forEach((category) => {
    const categoryProjects = projects.filter((project) => project.category === category);
    const sortedProjects = categoryProjects.sort((a, b) => b.id - a.id);
    defaultProjects.push(sortedProjects[0]);
    });
    renderProjects(defaultProjects);
    });
    }
    
    // відображаємо всі проекти
    function showAllProjects() {
    loadProjects().then((projects) => {
    renderProjects(projects);
    });
    }
    
    // додаємо обробник кліку на кнопку "All"
    const allButton = document.querySelector(".all-button");
    allButton.addEventListener("click", () => {
    showDefaultProjects();
    toggleActiveFilterButton(allButton);
    });
    
    // відображаємо три останні проекти по одному з кожної категорії за замовчуванням при завантаженні сторінки
    showDefaultProjects();  