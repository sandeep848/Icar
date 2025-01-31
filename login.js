const loginBtn = document.querySelector('.login-btn');
const wrapper = document.querySelector('.wrapper');
const wrapped = document.querySelector('.wrapped');
const iconClose = document.querySelector('.icon-close');
const closeBtn = document.querySelector('.close-btn');
const registerLink = document.querySelector('.register-link');
const loginLink = document.querySelector('.signup-link');

// Initial form visibility
wrapper.style.opacity = '0';
wrapper.style.visibility = 'hidden';
wrapped.style.opacity = '0';
wrapped.style.visibility = 'hidden';

const transitionDuration = 500; // Transition duration for opacity and visibility
wrapper.style.transition = `opacity ${transitionDuration}ms ease, visibility ${transitionDuration}ms ease`;
wrapped.style.transition = `opacity ${transitionDuration}ms ease, visibility ${transitionDuration}ms ease`;

// Function to show login form
function showLoginForm() {
    wrapped.style.opacity = '0';
    wrapped.style.visibility = 'hidden';
    setTimeout(() => {
        wrapped.style.display = 'none';
        wrapper.style.display = 'flex';
        wrapper.style.opacity = '1';
        wrapper.style.visibility = 'visible';
    }, transitionDuration);
}

// Function to show register form
function showRegisterForm() {
    wrapper.style.opacity = '0';
    wrapper.style.visibility = 'hidden';
    setTimeout(() => {
        wrapper.style.display = 'none';
        wrapped.style.display = 'flex';
        wrapped.style.opacity = '1';
        wrapped.style.visibility = 'visible';
    }, transitionDuration);
}

// Function to hide both forms
function hideForms() {
    wrapper.style.opacity = '0';
    wrapper.style.visibility = 'hidden';
    wrapped.style.opacity = '0';
    wrapped.style.visibility = 'hidden';
    setTimeout(() => {
        wrapper.style.display = 'none';
        wrapped.style.display = 'none';
    }, transitionDuration);
}

// Event listeners for form toggling
loginBtn.addEventListener('click', () => {
    wrapper.style.display = 'flex';
    wrapper.style.opacity = '1';
    wrapper.style.visibility = 'visible';
});

registerLink.addEventListener('click', (e) => {
    e.preventDefault();
    showRegisterForm();
});

loginLink.addEventListener('click', (e) => {
    e.preventDefault();
    showLoginForm();
});

iconClose.addEventListener('click', hideForms);
closeBtn.addEventListener('click', hideForms);

// Smooth scrolling to sections
document.querySelectorAll('.navigation a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
        }
        
        // Hide forms when scrolling to a section
        hideForms();
    });
});





function toggleThematic() {
    const box = document.getElementById('thematicBox');
    const analyticBox = document.getElementById('analyticBox');
    
    if (box.classList.contains('active')) {
        box.classList.remove('active');
    } else {
        box.classList.add('active');
        analyticBox.classList.remove('active');
    }
}

function toggleAnalytic() {
    const box = document.getElementById('analyticBox');
    const thematicBox = document.getElementById('thematicBox');
    
    if (box.classList.contains('active')) {
        box.classList.remove('active');
    } else {
        box.classList.add('active');
        thematicBox.classList.remove('active');
    }
}


// Get references to existing elements
const thematicBox = document.getElementById('thematicBox');
const serviceButtons = thematicBox.querySelectorAll('.service-grid button');

// Create checkbox options container
const checkboxContainer = document.createElement('div');
checkboxContainer.className = 'checkbox-options';
checkboxContainer.style.display = 'none';
thematicBox.appendChild(checkboxContainer);

// Options for each service button
const serviceOptions = {
    'Administrative Unit': ['pH Level', 'Organic Matter', 'Nitrogen Content', 'Phosphorus Level', 'Potassium Content'],
    'Socio Economic Data': ['Agricultural Land', 'Forest Area', 'Urban Area', 'Wetlands', 'Barren Land'],
    'Livestock Census': ['Height Above Sea Level', 'Slope Analysis', 'Aspect Analysis', 'Relief Features', 'Contour Lines'],
    'Terrain Analysis': ['NDVI', 'EVI', 'SAVI', 'Leaf Area Index', 'Biomass Density'],
    'Satellite Data Products': ['Surface Water', 'Groundwater', 'Watershed', 'Drainage Pattern', 'Water Quality'],
    'Physiography': ['Temperature', 'Rainfall', 'Humidity', 'Wind Speed', 'Solar Radiation'],
    'Agro Ecology': ['Crop Suitability', 'Growing Season', 'Irrigation Areas', 'Yield Zones', 'Farming Systems'],
    'Soils': ['Erosion Risk', 'Soil Loss Rate', 'Protection Measures', 'Slope Stability', 'Conservation Areas'],
    'soil Fertility':[],
    'Land degradation':[],
    'Water Shed Planning':[],
    'Land Use Planning':[],
    'Aspirational Districts':[],
    'Soil Health Card':[]
};

