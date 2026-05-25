// /js/projectGalleryLoader.js

document.addEventListener("DOMContentLoaded", () => {
    // By default 'all' projects load honge page khulne par
    loadGallery('all');

    // Filter buttons par click listener lagao
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter'); // 'all', 'kitchens', 'wardrobes'
            loadGallery(filterValue);
        });
    });
});

async function loadGallery(type) {
    const container = document.getElementById('designs-container');
    container.innerHTML = `<div class="col-12 text-center py-5"><div class="spinner-border" role="status"></div></div>`;

    let kitchenData = [];
    let wardrobeData = [];

    try {
        // Aapke logic ke hisaab se sahi endpoint fetch karo
        if (type === 'all' || type === 'kitchens') {
            const res = await fetch('/api/gallery/kitchens'); // Fetching 'galleryK'
            kitchenData = await res.json();
        }
        if (type === 'all' || type === 'wardrobes') {
            const res = await fetch('/api/gallery/wardrobes'); // Fetching 'galleryW'
            wardrobeData = await res.json();
        }

        container.innerHTML = ''; // Spinner clear karo

        // Dono data ko display ke liye format karo
        const allDesigns = [
            ...kitchenData.map(d => ({...d, displayCategory: 'Kitchen'})),
            ...wardrobeData.map(d => ({...d, displayCategory: 'Wardrobe'}))
        ];

        if (allDesigns.length === 0) {
            container.innerHTML = `<p class="text-center text-muted fw-bold">No gallery projects found.</p>`;
            return;
        }

        // Cards layout render karo
        allDesigns.forEach(design => {
            container.innerHTML += `
                <div class="col-md-6 col-lg-4" data-aos="zoom-in">
                    <div class="card h-100 border-0 shadow-sm overflow-hidden">
                        <img src="${design.image_url}" class="card-img-top" alt="${design.name}" style="height: 250px; object-fit: cover;">
                        <div class="card-body p-3 text-center">
                            <span class="badge bg-warning text-dark mb-2">${design.displayCategory}</span>
                            <h5 class="fw-bold text-dark mb-1">${design.name}</h5>
                            <p class="text-muted small mb-0">${design.description}</p>
                        </div>
                    </div>
                </div>`;
        });

        if (window.AOS) AOS.refresh();

    } catch (error) {
        console.error("Error loading gallery:", error);
        container.innerHTML = `<p class="text-center text-danger fw-bold">Failed to load gallery items.</p>`;
    }
}