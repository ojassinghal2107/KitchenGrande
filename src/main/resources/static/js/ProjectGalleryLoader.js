document.addEventListener('DOMContentLoaded', () => {
    const kitchenBtn = document.getElementById('kitchen-btn');
    const wardrobeBtn = document.getElementById('wardrobe-btn');
    const container = document.getElementById('designs-container');

    // Kitchen Button Click
    if (kitchenBtn) {
        kitchenBtn.addEventListener('click', () => {
            container.innerHTML = '<div class="col-12 text-center py-5"><h4 class="text-muted">Loading Kitchens...</h4></div>';
            
            fetch('/api/gallery/kitchens')
                .then(res => res.json())
                .then(data => {
                    container.innerHTML = ''; // Clear existing static text
                    
                    if (!data || data.length === 0) {
                        container.innerHTML = '<div class="col-12 text-center py-5"><p class="text-muted fw-bold">No kitchen designs found in gallery.</p></div>';
                        return;
                    }

                    data.forEach(d => {
                        // Table mapping checking safely
                        const imgPath = d.image_url || d.imageUrl || '#';
                        
                        container.innerHTML += `
                            <div class="col-md-6 col-lg-4">
                                <div class="card h-100 border-0 shadow-sm overflow-hidden" style="border-radius: 15px;">
                                    <img src="${imgPath}" class="card-img-top" style="height:250px; object-fit:cover;" alt="${d.name}">
                                    <div class="card-body p-4 text-center">
                                        <h5 class="fw-bold text-dark mb-2">${d.name}</h5>
                                        <p class="text-muted small mb-0">${d.description || 'Premium Modular Layout'}</p>
                                    </div>
                                </div>
                            </div>`;
                    });
                })
                .catch(err => {
                    console.error("Kitchen fetch error:", err);
                    container.innerHTML = '<div class="col-12 text-center py-5 text-danger">Failed to fetch kitchens.</div>';
                });
        });
    }

    // Wardrobe Button Click
    if (wardrobeBtn) {
        wardrobeBtn.addEventListener('click', () => {
            container.innerHTML = '<div class="col-12 text-center py-5"><h4 class="text-muted">Loading Wardrobes...</h4></div>';
            
            fetch('/api/gallery/wardrobes')
                .then(res => res.json())
                .then(data => {
                    container.innerHTML = ''; // Clear existing static text
                    
                    if (!data || data.length === 0) {
                        container.innerHTML = '<div class="col-12 text-center py-5"><p class="text-muted fw-bold">No wardrobe designs found in gallery.</p></div>';
                        return;
                    }

                    data.forEach(d => {
                        const imgPath = d.image_url || d.imageUrl || '#';

                        container.innerHTML += `
                            <div class="col-md-6 col-lg-4">
                                <div class="card h-100 border-0 shadow-sm overflow-hidden" style="border-radius: 15px;">
                                    <img src="${imgPath}" class="card-img-top" style="height:250px; object-fit:cover;" alt="${d.name}">
                                    <div class="card-body p-4 text-center">
                                        <h5 class="fw-bold text-dark mb-2">${d.name}</h5>
                                        <p class="text-muted small mb-0">${d.description || 'Premium Wardrobe Layout'}</p>
                                    </div>
                                </div>
                            </div>`;
                    });
                })
                .catch(err => {
                    console.error("Wardrobe fetch error:", err);
                    container.innerHTML = '<div class="col-12 text-center py-5 text-danger">Failed to fetch wardrobes.</div>';
                });
        });
    }
});