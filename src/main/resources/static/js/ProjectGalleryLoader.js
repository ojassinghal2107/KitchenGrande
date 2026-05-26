document.addEventListener('DOMContentLoaded', () => {
    const kitchenBtn = document.getElementById('kitchen-btn');
    const wardrobeBtn = document.getElementById('wardrobe-btn');
    const container = document.getElementById('designs-container');

    // 1. JAB KITCHEN BUTTON PAR CLICK HO
    if (kitchenBtn) {
        kitchenBtn.addEventListener('click', () => {
            // Loader inject karo
            container.innerHTML = `
                <div class="col-12 text-center py-5">
                    <div class="spinner-border text-warning" role="status"></div>
                    <p class="mt-3 text-muted fw-bold"><i class="fas fa-spinner fa-spin me-2"></i> Loading Kitchens...</p>
                </div>`;

            // Kitchen API call
            fetch('/api/gallery/kitchens')
                .then(response => {
                    if (!response.ok) throw new Error('HTTP status ' + response.status);
                    return response.json();
                })
                .then(data => {
                    container.innerHTML = ''; // Clear indicator

                    if (!data || data.length === 0) {
                        container.innerHTML = '<div class="col-12 text-center py-5"><p class="text-muted fw-bold fs-5">No kitchens active.</p></div>';
                        return;
                    }

                    // Append dynamic structural cards
                    data.forEach(design => {
                        const cardHtml = createCardStructure(design, 'Kitchen');
                        container.insertAdjacentHTML('beforeend', cardHtml);
                    });

                    if (window.AOS) window.AOS.refresh();
                })
                .catch(error => {
                    console.error('Kitchen Fetch Error:', error);
                    container.innerHTML = '<div class="col-12 text-center py-5"><p class="text-danger fw-bold fs-5">Failed to fetch data. Please try again.</p></div>';
                });
        });
    }

    // 2. JAB WARDROBE BUTTON PAR CLICK HO
    if (wardrobeBtn) {
        wardrobeBtn.addEventListener('click', () => {
            // Loader inject karo
            container.innerHTML = `
                <div class="col-12 text-center py-5">
                    <div class="spinner-border text-warning" role="status"></div>
                    <p class="mt-3 text-muted fw-bold"><i class="fas fa-spinner fa-spin me-2"></i> Loading Wardrobes...</p>
                </div>`;

            // Wardrobe API call
            fetch('/api/gallery/wardrobes')
                .then(response => {
                    if (!response.ok) throw new Error('HTTP status ' + response.status);
                    return response.json();
                })
                .then(data => {
                    container.innerHTML = ''; // Clear indicator

                    if (!data || data.length === 0) {
                        container.innerHTML = '<div class="col-12 text-center py-5"><p class="text-muted fw-bold fs-5">No wardrobes active.</p></div>';
                        return;
                    }

                    // Append dynamic structural cards
                    data.forEach(design => {
                        const cardHtml = createCardStructure(design, 'Wardrobe');
                        container.insertAdjacentHTML('beforeend', cardHtml);
                    });

                    if (window.AOS) window.AOS.refresh();
                })
                .catch(error => {
                    console.error('Wardrobe Fetch Error:', error);
                    container.innerHTML = '<div class="col-12 text-center py-5"><p class="text-danger fw-bold fs-5">Failed to fetch data. Please try again.</p></div>';
                });
        });
    }

    // CLEAN SINGLE CARD HTML TEMPLATE
    function createCardStructure(design, categoryName) {
        const rawUrl = design.image_url || design.imageUrl || '';
        const imageUrl = rawUrl.startsWith('/') ? rawUrl : '/' + rawUrl;

        return `
            <div class="col-md-6 col-lg-4" data-aos="zoom-in">
                <div class="card h-100 border-0 shadow-sm overflow-hidden" style="border-radius: 15px;">
                    <img src="${imageUrl}" class="card-img-top" alt="${design.name}" style="height: 250px; object-fit: cover;">
                    <div class="card-body p-4 text-center">
                        <span class="badge bg-warning text-dark mb-2 px-3 py-2 rounded-pill fw-bold" style="font-size: 0.75rem;">${categoryName}</span>
                        <h5 class="fw-bold text-dark mb-2">${design.name}</h5>
                        <p class="text-muted small mb-0">${design.description || 'Premium Modular Design'}</p>
                    </div>
                </div>
            </div>
        `;
    }
});