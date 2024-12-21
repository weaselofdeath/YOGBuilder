// Initialize a global object to store the loaded data
window.appData = {
    gemFilters: null,
    gems: null,
    heirloomFilters: null,
    heirlooms: null,
    itemFilters: null,
    items: null,
    runeFilters: null,
    runes: null
};

// Function to load a single JSON file
async function loadJSONFile(filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`Failed to load ${filePath}, status: ${response.status}`);
        }
        return await response.json(); // Parse and return JSON data
    } catch (error) {
        console.error('Error loading JSON file:', error);
        return null;
    }
}

async function setupStorage() {
//     TODO: Setup storage to store the json files for quicker loading
}


// Function to load all required JSON files
async function loadAllData() {
    const dataFiles = [
        { key: 'gemFilters', path: 'data_files/gem_filters.json' },
        { key: 'gems', path: 'data_files/gems.json' },
        { key: 'heirloomFilters', path: 'data_files/heirloom_filters.json' },
        { key: 'heirlooms', path: 'data_files/heirlooms.json' },
        { key: 'itemFilters', path: 'data_files/item_filters.json' },
        { key: 'items', path: 'data_files/items.json' },
        { key: 'runeFilters', path: 'data_files/rune_filters.json' },
        { key: 'runes', path: 'data_files/runes.json' }
    ];

    // Loading bar container setup
    const loadingContainer = document.createElement('div');
    loadingContainer.classList.add('loading-container');

    const loadingBar = document.createElement('div');
    loadingBar.classList.add('loading-bar');

    const statusText = document.createElement('div');
    statusText.classList.add('loading-text');
    statusText.textContent = 'Starting to load files...';

    loadingBar.appendChild(statusText); // Place text inside the bar
    loadingContainer.appendChild(loadingBar);
    document.body.appendChild(loadingContainer);

    let filesLoaded = 0;
    const totalFiles = dataFiles.length;

    for (const file of dataFiles) {
        statusText.textContent = `Loading ${file.path} (${filesLoaded + 1} of ${totalFiles})...`;

        const data = await loadJSONFile(file.path);
        if (data) {
            switch (file.key) {
                case 'runes':
                    window.appData[file.key] = loadClassesData(runeClass ,data);
                    break;
                case 'gems':
                    window.appData[file.key] = loadClassesData(gemClass ,data);
                    break;
                default:
                    window.appData[file.key] = data;
                    break;
            }
            console.log(`Loaded ${file.key}`);
        }

        filesLoaded++;
        // Update the loading bar width
        const progress = (filesLoaded / totalFiles) * 100;
        loadingBar.style.width = `${progress}%`;
    }

    // Final update
    statusText.textContent = 'All files loaded successfully!';
    console.log('All data loaded.');

    // Remove loading components after a slight delay
    setTimeout(() => {
        loadingContainer.remove();
        if (typeof createHeroForm === 'function') {
            createHeroForm();
        } else {
            console.error('createHeroForm() is not defined or not loaded.');
        }
    }, 750);
}

function loadClassesData(objectClass, object) {
    let returnedTypes = []
    for (let i = 0; i < object.length; i++) {
        returnedTypes.push(new objectClass(object[i]));
    }
    return returnedTypes;
}


// Load data when DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    console.log("Loading JSON data...");
    loadAllData();
});
