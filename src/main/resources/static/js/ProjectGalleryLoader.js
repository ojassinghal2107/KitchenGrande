document.addEventListener("DOMContentLoaded", () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Saare buttons se dynamic yellow background reset karo
            filterButtons.forEach(b => {
                b.classList.remove('btn-warning', 'text-dark');
                b.classList.add('btn-outline-warning');
            });

            // Clicked button ko solid active yellow banao
            btn.classList.remove('btn-outline-warning');
            btn.classList.add('btn-warning', 'text-dark');

            // Category fetch execute karo
            const filterValue = btn.getAttribute('data-filter');
            loadGallery(filterValue);
        });
    });
});

function loadGallery(type) {
    const container = document.getElementById('designs-container');
    
    // Loader design wrapper schema injection 
    container.innerHTML = `
        <div class="col-12 text-center py-5">
            <div class="spinner-border text-warning" role="status"></div>
            <p class="mt-3 text-muted fw-bold"><i class="fas fa-spinner fa-spin me-2"></i> Loading designs...</p>
        </div>`;

    let url = (type === 'kitchens') ? '/api/gallery/kitchens' : '/api/gallery/wardrobes';
    
    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            return response.json();
        })
        .then(data => {
            container.innerHTML = ''; // Clear loader screens completely

            if (!data || data.length === 0) {
                container.innerHTML = `
                    <div class="col-12 text-center py-5">
                        <p class="text-danger fw-bold fs-5">No active designs found in this category.</p>
                    </div>`;
                return;
            }

            // Loop patterns matching structure
            data.forEach(design => {
                const cardHtml = createDesignCard(design, type);
                container.insertAdjacentHTML('beforeend', cardHtml);
            });

            // AOS Framework checks
            if (window.AOS) window.AOS.refresh();
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            container.innerHTML = `
                <div class="col-12 text-center py-5">
                    <p class="text-danger fw-bold fs-5">Error fetching data. Please try again.</p>
                    <p class="text-muted small">Verify if Spring Boot server context is actively serving endpoints.</p>
                </div>`;
        });
}

function createDesignCard(design, type) {
    const rawUrl = design.image_url || design.imageUrl || '';
    const imageUrl = rawUrl.startsWith('/') ? rawUrl : '/' + rawUrl;
    const displayCategory = (type === 'kitchens') ? 'Kitchen' : 'Wardrobe';

    return `
        <div class="col-md-6 col-lg-4" data-aos="zoom-in">
            <div class="card h-100 border-0 shadow-sm overflow-hidden" style="border-radius: 15px;">
                <img src="${imageUrl}" class="card-img-top" alt="${design.name}" style="height: 250px; object-fit: cover;">
                <div class="card-body p-4 text-center">
                    <span class="badge bg-warning text-dark mb-2 px-3 py-2 rounded-pill fw-bold" style="font-size: 0.75rem;">${displayCategory}</span>
                    <h5 class="fw-bold text-dark mb-2">${design.name}</h5>
                    <p class="text-muted small mb-0">${design.description || 'Premium Modular Architecture'}</p>
                </div>
            </div>
        </div>
    `;
}