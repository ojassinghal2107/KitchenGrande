document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('design-cards-container');
    const loadingIndicator = document.getElementById('loading-indicator');
    const loadDesignsBtn = document.getElementById('load-designs-btn');

    // FIX 1: Add a flag to prevent multiple simultaneous loads
    let isFetching = false;

    const performLoad = () => {
        if (!container || isFetching) return; // Exit if already loading

        isFetching = true; // Set flag to true

        if (loadingIndicator) {
            loadingIndicator.innerHTML = `
                <div class="col-12 text-center py-5">
                    <div class="spinner-border text-warning" role="status"></div>
                    <p class="mt-2 text-warning">Loading Masterpieces...</p>
                </div>`;
        }

        fetch('/designs') 
            .then(response => {
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                return response.json();
            })
            .then(designs => {
                // Reset loading UI
                if (loadingIndicator) loadingIndicator.innerHTML = ''; 
                
                // FIX 2: Clear container only if you want to replace content 
                // (Remove this line if you want the "Scroll to load more" to append instead)
                container.innerHTML = ''; 

                if (!designs || designs.length === 0) {
                    container.innerHTML = '<div class="col-12 text-center"><p class="text-danger">No designs found.</p></div>';
                    return;
                }

                designs.forEach(design => {
                    container.insertAdjacentHTML('beforeend', createDesignCard(design));
                });

                if (typeof AOS !== 'undefined') { AOS.refresh(); }
            })
            .catch(error => {
                console.error('Fetch Error:', error);
                if (loadingIndicator) {
                    loadingIndicator.innerHTML = `<div class="col-12 text-center"><p class="text-danger">Connection Error. Please refresh.</p></div>`;
                }
            })
            .finally(() => {
                // FIX 3: Reset the flag so the user can click again later
                isFetching = false;
            });
    };

    if (loadDesignsBtn) {
        loadDesignsBtn.addEventListener('click', performLoad);
    } else {
        performLoad();
    }

    function createDesignCard(design) {
        const imageUrl = design.imageUrl.startsWith('/') ? design.imageUrl : '/' + design.imageUrl;
        return `
            <div class="col-md-6 col-lg-4 mb-4" data-aos="fade-up">
                <div class="design-card shadow-sm bg-dark">
                    <img src="${imageUrl}" alt="${design.name}" class="img-fluid" style="height: 300px; width: 100%; object-fit: cover;">
                    <div class="design-overlay p-4">
                        <span class="badge bg-warning text-dark mb-2">${design.category}</span>
                        <h4 class="text-white fw-bold mb-1">${design.name}</h4>
                        <p class="text-white-50 small mb-3">${design.description || 'Premium Modular Design'}</p>
                        <a href="projects.html?id=${design.id}" class="btn btn-sm btn-light fw-bold rounded-0">VIEW GALLERY</a>
                    </div>
                </div>
            </div>`;
    }
});