// Add click handlers to service buttons
serviceButtons.forEach(button => {
    button.addEventListener('click', () => {
        const serviceName = button.textContent.trim();
        const options = serviceOptions[serviceName];
        
        // Create checkbox content
        checkboxContainer.innerHTML = `
            <div class="options-header">
                <h4 class="options-title">${serviceName}</h4>
            </div>
            <div class="options-content">
                ${options.map((option, index) => `
                    <div class="checkbox-group" style="animation-delay: ${index * 0.05}s">
                        <input type="checkbox" id="${option.replace(/\s+/g, '')}" name="${option.replace(/\s+/g, '')}">
                        <label for="${option.replace(/\s+/g, '')}">${option}</label>
                    </div>
                `).join('')}
            </div>
            <div class="back-button-container">
                <button class="back-button" title="Go back">
                    <ion-icon name="arrow-back-outline"></ion-icon>
                    Back
                </button>
            </div>
        `;

        // Show checkbox container
        checkboxContainer.style.display = 'block';
        requestAnimationFrame(() => {
            checkboxContainer.classList.add('active');
        });

        // Add back button functionality
        const backButton = checkboxContainer.querySelector('.back-button');
        backButton.addEventListener('click', () => {
            checkboxContainer.classList.remove('active');
            setTimeout(() => {
                checkboxContainer.style.display = 'none';
            }, 400);
        });
    });
});

// Initialize the Leaflet map
const map = L.map("map", {
    center: [19.7515, 75.7139], // Latitude and Longitude for Maharashtra
    zoom: 7,
    layers: [],
});

// Add Google Maps as the base layer
const googleLayer = L.tileLayer(
    "http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
    {
        subdomains: ["mt0", "mt1", "mt2", "mt3"],
        attribution: "Google Maps",
    }
).addTo(map);

// Add GeoServer WMS Layer for Maharashtra Block
const geoServerLayer = L.tileLayer.wms(
    "http://localhost:8080/geoserver/web/wms",
    {
        layers: "Maharashtra_Block", 
        format: "image/png",
        transparent: true,
        attribution: "GeoServer Maharashtra Blocks",
    }
);

// Create a custom control for Maharashtra Block toggle
L.Control.MaharashtraBlockControl = L.Control.extend({
    options: {
        position: 'topright'
    },

    onAdd: function(map) {
        const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
        const checkbox = L.DomUtil.create('input', '', container);
        const label = L.DomUtil.create('label', '', container);
        
        checkbox.type = 'checkbox';
        checkbox.id = 'maharashtra-block-toggle';
        label.htmlFor = 'maharashtra-block-toggle';
        label.appendChild(document.createTextNode('Maharashtra Blocks'));

        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                map.addLayer(geoServerLayer);
                
                // Fit the map to the Maharashtra Block boundary
                geoServerLayer.once('load', () => {
                    // Fetch the WMS layer bounds
                    const wmsParams = geoServerLayer.wmsParams;
                    const bbox = wmsParams.bbox.split(',').map(parseFloat);
                    
                    // Create a bounds object
                    const southWest = L.latLng(bbox[1], bbox[0]);
                    const northEast = L.latLng(bbox[3], bbox[2]);
                    const bounds = L.latLngBounds(southWest, northEast);
                    
                    // Fit the map to the bounds with some padding
                    map.fitBounds(bounds, {
                        padding: [50, 50],
                        maxZoom: 8
                    });
                });
            } else {
                map.removeLayer(geoServerLayer);
                // Reset to original view
                map.setView([19.7515, 75.7139], 7);
            }
        });

        return container;
    }
});

// Add the custom control to the map
map.addControl(new L.Control.MaharashtraBlockControl());

// Add a layer control
const baseMaps = {
    "Google Maps": googleLayer,
};

const overlayMaps = {
    "Maharashtra Blocks": geoServerLayer,
};

L.control.layers(baseMaps, overlayMaps).addTo(map);