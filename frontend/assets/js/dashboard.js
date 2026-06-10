const API_URL = window.location.protocol.startsWith('http') && window.location.port === '5000'
            ? '/api'
            : 'http://localhost:5000/api';
        const hasReact = Boolean(window.React && window.ReactDOM);
        const h = hasReact ? React.createElement : null;
        let statsRoot = null;

        function DashboardStatsApp({ dashboard, error }) {
            if (error) {
                return h('div', { className: 'message error' }, error);
            }

            if (!dashboard) {
                return h('div', { className: 'loading' }, 'Loading statistics...');
            }

            const stats = dashboard.stats;
            const cards = [
                ['total_animals', 'Total Animals'],
                ['total_health_records', 'Health Records'],
                ['total_production_records', 'Production Records'],
                ['total_breeding_records', 'Breeding Records'],
                ['total_feeding_records', 'Feeding Records']
            ];

            return h(React.Fragment, null,
                cards.map(([key, label]) => h('div', { className: 'stat-card', key },
                    h('h3', null, stats[key] ?? 0),
                    h('p', null, label)
                )),
                h('div', { className: 'stat-card', key: 'latest' },
                    h('h3', null, dashboard.recent_logs?.length ?? 0),
                    h('p', null, 'Recent Updates')
                )
            );
        }

        function renderDashboardStats(dashboard, error = '') {
            const grid = document.getElementById('statsGrid');
            if (!hasReact) {
                if (error) {
                    grid.innerHTML = `<div class="message error">${error}</div>`;
                    return;
                }
                const stats = dashboard.stats;
                grid.innerHTML = `
                    <div class="stat-card"><h3>${stats.total_animals}</h3><p>Total Animals</p></div>
                    <div class="stat-card"><h3>${stats.total_health_records}</h3><p>Health Records</p></div>
                    <div class="stat-card"><h3>${stats.total_production_records}</h3><p>Production Records</p></div>
                    <div class="stat-card"><h3>${stats.total_breeding_records}</h3><p>Breeding Records</p></div>
                    <div class="stat-card"><h3>${stats.total_feeding_records}</h3><p>Feeding Records</p></div>
                `;
                return;
            }

            if (!statsRoot) {
                statsRoot = ReactDOM.createRoot(grid);
            }
            statsRoot.render(h(DashboardStatsApp, { dashboard, error }));
        }

        // Tab Navigation
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tabName = e.target.dataset.tab;
                switchTab(tabName);
            });
        });

        function switchTab(tabName) {
            // Hide all tabs
            document.querySelectorAll('.tab-content').forEach(tab => {
                tab.classList.remove('active');
            });
            document.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.remove('active');
            });

            // Show selected tab
            document.getElementById(tabName).classList.add('active');
            document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

            // Load data for specific tabs
            if (tabName === 'dashboard') {
                loadStats();
            } else if (tabName === 'animals') {
                loadAnimals();
            } else if (tabName === 'health') {
                loadHealthRecords();
            } else if (tabName === 'production') {
                loadProductionRecords();
            } else if (tabName === 'breeding') {
                loadBreedingRecords();
            } else if (tabName === 'feeding') {
                loadFeedingRecords();
            } else if (tabName === 'logs') {
                loadLogs();
            }
        }

        // Message display helper
        function showMessage(elementId, message, type) {
            const el = document.getElementById(elementId);
            el.textContent = message;
            el.className = `message ${type}`;
            setTimeout(() => {
                el.className = 'message';
            }, 4000);
        }

        // Load Animals
        async function loadAnimals() {
            try {
                const response = await fetch(`${API_URL}/animals`);
                const animals = await response.json();

                // Populate dropdown selects
                ['healthAnimalId', 'productionAnimalId', 'breedingAnimalId', 'feedingAnimalId'].forEach(selectId => {
                    const select = document.getElementById(selectId);
                    select.innerHTML = '<option value="">Select animal</option>';
                    animals.forEach(animal => {
                        select.innerHTML += `<option value="${animal.id}">${animal.tag_number} - ${animal.name || animal.species}</option>`;
                    });
                });

                // Populate table
                const tbody = document.getElementById('animalsList');
                if (animals.length === 0) {
                    tbody.innerHTML = '<tr><td colspan="8" class="empty-state">No animals added yet</td></tr>';
                } else {
                    tbody.innerHTML = animals.map(animal => `
                        <tr>
                            <td>${animal.tag_number}</td>
                            <td>${animal.name || '-'}</td>
                            <td>${animal.species}</td>
                            <td>${animal.breed || '-'}</td>
                            <td>${animal.age || '-'}</td>
                            <td>${animal.gender}</td>
                            <td>${animal.weight || '-'}</td>
                            <td>
                                <button class="btn-small btn-edit" onclick="editAnimal(${animal.id})">Edit</button>
                                <button class="btn-small btn-delete" onclick="deleteAnimal(${animal.id})">Delete</button>
                            </td>
                        </tr>
                    `).join('');
                }
            } catch (error) {
                console.error('Error loading animals:', error);
            }
        }

        // Add Animal
        document.getElementById('animalForm').addEventListener('submit', async (e) => {
            e.preventDefault();

            const data = {
                tag_number: document.getElementById('tagNumber').value,
                name: document.getElementById('animalName').value,
                species: document.getElementById('species').value,
                breed: document.getElementById('breed').value,
                age: parseFloat(document.getElementById('age').value) || null,
                gender: document.getElementById('gender').value,
                weight: parseFloat(document.getElementById('weight').value) || null,
                notes: document.getElementById('animalNotes').value
            };

            try {
                const response = await fetch(`${API_URL}/animals`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    showMessage('animalMessage', 'Animal added successfully!', 'success');
                    document.getElementById('animalForm').reset();
                    loadAnimals();
                    loadStats();
                } else {
                    showMessage('animalMessage', 'Error adding animal', 'error');
                }
            } catch (error) {
                showMessage('animalMessage', 'Error: ' + error.message, 'error');
            }
        });

        // Delete Animal
        async function deleteAnimal(id) {
            if (!confirm('Are you sure you want to delete this animal?')) return;

            try {
                const response = await fetch(`${API_URL}/animals/${id}`, {
                    method: 'DELETE'
                });

                if (response.ok) {
                    showMessage('animalMessage', 'Animal deleted successfully!', 'success');
                    loadAnimals();
                    loadStats();
                }
            } catch (error) {
                showMessage('animalMessage', 'Error: ' + error.message, 'error');
            }
        }

        // Edit Animal
        async function editAnimal(id) {
            try {
                const response = await fetch(`${API_URL}/animals/${id}`);
                if (!response.ok) throw new Error('Could not load animal');
                const animal = await response.json();

                const updated = {
                    tag_number: prompt('Tag number', animal.tag_number) || animal.tag_number,
                    name: prompt('Name', animal.name || '') || null,
                    species: prompt('Species', animal.species) || animal.species,
                    breed: prompt('Breed', animal.breed || '') || null,
                    age: parseFloat(prompt('Age in months', animal.age || '')) || null,
                    gender: prompt('Gender', animal.gender) || animal.gender,
                    weight: parseFloat(prompt('Weight in kg', animal.weight || '')) || null,
                    notes: prompt('Notes', animal.notes || '') || null
                };

                const updateResponse = await fetch(`${API_URL}/animals/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updated)
                });

                if (!updateResponse.ok) throw new Error('Could not update animal');
                showMessage('animalMessage', 'Animal updated successfully!', 'success');
                loadAnimals();
                loadStats();
            } catch (error) {
                showMessage('animalMessage', 'Error: ' + error.message, 'error');
            }
        }

        // Load Health Records
        async function loadHealthRecords() {
            try {
                const response = await fetch(`${API_URL}/animals`);
                const animals = await response.json();

                let allRecords = [];
                for (let animal of animals) {
                    const healthResponse = await fetch(`${API_URL}/animals/${animal.id}/health`);
                    const records = await healthResponse.json();
                    allRecords.push(...records.map(r => ({ ...r, tag_number: animal.tag_number })));
                }

                const tbody = document.getElementById('healthList');
                if (allRecords.length === 0) {
                    tbody.innerHTML = '<tr><td colspan="6" class="empty-state">No health records</td></tr>';
                } else {
                    tbody.innerHTML = allRecords.map(record => `
                        <tr>
                            <td>${record.tag_number}</td>
                            <td>${new Date(record.date).toLocaleDateString()}</td>
                            <td>${record.health_status}</td>
                            <td>${record.temperature || '-'}</td>
                            <td>${record.weight || '-'}</td>
                            <td>${record.diagnosis || '-'}</td>
                        </tr>
                    `).join('');
                }
            } catch (error) {
                console.error('Error loading health records:', error);
            }
        }

        // Add Health Record
        document.getElementById('healthForm').addEventListener('submit', async (e) => {
            e.preventDefault();

            const data = {
                animal_id: parseInt(document.getElementById('healthAnimalId').value),
                health_status: document.getElementById('healthStatus').value,
                temperature: parseFloat(document.getElementById('temperature').value) || null,
                weight: parseFloat(document.getElementById('healthWeight').value) || null,
                diagnosis: document.getElementById('diagnosis').value,
                treatment: document.getElementById('treatment').value,
                veterinarian_notes: document.getElementById('vetNotes').value
            };

            try {
                const response = await fetch(`${API_URL}/health`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    showMessage('healthMessage', 'Health record added successfully!', 'success');
                    document.getElementById('healthForm').reset();
                    loadHealthRecords();
                    loadStats();
                }
            } catch (error) {
                showMessage('healthMessage', 'Error: ' + error.message, 'error');
            }
        });

        // Load Production Records
        async function loadProductionRecords() {
            try {
                const response = await fetch(`${API_URL}/animals`);
                const animals = await response.json();

                let allRecords = [];
                for (let animal of animals) {
                    const prodResponse = await fetch(`${API_URL}/animals/${animal.id}/production`);
                    const records = await prodResponse.json();
                    allRecords.push(...records.map(r => ({ ...r, tag_number: animal.tag_number })));
                }

                const tbody = document.getElementById('productionList');
                if (allRecords.length === 0) {
                    tbody.innerHTML = '<tr><td colspan="6" class="empty-state">No production records</td></tr>';
                } else {
                    tbody.innerHTML = allRecords.map(record => `
                        <tr>
                            <td>${record.tag_number}</td>
                            <td>${new Date(record.date).toLocaleDateString()}</td>
                            <td>${record.production_type}</td>
                            <td>${record.quantity}</td>
                            <td>${record.unit}</td>
                            <td>${record.quality_grade || '-'}</td>
                        </tr>
                    `).join('');
                }
            } catch (error) {
                console.error('Error loading production records:', error);
            }
        }

        // Add Production Record
        document.getElementById('productionForm').addEventListener('submit', async (e) => {
            e.preventDefault();

            const data = {
                animal_id: parseInt(document.getElementById('productionAnimalId').value),
                production_type: document.getElementById('productionType').value,
                quantity: parseFloat(document.getElementById('quantity').value),
                unit: document.getElementById('unit').value,
                quality_grade: document.getElementById('qualityGrade').value || null,
                notes: document.getElementById('productionNotes').value
            };

            try {
                const response = await fetch(`${API_URL}/production`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    showMessage('productionMessage', 'Production record added!', 'success');
                    document.getElementById('productionForm').reset();
                    loadProductionRecords();
                    loadStats();
                }
            } catch (error) {
                showMessage('productionMessage', 'Error: ' + error.message, 'error');
            }
        });

        // Load Breeding Records
        async function loadBreedingRecords() {
            try {
                const response = await fetch(`${API_URL}/animals`);
                const animals = await response.json();

                let allRecords = [];
                for (let animal of animals) {
                    const breedResponse = await fetch(`${API_URL}/animals/${animal.id}/breeding`);
                    const records = await breedResponse.json();
                    allRecords.push(...records.map(r => ({ ...r, tag_number: animal.tag_number })));
                }

                const tbody = document.getElementById('breedingList');
                if (allRecords.length === 0) {
                    tbody.innerHTML = '<tr><td colspan="5" class="empty-state">No breeding records</td></tr>';
                } else {
                    tbody.innerHTML = allRecords.map(record => `
                        <tr>
                            <td>${record.tag_number}</td>
                            <td>${new Date(record.date_of_breeding).toLocaleDateString()}</td>
                            <td>${record.partner_tag_number || '-'}</td>
                            <td>${record.expected_delivery_date ? new Date(record.expected_delivery_date).toLocaleDateString() : '-'}</td>
                            <td>${record.offspring_count || '-'}</td>
                        </tr>
                    `).join('');
                }
            } catch (error) {
                console.error('Error loading breeding records:', error);
            }
        }

        // Add Breeding Record
        document.getElementById('breedingForm').addEventListener('submit', async (e) => {
            e.preventDefault();

            const data = {
                animal_id: parseInt(document.getElementById('breedingAnimalId').value),
                date_of_breeding: document.getElementById('dateOfBreeding').value,
                partner_tag_number: document.getElementById('partnerTag').value || null,
                expected_delivery_date: document.getElementById('expectedDelivery').value || null,
                offspring_count: parseInt(document.getElementById('offspringCount').value) || null,
                offspring_health: document.getElementById('offspringHealth').value,
                notes: document.getElementById('breedingNotes').value
            };

            try {
                const response = await fetch(`${API_URL}/breeding`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    showMessage('breedingMessage', 'Breeding record added!', 'success');
                    document.getElementById('breedingForm').reset();
                    loadBreedingRecords();
                    loadStats();
                }
            } catch (error) {
                showMessage('breedingMessage', 'Error: ' + error.message, 'error');
            }
        });

        // Load Feeding Records
        async function loadFeedingRecords() {
            try {
                const response = await fetch(`${API_URL}/animals`);
                const animals = await response.json();

                let allRecords = [];
                for (let animal of animals) {
                    const feedResponse = await fetch(`${API_URL}/animals/${animal.id}/feeding`);
                    const records = await feedResponse.json();
                    allRecords.push(...records.map(r => ({ ...r, tag_number: animal.tag_number })));
                }

                const tbody = document.getElementById('feedingList');
                if (allRecords.length === 0) {
                    tbody.innerHTML = '<tr><td colspan="6" class="empty-state">No feeding records</td></tr>';
                } else {
                    tbody.innerHTML = allRecords.map(record => `
                        <tr>
                            <td>${record.tag_number}</td>
                            <td>${new Date(record.date).toLocaleDateString()}</td>
                            <td>${record.feed_type}</td>
                            <td>${record.quantity}</td>
                            <td>${record.unit}</td>
                            <td>${record.cost ? '$' + record.cost.toFixed(2) : '-'}</td>
                        </tr>
                    `).join('');
                }
            } catch (error) {
                console.error('Error loading feeding records:', error);
            }
        }

        // Add Feeding Record
        document.getElementById('feedingForm').addEventListener('submit', async (e) => {
            e.preventDefault();

            const data = {
                animal_id: parseInt(document.getElementById('feedingAnimalId').value),
                feed_type: document.getElementById('feedType').value,
                quantity: parseFloat(document.getElementById('feedQuantity').value),
                unit: document.getElementById('feedUnit').value,
                cost: parseFloat(document.getElementById('feedCost').value) || null,
                notes: document.getElementById('feedingNotes').value
            };

            try {
                const response = await fetch(`${API_URL}/feeding`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    showMessage('feedingMessage', 'Feeding record added!', 'success');
                    document.getElementById('feedingForm').reset();
                    loadFeedingRecords();
                    loadStats();
                }
            } catch (error) {
                showMessage('feedingMessage', 'Error: ' + error.message, 'error');
            }
        });

        // Load Stats
        async function loadStats() {
            try {
                renderDashboardStats(null);
                const response = await fetch(`${API_URL}/dashboard`);
                if (!response.ok) throw new Error('Could not load dashboard data');
                const dashboard = await response.json();
                renderDashboardStats(dashboard);
            } catch (error) {
                console.error('Error loading stats:', error);
                renderDashboardStats(null, 'Could not connect to the backend API.');
            }
        }

        // Load Logs
        async function loadLogs() {
            try {
                const response = await fetch(`${API_URL}/logs`);
                const logs = await response.json();

                const tbody = document.getElementById('logsList');
                if (logs.length === 0) {
                    tbody.innerHTML = '<tr><td colspan="5" class="empty-state">No activity logs</td></tr>';
                } else {
                    tbody.innerHTML = logs.slice(0, 50).map(log => `
                        <tr>
                            <td>${new Date(log.timestamp).toLocaleString()}</td>
                            <td>${log.action}</td>
                            <td>${log.action_type}</td>
                            <td>${log.entity_type}</td>
                            <td>${log.details || '-'}</td>
                        </tr>
                    `).join('');
                }
            } catch (error) {
                console.error('Error loading logs:', error);
            }
        }

        // Add User Log
        document.getElementById('logForm').addEventListener('submit', async (e) => {
            e.preventDefault();

            const data = {
                action: document.getElementById('logAction').value,
                action_type: document.getElementById('logActionType').value,
                entity_type: document.getElementById('logEntityType').value,
                details: document.getElementById('logDetails').value
            };

            try {
                const response = await fetch(`${API_URL}/logs`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    showMessage('logMessage', 'Log added successfully!', 'success');
                    document.getElementById('logForm').reset();
                    loadLogs();
                    loadStats();
                } else {
                    const error = await response.json();
                    showMessage('logMessage', error.error || 'Error adding log', 'error');
                }
            } catch (error) {
                showMessage('logMessage', 'Error: ' + error.message, 'error');
            }
        });

        // Initial load
        loadAnimals();
        loadStats();
