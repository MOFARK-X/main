// Меню для мобильных
const menuToggle = document.querySelector('.menu-toggle');
const navList = document.querySelector('.nav-list');

menuToggle.addEventListener('click', () => {
    navList.classList.toggle('active');
});

// Закрыть меню при клике на ссылку
document.querySelectorAll('.nav-list a').forEach(link => {
    link.addEventListener('click', () => {
        navList.classList.remove('active');
    });
});

// Обновить год в подвале
document.getElementById('current-year').textContent = new Date().getFullYear();

// Загрузка проектов из JSON файла
document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('projects-container');

    fetch('projects.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Не удалось загрузить проекты');
            }
            return response.json();
        })
        .then(projects => {
            container.innerHTML = ''; // Убираем надпись "Загружаю..."

            projects.forEach(project => {
                const projectCard = document.createElement('article');
                projectCard.className = 'project-card';

                projectCard.innerHTML = `
                    <img src="${project.image}" alt="${project.title}" class="project-img">
                    <div class="project-info">
                        <h3>${project.title}</h3>
                        <p>${project.description}</p>
                        <div class="project-links">
                            ${project.demoUrl ? `<a href="${project.demoUrl}" target="_blank"><i class="fas fa-external-link-alt"></i> Демо</a>` : ''}
                            ${project.githubUrl ? `<a href="${project.githubUrl}" target="_blank"><i class="fab fa-github"></i> Код</a>` : ''}
                        </div>
                    </div>
                `;

                container.appendChild(projectCard);
            });
        })
        .catch(error => {
            console.error('Ошибка:', error);
            container.innerHTML = '<p class="loading">Не удалось загрузить проекты. Проверьте файл projects.json.</p>';
        });
});