document.addEventListener('DOMContentLoaded', () => {
    const row1 = document.getElementById('subjectGridRow1');
    const row2 = document.getElementById('subjectGridRow2');

    const subjects = [
        { name: "Book Keeping", icon: "bi-journal-check", chapters: ["Intro to Partnership", "A/C of Not profit", "Reconstitution to Partnership", "Dissolution"] },
        { name: "Secretarial Practice", icon: "bi-file-earmark-person", chapters: ["Sources of Finance", "Source of Corporate Finance", "Issue of Shares", "Issue of Debentures"] },
        { name: "Economics", icon: "bi-graph-up-arrow", chapters: ["Micro/Macro Intro", "Utility Analysis", "Demand Analysis", "Elasticity"] },
        { name: "OCM", icon: "bi-briefcase-fill", chapters: ["Principles of Mgmt", "Functions of Mgmt", "Entrepreneurship", "Business Services"] }
    ];

    subjects.forEach((sub, subIdx) => {
        let chaptersHTML = '';
        const accordionId = `accordion-${subIdx}`; 

        sub.chapters.forEach((chapterName, chIdx) => {
            chaptersHTML += `
                <div class="mb-2">
                    <button class="chapter-btn collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#ch-${subIdx}-${chIdx}">
                        ${chapterName} <i class="bi bi-chevron-down small"></i>
                    </button>
                    <div id="ch-${subIdx}-${chIdx}" class="collapse" data-bs-parent="#${accordionId}">
                        <div class="ps-2">
                            <a href="#" class="option-link"><i class="bi bi-book me-2"></i>Textbook</a>
                            <a href="#" class="option-link"><i class="bi bi-pencil-square me-2"></i>Notes</a>
                            <a href="#" class="option-link"><i class="bi bi-play-circle me-2"></i>Quiz</a>
                        </div>
                    </div>
                </div>`;
        });

        const cardHTML = `
            <div class="col-md-4 mb-4">
                <div class="subject-card h-100 shadow-sm">
                    <div class="card-icon"><i class="bi ${sub.icon}"></i></div>
                    <h3 class="card-title">${sub.name}</h3>
                    <div class="chapters-list" id="${accordionId}">
                        ${chaptersHTML}
                    </div>
                </div>
            </div>`;

        if(subIdx < 3) {
            row1.innerHTML += cardHTML;
        } else {
            row2.insertAdjacentHTML('afterbegin', cardHTML);
        }
    });

    const ctx = document.getElementById('performanceChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: subjects.map(s => s.name),
            datasets: [{
                label: 'Points',
                data: [0, 0, 0, 0],
                backgroundColor: '#ff7e5f',
                borderRadius: 12
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: { y: { beginAtZero: true, max: 100 } }
        }
    });
});

function toggleChat() {
    const popup = document.getElementById('chatPopup');
    popup.style.display = (popup.style.display === 'block') ? 'none' : 'block';
}