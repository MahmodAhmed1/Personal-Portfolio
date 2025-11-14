// Keep track of both filters
let currentDashboardFilter = 'all';
let currentToolFilter = 'all';

// Combined filtering logic
function applyFilters() {
    const cards = document.querySelectorAll('.dashboard-card');
    cards.forEach(card => {
        const cardType = card.getAttribute('data-type');
        const cardTool = card.getAttribute('data-tool');
        
        const matchesDashboard = (currentDashboardFilter === 'all' || cardType === currentDashboardFilter);
        const matchesTool = (currentToolFilter === 'all' || cardTool === currentToolFilter);
        
        if (matchesDashboard && matchesTool) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
    
    // Animate visible cards
    setTimeout(() => {
        const visibleCards = document.querySelectorAll('.dashboard-card:not(.hidden)');
        visibleCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }, 50);
}

// Dashboard Filter functionality - only one dashboard filter can be active
function filterDashboards(type) {
    currentDashboardFilter = type;
    
    // Get the parent filter section of the clicked button
    const clickedButton = event.target;
    const parentSection = clickedButton.closest('.filter-section');
    
    // Remove active from all buttons in this section only
    const buttonsInSection = parentSection.querySelectorAll('.filter-btn');
    buttonsInSection.forEach(btn => btn.classList.remove('active'));
    
    // Add active to the clicked button only
    clickedButton.classList.add('active');
    
    applyFilters();
}

// Tool Filter functionality - only one tool filter can be active
function filterByTool(tool) {
    currentToolFilter = tool;
    
    // Get the parent filter section of the clicked button
    const clickedButton = event.target;
    const parentSection = clickedButton.closest('.filter-section');
    
    // Remove active from all buttons in this section only
    const buttonsInSection = parentSection.querySelectorAll('.filter-btn');
    buttonsInSection.forEach(btn => btn.classList.remove('active'));
    
    // Add active to the clicked button only
    clickedButton.classList.add('active');
    
    applyFilters();
}

// PDF Modal functionality
function openPDF(title, pdfPath) {
    const modal = document.getElementById('pdfModal');
    const viewer = document.getElementById('pdfViewer');
    const titleElement = document.querySelector('.pdf-modal-title');
    
    titleElement.textContent = title;
    viewer.src = pdfPath + "#zoom=80"; //zoom out alittle bit
    modal.style.display = 'block';
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
}

function closePDF() {
    const modal = document.getElementById('pdfModal');
    const viewer = document.getElementById('pdfViewer');
    
    modal.style.display = 'none';
    viewer.src = '';
    
    // Restore body scroll
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
document.getElementById('pdfModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closePDF();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closePDF();
    }
});

// Smooth scroll and animation on load
window.addEventListener('load', function() {
    const cards = document.querySelectorAll('.dashboard-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// Initial card animation setup
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.dashboard-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
    });
});