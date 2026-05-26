document.addEventListener("DOMContentLoaded", () => {
    // Page load hote hi sabse pehle Kitchens data load karo
    loadGallery('kitchens');

    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // 1. Saare buttons ko wapas normal (outline) state mein lao
            filterButtons.forEach(b => {
                b.classList.remove('active', 'btn-warning');
                b.classList.add('btn-outline-secondary');
            });

            // 2. Clicked button ko active (yellow) banao
            btn.classList.add('active', 'btn-warning');
            btn.classList.remove('btn-outline-secondary');

            // 3. Category fetch karo
            const filterValue = btn.getAttribute('data-filter');
            loadGallery(filterValue);
        });
    });
});

async function loadGallery(type) {
    const container = document.getElementById('designs-container');
    
    // Loader dikhao
    container.innerHTML = `
        <div class="col-12 text-center py-5">
            <div class="spinner-border text-warning" role="status" style="width: 3rem; height: 3rem;"></div>
            <p class="mt-3 text-muted fw-bold">Fetching our latest work...</p>
        </div>`;

    let url = (type === 'kitchens') ? '/api/gallery/kitchens' : '/api/gallery/wardrobes';
    let displayCategory = (type === 'kitchens') ? 'Kitchen' : 'Wardrobe';

    try {
        const response = await fetch(url);
        
        // Agar endpoint hi nahi mila ya backend crash hai
        if (!response.ok) {
            throw new Error(`Server returned status: ${response.status}`);
        }
        
        const data = await response.json();
        container.innerHTML = ''; // Clear loader

        // Agar database mein data nahi mila
        if (!data || data.length === 0) {
            container.innerHTML = `
                <div class="col-12 text-center py-5">
                    <p class="text-muted fw-bold fs-5">No live designs available in this category yet.</p>
                </div>`;
            return;
        }

        // Card rendering loop
        data.forEach(design => {
            container.innerHTML += `
                <div class="col-md-6 col-lg-4" data-aos="zoom-in">
                    <div class="card h-100 border-0 shadow-sm overflow-hidden" style="border-radius: 15px;">
                        <img src="${design.image_url || design.imageUrl}" class="card-img-top" alt="${design.name}" style="height: 250px; object-fit: cover;">
                        <div class="card-body p-4 text-center">
                            <span class="badge bg-warning text-dark mb-2 px-3 py-2 rounded-pill fw-bold" style="font-size: 0.75rem;">${displayCategory}</span>
                            <h5 class="fw-bold text-dark mb-2">${design.name}</h5>
                            <p class="text-muted small mb-0">${design.description}</p>
                        </div>
                    </div>
                </div>`;
        });

        if (window.AOS) AOS.refresh();

    } catch (error) {
        console.error("Error fetching data:", error);
        container.innerHTML = `
            <div class="col-12 text-center py-5">
                <p class="text-danger fw-bold fs-5">Oops! Failed to connect to server.</p>
                <p class="text-muted small">Check if Spring Boot is running and endpoints are correct.</p>
            </div>`;
    }
}