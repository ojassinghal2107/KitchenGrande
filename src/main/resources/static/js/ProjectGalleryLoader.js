document.addEventListener("DOMContentLoaded", () => {
    // Page load hote hi sabse pehle Kitchens (galleryK) load karo
    loadGallery('kitchens');

    // Filter buttons par click listeners lagao (for backend fetching)
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const filterValue = btn.getAttribute('data-filter'); // 'kitchens' ya 'wardrobes'
            loadGallery(filterValue);
        });
    });
});

async function loadGallery(type) {
    const container = document.getElementById('designs-container');
    
    // 1. Pehle loader (spinner) dikhao jab data fetch ho raha ho
    container.innerHTML = `
        <div class="col-12 text-center py-5">
            <div class="spinner-border" role="status"></div>
            <p class="mt-3 text-muted fw-bold">Fetching our latest work...</p>
        </div>`;

    let url = '';
    let displayCategory = '';

    // 2. Type ke basis par sahi Spring Boot endpoint decide karo
    if (type === 'kitchens') {
        url = '/api/gallery/kitchens'; // Aapka naya kitchen gallery API endpoint
        displayCategory = 'Kitchen';
    } else if (type === 'wardrobes') {
        url = '/api/gallery/wardrobes'; // Aapka naya wardrobe gallery API endpoint
        displayCategory = 'Wardrobe';
    }

    try {
        // 3. Backend Controller ko hit karo
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();

        // Loader clear karo
        container.innerHTML = ''; 

        // 4. Check karo agar data khali toh nahi aaya
        if (!data || data.length === 0) {
            container.innerHTML = `
                <div class="col-12 text-center py-5">
                    <p class="text-muted fw-bold fs-5">No live designs available in this category yet.</p>
                </div>`;
            return;
        }

        // 5. Loop chalake data ko HTML cards mein render karo
        data.forEach(design => {
            container.innerHTML += `
                <div class="col-md-6 col-lg-4" data-aos="zoom-in">
                    <div class="card h-100 border-0 shadow-sm overflow-hidden" style="border-radius: 15px;">
                        <img src="${design.image_url}" class="card-img-top" alt="${design.name}" style="height: 250px; object-fit: cover;">
                        <div class="card-body p-4 text-center">
                            <span class="badge bg-warning text-dark mb-2 px-3 py-2 rounded-pill fw-bold" style="font-size: 0.75rem;">${displayCategory}</span>
                            <h5 class="fw-bold text-dark mb-2">${design.name}</h5>
                            <p class="text-muted small mb-0">${design.description}</p>
                        </div>
                    </div>
                </div>`;
        });

        // Animation refresh karne ke liye (AOS Library)
        if (window.AOS) {
            AOS.refresh();
        }

    } catch (error) {
        console.error("Error fetching gallery data:", error);
        container.innerHTML = `
            <div class="col-12 text-center py-5">
                <p class="text-danger fw-bold fs-5">Opps! Failed to connect to server. Please try again later.</p>
            </div>`;
    }
}