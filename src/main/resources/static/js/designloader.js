document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('design-cards-container');
    const loadingIndicator = document.getElementById('loading-indicator');
    const loadDesignsBtn = document.getElementById('load-designs-btn');

    const performLoad = () => {
        if (!container) return;

        // Ensure spinner is visible
        if (loadingIndicator) {
            loadingIndicator.innerHTML = '<div class="col-12 text-center py-5"><div class="spinner-border text-warning" role="status"></div><p class="mt-2 text-warning">Loading Masterpieces...</p></div>';
        }

        // Using absolute path to ensure it works on every page
        fetch('/designs') 
            .then(response => {
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                return response.json();
            })
            .then(designs => {
                // CLEAR the buffering message
                if (loadingIndicator) loadingIndicator.innerHTML = ''; 
                container.innerHTML = ''; 

                if (!designs || designs.length === 0) {
                    container.innerHTML = '<div class="col-12 text-center"><p class="text-danger">No designs found.</p></div>';
                    return;
                }

                designs.forEach(design => {
                    const cardHtml = createDesignCard(design);
                    container.insertAdjacentHTML('beforeend', cardHtml);
                });

                if (typeof AOS !== 'undefined') { AOS.refresh(); }
            })
            .catch(error => {
                console.error('Fetch Error:', error);
                if (loadingIndicator) {
                    loadingIndicator.innerHTML = `<div class="col-12 text-center"><p class="text-danger">Connection Error. Please refresh.</p></div>`;
                }
            });
    };

    // LOGIC CHECK
    if (loadDesignsBtn) {
        // If button exists (kitchens.html), wait for click
        loadDesignsBtn.addEventListener('click', performLoad);
    } else {
        // If no button (index.html), load immediately
        performLoad();
    }

    function createDesignCard(design) {
        const imageUrl = design.imageUrl.startsWith('/') ? design.imageUrl : '/' + design.imageUrl;
        return `
            <div class="col-md-6 col-lg-4" data-aos="fade-up">
                <div class="design-card shadow-sm bg-dark">
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
});