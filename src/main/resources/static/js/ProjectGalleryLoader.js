document.addEventListener('DOMContentLoaded', () => {
    const designsContainer = document.getElementById('designs-container');

   
    fetch('/designs')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(designs => {
            designsContainer.innerHTML = ''; // Clear the loading spinner

            if (designs.length === 0) {
                designsContainer.innerHTML = '<div class="col-12 text-center"><p class="text-muted">No designs found in the database.</p></div>';
                return;
            }

            // Iterate through the fetched designs and create detailed cards
            designs.forEach(design => {
                const cardHtml = createDesignCard(design);
                designsContainer.insertAdjacentHTML('beforeend', cardHtml);
            });
        })
        .catch(error => {
            console.error('Error fetching kitchen designs:', error);
            designsContainer.innerHTML = `<div class="col-12 text-center"><p class="text-danger">Error fetching designs: ${error.message}. Please check your Spring Boot application logs.</p></div>`;
        });
});

/**
 * Function to create the detailed HTML markup for a single design card.
 * Assumes the design object has: imageUrl, name, layout, and a 'details' field for description.
 */
function createDesignCard(design) {
    // Assuming the description field is named 'details' or 'description' in your KitchenDesign model
    const descriptionText = design.details || design.description || "No detailed description available.";
    const layoutType = design.layout || "Unknown Layout";
    
    return `
        <div class="col-md-6 col-lg-4">
            <div class="project-card shadow-lg border rounded overflow-hidden h-100">
                <img src="${design.imageUrl}" class="img-fluid" alt="${design.name}" 
                    style="width:100%; height: 250px; object-fit: cover;">
                
                <div class="p-4">
                    <span class="badge bg-secondary mb-2">${layoutType} Layout</span>
                    <h5 class="fw-bold">${design.name}</h5>
                    
                    <p class="small text-muted">${descriptionText}</p>
                    
                    <a href="#" class="btn btn-sm btn-primary mt-2">View Details</a>
                </div>
            </div>
        </div>
    `;
}
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.filter-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 1. Update active state on buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // 2. Get the filter category
            const filterValue = button.getAttribute('data-filter');

            // 3. Loop through all project cards and show/hide based on the filter
            projectItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    // Show item with a fade-in animation
                    item.style.display = 'block';
                    item.style.opacity = '1';
                } else {
                    // Hide item
                    item.style.display = 'none';
                    item.style.opacity = '0';
                }
            });
            
            // Re-initialize AOS to apply animations on newly visible elements
            if (typeof AOS !== 'undefined') {
                 AOS.refresh();
            }
        });
    });
});