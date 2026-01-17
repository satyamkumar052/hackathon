document.addEventListener('DOMContentLoaded', () => {
    const subjectGrid = document.getElementById('subjectGrid');

    // Each subject now contains exactly 4 chapters for you to rename
    const subjects = [
        { 
            name: "Algebra", 
            icon: "bi-calculator-fill",
            chapters: ["Sets", "Real Numbers", "Polynomials", "Ratio and Proportion"]
        },
        { 
            name: "Geometry", 
            icon: "bi-bounding-box",
            chapters: ["basic Concepts", "Parallel Lines", "Triangles", "Construction of Triangles"]
        },
        { 
            name: "Science", 
            icon: "bi-mortarboard-fill",
            chapters: ["laws of motion", "work and energy", "Current Electricity", "Measurements of Matter"]
        },
        { 
            name: "English", 
            icon: "bi-chat-left-text-fill",
            chapters: ["Life", "A Synposis", "have you ever seen .?", "Have you Thoughts of the verb"]
        },
        { 
            name: "History", 
            icon: "bi-hourglass-split",
            chapters: ["Sources of history", "India: Events after 1960", "India's Internal Challenges", "Economic Development"]
        },
        { 
            name: "Geography", 
            icon: "bi-globe-americas",
            chapters: ["Distributional Maps", "Exogenetic Movements", "Exogentetc movements part-1", "Exogentetc movements part-2"]
        }
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
                        <div class="p-2 border-start ms-3">
                            <a href="#" class="option-link"><i class="bi bi-input-cursor-text me-2"></i>Textbox</a>
                            <a href="#" class="option-link"><i class="bi bi-file-earmark-text me-2"></i>Notes</a>
                            <a href="#" class="option-link"><i class="bi bi-controller me-2"></i>Quiz</a>
                        </div>
                    </div>
                </div>`;
        });

        subjectGrid.innerHTML += `
            <div class="col-md-4">
                <div class="subject-card h-100 shadow-sm">
                    <div class="card-icon"><i class="bi ${sub.icon}"></i></div>
                    <h3 class="card-title">${sub.name}</h3>
                    <div class="chapters-list" id="${accordionId}">
                        ${chaptersHTML}
                    </div>
                </div>
            </div>`;
    });

    // Chart remains blank (0 points) as requested initially
    const ctx = document.getElementById('performanceChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: subjects.map(s => s.name),
            datasets: [{
                label: 'Points',
                data: [0, 0, 0, 0, 0, 0],
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