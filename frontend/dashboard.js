document.addEventListener('DOMContentLoaded', () => {
    const subjectGrid = document.getElementById('subjectGrid');

    // Science icon updated to Flask (bi-flask) as per your image
    const subjects = [
        { name: "Algebra", icon: "bi-calculator-fill" },
        { name: "Geometry", icon: "bi-bounding-box" },
        { name: "Science", icon: "bi-mortarboard-fill" },
        { name: "English", icon: "bi-chat-left-text-fill" },
        { name: "History", icon: "bi-hourglass-split" },
        { name: "Geography", icon: "bi-globe-americas" }
    ];

    subjects.forEach((sub, subIdx) => {
        let chaptersHTML = '';
        // Har subject card ke liye ek unique accordion ID taaki usi card ke chapters aapas mein switch hon
        const accordionId = `accordion-${subIdx}`; 

        for(let i = 1; i <= 5; i++) {
            chaptersHTML += `
                <div class="mb-2">
                    <button class="chapter-btn" data-bs-toggle="collapse" data-bs-target="#ch-${subIdx}-${i}">
                        Chapter ${i} <i class="bi bi-chevron-down small"></i>
                    </button>
                    <div id="ch-${subIdx}-${i}" class="collapse ps-2" data-bs-parent="#${accordionId}">
                        <a href="#" class="option-link"><i class="bi bi-input-cursor-text me-2"></i>Textbox</a>
                        <a href="#" class="option-link"><i class="bi bi-file-earmark-text me-2"></i>Notes</a>
                        <a href="#" class="option-link"><i class="bi bi-controller me-2"></i>Quiz</a>
                    </div>
                </div>`;
        }

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

    // Chart remains blank as requested
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