// This flag prevents multiple simultaneous loads
let isFetching = false;

window.loadDesigns = function() {
    const container = document.getElementById('design-cards-container');
    const loadingIndicator = document.getElementById('loading-indicator');

    if (!container || isFetching) return;

    isFetching = true; // Lock the gate

    // Show the spinner
    if (loadingIndicator) loadingIndicator.style.opacity = "1";

    fetch('/designs')
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(designs => {
            if (!designs || designs.length === 0) {
                // If no more designs, stop the observer
                if (loadingIndicator) loadingIndicator.innerHTML = "<p class='text-muted mt-4'>All masterpieces loaded.</p>";
                return;
            }

            // Append new cards without clearing the old ones
            designs.forEach(design => {
                const cardHtml = createDesignCard(design);
                container.insertAdjacentHTML('beforeend', cardHtml);
            });

            if (typeof AOS !== 'undefined') { AOS.refresh(); }
        })
        .catch(error => {
            console.error('Fetch Error:', error);
        })
        .finally(() => {
            isFetching = false; // Open the gate for the next scroll
            if (loadingIndicator) loadingIndicator.style.opacity = "0";
        });
};

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