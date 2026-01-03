document.addEventListener('DOMContentLoaded', () => {
    // 1. Get all required elements using their IDs from wardrobes.html
    const loadWardrobesBtn = document.getElementById('loadWardrobesBtn'); 
    const cardsArea = document.getElementById('wardrobes-cards-area');
    const containerSection = document.getElementById('wardrobes-container');
    const ctaSection = document.getElementById('all-wardrobes-cta'); // Section to hide after loading

    if (!loadWardrobesBtn || !cardsArea || !containerSection || !ctaSection) {
        console.error("Required elements (button, card area, or container) not found for wardrobe loading.");
        return;
    }

    // --- Add Event Listener to the Button ---
    loadWardrobesBtn.addEventListener('click', () => {
        loadWardrobeDesigns();
    });

    function loadWardrobeDesigns() {
        // Disable button and show loading state
        loadWardrobesBtn.disabled = true;
        loadWardrobesBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Loading...';
        
        // Show the container section (it starts hidden with d-none)
        containerSection.classList.remove('d-none');
        
        // Show initial loading indicator inside the card area
        cardsArea.innerHTML = '<div class="col-12 text-center py-5"><div class="spinner-border text-primary" role="status"></div><p class="mt-2 text-muted">Fetching wardrobe designs...</p></div>';

        // --- 1. Fetch the data from the Spring Boot API ---
        fetch('/wardrobes') 
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(wardrobes => {
                cardsArea.innerHTML = ''; // Clear loading spinner

                if (wardrobes.length === 0) {
                    cardsArea.innerHTML = '<div class="col-12 text-center py-5"><p class="text-muted">No wardrobe designs found.</p></div>';
                    return;
                }

                // 2. Iterate through the fetched designs and create HTML cards
                wardrobes.forEach(wardrobe => {
                    const cardHtml = createWardrobeCard(wardrobe);
                    cardsArea.insertAdjacentHTML('beforeend', cardHtml);
                });
                
                // Hide the original CTA section once designs are loaded
                ctaSection.style.display = 'none'; 

                // Optional: Refresh AOS animations after content is loaded
                if (typeof AOS !== 'undefined') {
                    AOS.refresh();
                }
            })
            .catch(error => {
                // 3. Handle any errors
                console.error('Error fetching wardrobe designs:', error);
                cardsArea.innerHTML = `<div class="col-12 text-center py-5"><p class="text-danger">Error fetching data: ${error.message}. Please ensure the server is running and the endpoint is correct.</p></div>`;
                
                // Reset button state on error
                loadWardrobesBtn.disabled = false;
                loadWardrobesBtn.innerHTML = '<i class="fas fa-redo me-2"></i> Try Again';
            });
    }

    // Function to create the HTML markup for a single wardrobe card
    function createWardrobeCard(wardrobe) {
        const descriptionText = wardrobe.details || wardrobe.description || "Designed for maximum storage and style.";
        const wardrobeType = wardrobe.type ? wardrobe.type.toLowerCase() : 'Custom'; 
        const badgeClass = (wardrobeType === 'sliding') ? 'bg-info' : 'bg-secondary';
        
        // Ensure the path starts with a slash if it doesn't already, for consistency
        // This is a common pattern to fix image loading issues when Spring serves static files
        const imageUrl = wardrobe.imageUrl.startsWith('/') ? wardrobe.imageUrl : '/' + wardrobe.imageUrl; 
        
        return `
            <div class="col-md-6 col-lg-4" data-aos="zoom-in">
                <div class="project-card shadow border rounded overflow-hidden h-100">
                    <img src="${imageUrl}" class="card-img-top" alt="${wardrobe.name}" 
                        style="width:100%; height: 280px; object-fit: cover;">
                    
                    <div class="p-4">
                        <span class="badge ${badgeClass} mb-2">${wardrobeType.toUpperCase()}</span>
                        <h5 class="fw-bold">${wardrobe.name}</h5>
                        
                        <p class="small text-muted">${descriptionText.substring(0, 80)}...</p>
                        
                        <a href="wardrobes-detail.html?id=${wardrobe.id}" class="btn btn-sm btn-primary mt-2">View Design</a>
                    </div>
                </div>
            </div>
        `;
    }
});