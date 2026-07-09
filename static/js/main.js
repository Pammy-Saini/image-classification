// ==========================================================================
// GeoClassifier - Frontend Interactive Script
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    // State management
    const state = {
        activeTab: 'dashboard',
        region: 'jodhpur',
        year: '2024',
        viewMode: 'tcc', // 'tcc', 'fcc', 'bands'
        currentBand: 'green', // 'green', 'red', 'nir', 'swir'
        algorithm: 'random_forest',
        charts: {
            areaPie: null,
            netChangeBar: null
        }
    };
    // DOM Elements
    const elements = {
        // Tab buttons and sections
        tabBtns: document.querySelectorAll('.nav-item'),
        tabContents: document.querySelectorAll('.tab-content'),
        
        // Configuration Panel
        selectRegion: document.getElementById('select-region'),
        selectYear: document.getElementById('select-year'),
        selectAlgo: document.getElementById('select-algo'),
        yearControl: document.getElementById('year-control'),
        
        // Algorithm specific parameter blocks
        paramKmeans: document.getElementById('param-kmeans'),
        paramRf: document.getElementById('param-rf'),
        paramSvm: document.getElementById('param-svm'),
        
        // Parameter inputs
        inputK: document.getElementById('input-k'),
        kValue: document.getElementById('k-value'),
        inputEstimators: document.getElementById('input-estimators'),
        rfValue: document.getElementById('rf-value'),
        inputSvmC: document.getElementById('input-svm-c'),
        
        // Buttons
        btnRunClassification: document.getElementById('btn-run-classification'),
        btnRunChange: document.getElementById('btn-run-change'),
        
        // Visualizer
        btnViewTcc: document.getElementById('btn-view-tcc'),
        btnViewFcc: document.getElementById('btn-view-fcc'),
        btnViewBands: document.getElementById('btn-view-bands'),
        divBandSelectors: document.getElementById('div-band-selectors'),
        bandBtns: document.querySelectorAll('.band-btn'),
        imgSource: document.getElementById('img-source'),
        canvasClassified: document.getElementById('canvas-classified'),
        msgNoClassification: document.getElementById('msg-no-classification'),
        classificationOverlay: document.getElementById('classification-overlay'),
        
        // Stats
        legendContainer: document.getElementById('legend-container'),
        tableMetricsBody: document.querySelector('#table-metrics tbody'),
        
        // Change Detection
        imgChange2024: document.getElementById('img-change-2024'),
        imgChange2025: document.getElementById('img-change-2025'),
        msgNoChange24: document.getElementById('msg-no-change-24'),
        msgNoChange25: document.getElementById('msg-no-change-25'),
        tableTransition: document.getElementById('table-transition'),
        
        // Page Info
        pageTitle: document.getElementById('page-title'),
        pageSubtitle: document.getElementById('page-subtitle'),
        statusText: document.getElementById('status-text')
    };
    // Class Display Names & Colors Matching app.py
    const classMetadata = {
        water: { name: 'Water Body', color: 'rgb(0, 119, 182)' },
        vegetation: { name: 'Vegetation Area', color: 'rgb(46, 117, 89)' },
        builtup: { name: 'Building Area', color: 'rgb(230, 57, 70)' },
        sandy: { name: 'Sandy Area', color: 'rgb(233, 196, 106)' },
        other: { name: 'Other Area', color: 'rgb(108, 117, 125)' }
    };
    // Initialize Page
    init();
    function init() {
        setupEventListeners();
        updateSourceImage();
        updateParameterVisibility();
        updateStatus('System Ready', 'idle');
    }
    // Event Listeners Configuration
    function setupEventListeners() {
        // Tab switching
        elements.tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetTab = btn.getAttribute('data-tab');
                switchTab(targetTab);
            });
        });
        // Config selectors
        elements.selectRegion.addEventListener('change', (e) => {
            state.region = e.target.value;
            updateSourceImage();
            clearClassificationMap();
            clearChangeDetection();
        });
        elements.selectYear.addEventListener('change', (e) => {
            state.year = e.target.value;
            updateSourceImage();
            clearClassificationMap();
        });
        elements.selectAlgo.addEventListener('change', (e) => {
            state.algorithm = e.target.value;
            updateParameterVisibility();
        });
        // Range inputs
        elements.inputK.addEventListener('input', (e) => {
            elements.kValue.textContent = e.target.value;
        });
        elements.inputEstimators.addEventListener('input', (e) => {
            elements.rfValue.textContent = e.target.value;
        });
        // View Toggles (True Color, False Color, Individual Bands)
        elements.btnViewTcc.addEventListener('click', () => {
            setViewMode('tcc');
        });
        elements.btnViewFcc.addEventListener('click', () => {
            setViewMode('fcc');
        });
        elements.btnViewBands.addEventListener('click', () => {
            setViewMode('bands');
        });
        // Band Buttons
        elements.bandBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                elements.bandBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                state.currentBand = btn.getAttribute('data-band');
                updateSourceImage();
            });
        });
        // Run Actions
        elements.btnRunClassification.addEventListener('click', runClassification);
        elements.btnRunChange.addEventListener('click', runChangeDetection);
    }
    // Tab switcher helper
    function switchTab(tabId) {
        state.activeTab = tabId;
        
        elements.tabBtns.forEach(btn => {
            if (btn.getAttribute('data-tab') === tabId) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        elements.tabContents.forEach(content => {
            if (content.id === `tab-${tabId}`) {
                content.classList.add('active');
            } else {
                content.classList.remove('active');
            }
        });
        // Adjust control visibility depending on tab
        if (tabId === 'change') {
            elements.yearControl.style.display = 'none';
            elements.btnRunClassification.style.display = 'none';
            elements.pageTitle.textContent = 'Spatiotemporal Change Detection';
            elements.pageSubtitle.textContent = 'Compute and visualize changes between 2024 and 2025';
        } else if (tabId === 'dashboard') {
            elements.yearControl.style.display = 'flex';
            elements.btnRunClassification.style.display = 'flex';
            elements.pageTitle.textContent = 'Satellite Image Classification';
            elements.pageSubtitle.textContent = 'Multi-band image processing and machine learning analysis';
        } else if (tabId === 'report') {
            elements.pageTitle.textContent = 'Academic Project Report';
            elements.pageSubtitle.textContent = 'Detailed project details, methods, and results';
        } else if (tabId === 'qgis') {
            elements.pageTitle.textContent = 'QGIS Practical Workflow';
            elements.pageSubtitle.textContent = 'Step-by-step instructions for real-world application in QGIS';
        }
    }
    // Toggle View modes
    function setViewMode(mode) {
        state.viewMode = mode;
        elements.btnViewTcc.classList.remove('active');
        elements.btnViewFcc.classList.remove('active');
        elements.btnViewBands.classList.remove('active');
        if (mode === 'tcc') {
            elements.btnViewTcc.classList.add('active');
            elements.divBandSelectors.style.display = 'none';
        } else if (mode === 'fcc') {
            elements.btnViewFcc.classList.add('active');
            elements.divBandSelectors.style.display = 'none';
        } else if (mode === 'bands') {
            elements.btnViewBands.classList.add('active');
            elements.divBandSelectors.style.display = 'flex';
        }
        updateSourceImage();
    }
    // Dynamically update original image source path
    function updateSourceImage() {
        let filename = `${state.region}_${state.year}_`;
        if (state.viewMode === 'tcc') {
            filename += 'tcc.png';
        } else if (state.viewMode === 'fcc') {
            filename += 'fcc.png';
        } else if (state.viewMode === 'bands') {
            filename += `band_${state.currentBand}.png`;
        }
        elements.imgSource.src = `/static/data/${filename}`;
    }
    // Update Parameter block visibility in sidebar controls
    function updateParameterVisibility() {
        elements.paramKmeans.style.display = 'none';
        elements.paramRf.style.display = 'none';
        elements.paramSvm.style.display = 'none';
        if (state.algorithm === 'kmeans') {
            elements.paramKmeans.style.display = 'flex';
        } else if (state.algorithm === 'random_forest') {
            elements.paramRf.style.display = 'flex';
        } else if (state.algorithm === 'svm') {
            elements.paramSvm.style.display = 'flex';
        }
    }
    // UI Status logger
    function updateStatus(text, type = 'idle') {
        elements.statusText.textContent = text;
        const pulseDot = document.querySelector('.pulse-dot');
        
        if (type === 'loading') {
            pulseDot.style.backgroundColor = '#0284c7';
            pulseDot.style.boxShadow = '0 0 0 0 rgba(2, 132, 199, 0.7)';
        } else if (type === 'error') {
            pulseDot.style.backgroundColor = '#ef4444';
            pulseDot.style.boxShadow = '0 0 0 0 rgba(239, 68, 68, 0.7)';
        } else {
            pulseDot.style.backgroundColor = '#0d9488';
            pulseDot.style.boxShadow = '0 0 0 0 rgba(13, 148, 136, 0.7)';
        }
    }
    // Clear maps
    function clearClassificationMap() {
        const ctx = elements.canvasClassified.getContext('2d');
        ctx.clearRect(0, 0, elements.canvasClassified.width, elements.canvasClassified.height);
        elements.msgNoClassification.style.display = 'flex';
        elements.tableMetricsBody.innerHTML = '';
        elements.legendContainer.innerHTML = '';
        
        if (state.charts.areaPie) {
            state.charts.areaPie.destroy();
            state.charts.areaPie = null;
        }
    }
    function clearChangeDetection() {
        elements.imgChange2024.style.display = 'none';
        elements.imgChange2025.style.display = 'none';
        elements.msgNoChange24.style.display = 'flex';
        elements.msgNoChange25.style.display = 'flex';
        elements.tableTransition.innerHTML = '';
        
        if (state.charts.netChangeBar) {
            state.charts.netChangeBar.destroy();
            state.charts.netChangeBar = null;
        }
    }
    // API Call: Execute classification
    async function runClassification() {
        updateStatus('Classifying image pixels...', 'loading');
        elements.classificationOverlay.style.display = 'flex';
        const payload = {
            region: state.region,
            year: state.year,
            algorithm: state.algorithm,
            k_clusters: elements.inputK.value,
            n_estimators: elements.inputEstimators.value,
            svm_c: elements.inputSvmC.value
        };
        try {
            const response = await fetch('/api/classify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const result = await response.json();
            if (result.success) {
                renderClassificationOutput(result.image, result.metrics);
                updateStatus('Classification Complete', 'idle');
            } else {
                updateStatus('Classification Failed', 'error');
                alert('Classification Error: ' + result.error);
            }
        } catch (error) {
            updateStatus('Network Error', 'error');
            console.error('Fetch error:', error);
            alert('Failed to connect to backend server.');
        } finally {
            elements.classificationOverlay.style.display = 'none';
        }
    }
    // Render Canvas output and analytics widgets
    function renderClassificationOutput(imageSrc, metrics) {
        elements.msgNoClassification.style.display = 'none';
        
        const ctx = elements.canvasClassified.getContext('2d');
        const img = new Image();
        img.onload = function() {
            ctx.drawImage(img, 0, 0, elements.canvasClassified.width, elements.canvasClassified.height);
        };
        img.src = imageSrc;
        // Render Tables & Legends
        elements.tableMetricsBody.innerHTML = '';
        elements.legendContainer.innerHTML = '';
        const chartLabels = [];
        const chartData = [];
        const chartColors = [];
        metrics.forEach(item => {
            const rgbColor = `rgb(${item.color.join(',')})`;
            
            // Populate Legend
            const legendItem = document.createElement('div');
            legendItem.className = 'legend-item';
            legendItem.innerHTML = `
                <div class="legend-name">
                    <span class="legend-color" style="background-color: ${rgbColor}"></span>
                    <span>${item.name}</span>
                </div>
                <span class="legend-count">${item.area_ha.toLocaleString()} ha</span>
            `;
            elements.legendContainer.appendChild(legendItem);
            // Populate Table
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>
                    <div class="tbl-class-indicator">
                        <span class="tbl-color-dot" style="background-color: ${rgbColor}"></span>
                        <span>${item.name}</span>
                    </div>
                </td>
                <td>${item.percentage}%</td>
                <td>${item.area_ha.toLocaleString()}</td>
                <td>${item.area_sq_km}</td>
            `;
            elements.tableMetricsBody.appendChild(tr);
            // Collect chart data
            chartLabels.push(item.name);
            chartData.push(item.area_ha);
            chartColors.push(rgbColor);
        });
        // Render Area Chart
        renderAreaPieChart(chartLabels, chartData, chartColors);
    }
    function renderAreaPieChart(labels, data, colors) {
        if (state.charts.areaPie) {
            state.charts.areaPie.destroy();
        }
        const ctx = document.getElementById('chart-area-pie').getContext('2d');
        state.charts.areaPie = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: colors,
                    borderWidth: 1,
                    borderColor: 'rgba(255, 255, 255, 0.1)'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return ` ${context.label}: ${context.raw.toLocaleString()} ha`;
                            }
                        }
                    }
                },
                cutout: '65%'
            }
        });
    }
    // API Call: Execute Change Detection
    async function runChangeDetection() {
        updateStatus('Processing change detection...', 'loading');
        
        const payload = {
            region: state.region,
            algorithm: state.algorithm,
            k_clusters: elements.inputK.value,
            n_estimators: elements.inputEstimators.value,
            svm_c: elements.inputSvmC.value
        };
        try {
            const response = await fetch('/api/change_detection', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const result = await response.json();
            if (result.success) {
                renderChangeDetectionOutput(result);
                updateStatus('Change Detection Complete', 'idle');
            } else {
                updateStatus('Change Analysis Failed', 'error');
                alert('Change Analysis Error: ' + result.error);
            }
        } catch (error) {
            updateStatus('Network Error', 'error');
            console.error('Fetch error:', error);
            alert('Failed to connect to backend server.');
        }
    }
    // Render comparison outputs
    function renderChangeDetectionOutput(data) {
        // Render images
        elements.msgNoChange24.style.display = 'none';
        elements.msgNoChange25.style.display = 'none';
        elements.imgChange2024.src = data.image_2024;
        elements.imgChange2025.src = data.image_2025;
        elements.imgChange2024.style.display = 'block';
        elements.imgChange2025.style.display = 'block';
        // Render transition matrix
        const transTable = elements.tableTransition;
        transTable.innerHTML = '';
        // Create table header
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        headerRow.innerHTML = '<th>From (2024) \\ To (2025)</th>';
        
        // Add columns headers
        data.net_changes.forEach(item => {
            headerRow.innerHTML += `<th>${item.name}</th>`;
        });
        thead.appendChild(headerRow);
        transTable.appendChild(thead);
        // Create table body
        const tbody = document.createElement('tbody');
        data.transition_matrix.forEach(row => {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td><strong>${row.from_name}</strong></td>`;
            
            data.net_changes.forEach(colItem => {
                const cell = row.transitions[colItem.id];
                const area = cell ? cell.area_ha : 0;
                
                // Highlight diagonal (unchanged pixels) for readability
                const isDiagonal = row.from_id === colItem.id;
                const diagClass = isDiagonal ? 'style="background-color: rgba(255, 255, 255, 0.02); font-weight: 600;"' : '';
                
                tr.innerHTML += `<td ${diagClass}>${area.toLocaleString()}</td>`;
            });
            tbody.appendChild(tr);
        });
        transTable.appendChild(tbody);
        // Render Net Variance Bar chart
        const barLabels = [];
        const barData = [];
        const barColors = [];
        data.net_changes.forEach(change => {
            barLabels.push(change.name);
            barData.push(change.diff_ha);
            
            // Color according to positive/negative values
            const classColor = classMetadata[change.id] ? classMetadata[change.id].color : 'rgb(255, 255, 255)';
            barColors.push(classColor);
        });
        renderNetChangeChart(barLabels, barData, barColors);
    }
    function renderNetChangeChart(labels, data, colors) {
        if (state.charts.netChangeBar) {
            state.charts.netChangeBar.destroy();
        }
        const ctx = document.getElementById('chart-net-change').getContext('2d');
        state.charts.netChangeBar = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Net Area Change (hectares)',
                    data: data,
                    backgroundColor: colors,
                    borderWidth: 0,
                    borderRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.05)'
                        },
                        ticks: {
                            color: '#9ca3af'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: '#9ca3af'
                        }
                    }
                }
            }
        });
    }
});