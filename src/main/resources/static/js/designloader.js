document.addEventListener('DOMContentLoaded', () => {
    const loadDesignsBtn = document.getElementById('load-designs-btn');
    const container = document.getElementById('design-cards-container');
    const loadingIndicator = document.getElementById('loading-indicator');

    if (loadDesignsBtn) {
        loadDesignsBtn.addEventListener('click', () => {
            // 1. Show loading spinner
            loadingIndicator.innerHTML = '<p class="lead text-warning"><i class="fas fa-spinner fa-spin me-2"></i> Loading designs...</p>';

            fetch('/designs')
                .then(response => {
                    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                    return response.json();
                })
                .then(designs => {
                    // 2. CLEAR BOTH the indicator and the container
                    loadingIndicator.innerHTML = ''; 
                    container.innerHTML = ''; 

                    if (designs.length === 0) {
                        container.innerHTML = '<div class="col-12 text-center"><p class="text-danger">No active designs found.</p></div>';
                        return;
                    }

                    designs.forEach(design => {
                        const cardHtml = createDesignCard(design);
                        container.insertAdjacentHTML('beforeend', cardHtml);
                    });
                })
                .catch(error => {
                    console.error('Error:', error);
                    loadingIndicator.innerHTML = `<p class="text-danger">Error fetching data. Please try again.</p>`;
                });
        });
    }

    function createDesignCard(design) {
        const imageUrl = design.imageUrl.startsWith('/') ? design.imageUrl : '/' + design.imageUrl;
        
        // Added design.description here to fix your display issue
        return `
            <div class="col-md-6 col-lg-4">
                <div class="design-card shadow-sm bg-dark">
                    <img src="${imageUrl}" alt="${design.name}" class="img-fluid">
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
});