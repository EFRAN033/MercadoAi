document.addEventListener("DOMContentLoaded", function() {
    let selectedRegion = null;
    let selectedProvincia = null;
    let selectedCategoria = null;

    // Cargar las categorías desde categoria.json
    fetch('../data/categoria.json')  // Ajustamos la ruta según la nueva estructura
    .then(response => response.json())
    .then(data => {
        const categoriaDropdownButton = document.getElementById('categoriaButton');
        const categoriaDropdownContent = document.getElementById('categoriaContent');
        const categorias = data.categorias;

        // Agregar las categorías al menú desplegable
        categorias.forEach(categoria => {
            const categoriaLink = document.createElement('a');
            categoriaLink.href = '#';
            categoriaLink.textContent = categoria;

            categoriaLink.addEventListener('click', function(event) {
                event.preventDefault();
                selectedCategoria = categoria;
                categoriaDropdownButton.textContent = categoria.toUpperCase(); // Actualizamos el texto del botón
            });

            categoriaDropdownContent.appendChild(categoriaLink);
        });
    })
    .catch(error => {
        console.error('Error cargando las categorías:', error);
    });

    // Cargar las regiones
    fetch('../data/regiones.json')  // Ajustamos la ruta según la nueva estructura
    .then(response => response.json())
    .then(data => {
        const regionDropdownButton = document.querySelector('.dropdown-region:first-child .dropdown-button');
        const regionDropdownContent = document.querySelector('.dropdown-region:first-child .dropdown-content');
        const regiones = data.regiones;

        // Agregar las regiones al menú desplegable
        regiones.forEach(region => {
            const regionLink = document.createElement('a');
            regionLink.href = '#';
            regionLink.textContent = region;

            regionLink.addEventListener('click', function(event) {
                event.preventDefault();
                selectedRegion = region;
                regionDropdownButton.textContent = region.toUpperCase();
                loadProvincias(selectedRegion); // Cargar provincias para la región seleccionada
            });

            regionDropdownContent.appendChild(regionLink);
        });
    })
    .catch(error => {
        console.error('Error cargando las regiones:', error);
    });

    // Cargar las provincias basadas en la región seleccionada
    function loadProvincias(region) {
        fetch('../data/provincia.json')  // Ajustamos la ruta según la nueva estructura
        .then(response => response.json())
        .then(data => {
            const provinciaDropdownButton = document.querySelector('.dropdown-region:nth-child(2) .dropdown-button');
            const provinciaDropdownContent = document.querySelector('.dropdown-region:nth-child(2) .dropdown-content');

            // Limpiar provincias previas
            provinciaDropdownContent.innerHTML = '';

            const provincias = data[region] || [];
            provincias.forEach(provincia => {
                const provinciaLink = document.createElement('a');
                provinciaLink.href = '#';
                provinciaLink.textContent = provincia;

                provinciaLink.addEventListener('click', function(event) {
                    event.preventDefault();
                    selectedProvincia = provincia;
                    provinciaDropdownButton.textContent = provincia.toUpperCase();
                    loadDistritos(selectedRegion, selectedProvincia); // Cargar distritos para la provincia seleccionada
                });

                provinciaDropdownContent.appendChild(provinciaLink);
            });
        })
        .catch(error => {
            console.error('Error cargando las provincias:', error);
        });
    }

    // Cargar los distritos basados en la provincia seleccionada
    function loadDistritos(region, provincia) {
        fetch('../data/distritos.json')  // Ajustamos la ruta según la nueva estructura
        .then(response => response.json())
        .then(data => {
            const distritoDropdownButton = document.getElementById('distritoButton');
            const distritoDropdownContent = document.getElementById('distritoContent');

            // Limpiar distritos previos
            distritoDropdownContent.innerHTML = '';

            const distritos = data[region][provincia] || [];
            distritos.forEach(distrito => {
                const distritoLink = document.createElement('a');
                distritoLink.href = '#';
                distritoLink.textContent = distrito;

                distritoLink.addEventListener('click', function(event) {
                    event.preventDefault();
                    distritoDropdownButton.textContent = distrito.toUpperCase(); // Actualizamos el texto del botón
                });

                distritoDropdownContent.appendChild(distritoLink);
            });
        })
        .catch(error => {
            console.error('Error cargando los distritos:', error);
        });
    }
});
