// Global scope function so HTML can call it
window.loadDesigns = function() {
    const container = document.getElementById('design-cards-container');
    const loadingIndicator = document.getElementById('loading-indicator');

    if (!container) return;

    // Show spinner while fetching
    if (loadingIndicator) {
        loadingIndicator.style.display = 'block';
    }

    fetch('/designs') 
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            return response.json();
        })
        .then(designs => {
            if (!designs || designs.length === 0) {
                if (container.children.length === 0) {
                    container.innerHTML = '<div class="col-12 text-center"><p class="text-danger">No designs found.</p></div>';
                }
                return;
            }

            // Append designs instead of clearing the container
            designs.forEach(design => {
                const cardHtml = createDesignCard(design);
                container.insertAdjacentHTML('beforeend', cardHtml);
            });

            // Hide spinner after loading
            if (loadingIndicator) {
                loadingIndicator.style.display = 'none';
            }

            if (typeof AOS !== 'undefined') { AOS.refresh(); }
        })
        .catch(error => {
            console.error('Fetch Error:', error);
            if (loadingIndicator) {
                loadingIndicator.innerHTML = `<p class="text-danger">Failed to load. Please refresh.</p>`;
            }
        });
};

function createDesignCard(design) {
    const imageUrl = design.imageUrl.startsWith('/') ? design.imageUrl : '/' + design.imageUrl;
    return `
        <div class="col-md-6 col-lg-4" data-aos="fade-up">
            <div class="design-card shadow-sm bg-dark mb-4">
                <img src="${imageUrl}" alt="${design.name}" class="img-fluid" style="height: 300px; width: 100%; object-fit: cover;">
                <div class="design-overlay p-4">
                    <span class="badge bg-warning text-dark mb-2">${design.category}</span>
                    <h4 class="text-white fw-bold mb-1">${design.name}</h4>
                    <p class="text-white-50 small mb-3">${design.description || 'Premium Modular Design'}</p>
                    <a href="projects.html?id=${design.id}" class="btn btn-sm btn-light fw-bold rounded-0">VIEW GALLERY</a>
                </div>
            </div>
        </div>
    `;
}

// Initial check when script loads
document.addEventListener('DOMContentLoaded', () => {
    const loadDesignsBtn = document.getElementById('load-designs-btn');
    if (loadDesignsBtn) {
        loadDesignsBtn.addEventListener('click', window.loadDesigns);
    } else {
        window.loadDesigns();
    }
});