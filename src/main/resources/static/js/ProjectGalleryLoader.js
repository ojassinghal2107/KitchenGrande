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

async function loadGallery(type) {
    const container = document.getElementById('designs-container');
    
    // Loader ab click ke baad hi trigger hoga
    container.innerHTML = `
        <div class="col-12 text-center py-5">
            <div class="spinner-border text-warning" role="status"></div>
            <p class="mt-3 text-muted fw-bold">Fetching our latest work...</p>
        </div>`;

    let url = (type === 'kitchens') ? '/api/gallery/kitchens' : '/api/gallery/wardrobes';
    let displayCategory = (type === 'kitchens') ? 'Kitchen' : 'Wardrobe';

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Server returned status: ${response.status}`);
        
        const data = await response.json();
        container.innerHTML = ''; 

        if (!data || data.length === 0) {
            container.innerHTML = `
                <div class="col-12 text-center py-5">
                    <p class="text-muted fw-bold fs-5">No live designs available in this category yet.</p>
                </div>`;
            return;
        }

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
                <p class="text-muted small">Please verify if the Spring Boot Application is live.</p>
            </div>`;
    }
}