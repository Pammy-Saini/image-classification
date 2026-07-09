Academic Project Report
Title: Image Processing and Classification using Machine Learning Techniques
Location of Case Study: Jodhpur and Jalore Districts, Rajasthan, India
Satellite Sensor: IRS-LISS-3 (Indian Remote Sensing Satellite - Linear Imaging Self-Scanning Sensor 3)
Primary Portals Utilized: ISRO Bhuvan and Bhunidhi

Chapter 1: Remote Sensing
1.1 Introduction
Remote Sensing is defined as the science, art, and technology of acquiring information about the Earth’s surface features (objects, areas, or phenomena) without making direct, physical contact. This process is accomplished by utilizing sensors mounted on various platforms (such as satellites, aircraft, helicopters, or unmanned aerial vehicles/UAVs) to record electromagnetic radiation (EMR) that is reflected, scattered, or emitted from the surface.

The physical basis of remote sensing relies on the electromagnetic spectrum. Different Earth surface materials (e.g., water, green vegetation, dry sand, concrete buildings) interact with EMR in distinct, characteristic ways depending on their molecular structures and physical properties. Sensors capture this radiance in narrow wavelength intervals, known as spectral bands, which are then transmitted to ground stations and processed into digital images.

1.2 History and Remote Sensing
The history of remote sensing is closely linked with the evolution of photography, aviation, and space exploration:

The Era of Aerial Photography (1850s–1950s): The earliest form of remote sensing began with photography from hot air balloons (Gaspard-Félix Tournachon, "Nadar," took the first aerial photograph of Paris in 1858). During World War I and II, aerial reconnaissance underwent massive expansion, leading to systematic photographic interpretation techniques and the development of specialized films (such as near-infrared films for camouflage detection).
The Launch of Earth Observation Satellites (1970s): The modern era of spaceborne remote sensing was inaugurated on July 23, 1972, with the launch of NASA's Landsat-1 (originally named the Earth Resources Technology Satellite, ERTS-1). Landsat-1 carried a Multispectral Scanner (MSS) sensor, providing the first repetitive, systematic global coverage of Earth's surface.
The Indian Remote Sensing (IRS) Program: Under the leadership of the Indian Space Research Organisation (ISRO), India launched its first operational remote sensing satellite, IRS-1A, on March 17, 1988, carrying the Linear Imaging Self-Scanning (LISS-1 and LISS-2) sensors. Over the decades, ISRO launched advanced earth observation systems, including IRS-1C/1D, Resourcesat-1, Resourcesat-2, and Resourcesat-2A. These satellites carry the LISS-3 sensor, which provides multi-band optical data with a spatial resolution of 23.5 meters and a revisit period of 24 days. LISS-3 has been widely used for national-scale mapping projects in India.
1.3 Types of Remote Sensing
Remote sensing systems are classified into active and passive systems based on the source of electromagnetic energy:

Passive Remote Sensing: These sensors rely on naturally available energy. In the visible and infrared regions, solar radiation reflected from the Earth's surface is measured. In the thermal region, sensors measure infrared radiation emitted directly by Earth features due to their heat. Optical sensors on satellites like Resourcesat (LISS-3), Landsat, and Sentinel are passive systems. They are limited by daylight availability (for visible/reflected bands) and cannot penetrate cloud cover.
Active Remote Sensing: These sensors generate their own electromagnetic energy, transmit it toward the Earth, and measure the portion of the signal reflected or backscattered back to the sensor. Key examples include RADAR (Radio Detection and Ranging), SAR (Synthetic Aperture Radar), and LiDAR (Light Detection and Ranging). Active systems can operate day and night and can penetrate clouds, rain, and light vegetation.
1.4 Application of Remote Sensing
Satellite remote sensing data is a vital tool across multiple domains:

Agriculture and Soil Mapping: Crop type classification, crop yield estimation, soil moisture retrieval, and monitoring crop stress or diseases using spectral indices like the Normalized Difference Vegetation Index (NDVI).
Forestry and Land Cover: Delineation of forest types, monitoring deforestation rates, calculating forest fire damage, and estimating carbon stock/biomass.
Urban Planning and Development: Monitoring urban sprawl, detecting illegal settlements, identifying changes in land-use land-cover (LULC), and planning infrastructure.
Water Resource Management: Mapping surface water bodies, measuring reservoir capacity changes over seasons, flood inundation mapping, and tracking glacial lake outbursts.
Geology and Mineral Exploration: Lithological mapping, identifying geological faults and lineaments, mineral prospecting, and tracking landslides.
Chapter 2: Image Processing
2.1 Image
A digital satellite image is represented mathematically as a two-dimensional grid of picture elements called pixels. Each pixel occupies a specific column (
c
c) and row (
r
r) and contains an integer value known as the Digital Number (DN). The DN represents the intensity of electromagnetic energy measured by the sensor's detector for that area on the ground.

Satellite sensor performance is characterized by four types of resolution:

Spatial Resolution: The size of the ground area represented by a single pixel. For IRS-LISS-3, the spatial resolution is 23.5 meters for all spectral bands.
Spectral Resolution: The number and width of the electromagnetic wavelength bands recorded by the sensor. LISS-3 records data in 4 bands: Green, Red, Near-Infrared (NIR), and Shortwave Infrared (SWIR).
Radiometric Resolution: The bit depth of the sensor, which defines its sensitivity to small differences in electromagnetic energy. LISS-3 data is typically recorded at 7-bit or 8-bit radiometric resolution (representing 128 or 256 gray levels).
Temporal Resolution: The time interval between successive imagery acquisitions over the same geographic coordinate. For LISS-3, this revisit period is 24 days.
2.2 Image Interpretation Key
Visual image interpretation is the process of identifying features on an image using manual observation. Interpreters rely on eight core elements of image interpretation (often called the image interpretation key):

Tone/Color: The relative brightness or color intensity. Bright tones represent high reflectance (e.g., dry sand, concrete), while dark tones indicate absorption (e.g., water absorbs NIR radiation, appearing black).
Size: The physical dimensions of a feature relative to other objects (e.g., identifying a school vs. a residential house by footprint size).
Shape: The geometric outline or form of a feature (e.g., rectangular agricultural fields, linear roads, or circular pivot irrigation systems).
Texture: The visual frequency of tonal change, described as rough, smooth, or mottled (e.g., dense forest has a rough texture, whereas calm water or paved runways appear very smooth).
Pattern: The spatial arrangement of objects (e.g., trees planted in regular grid rows indicate an orchard, whereas scattered, random patterns indicate natural forest).
Shadow: Provides information about the height or profile of an object and helps map topographic relief (e.g., tall mountain peaks or skyscrapers cast long shadows).
Association: The proximity of a feature to other recognizable objects (e.g., a sports stadium next to large parking lots, or docks next to a coastline).
Site: The unique geographic or topographic location of a feature (e.g., vegetation thriving along a river channel, or ski resorts located on high-altitude mountain slopes).
2.3 Satellite Image Composites
Multispectral sensors capture individual bands as separate grayscale images. To visualize these bands in color, three bands are mapped to the Red, Green, and Blue (RGB) color channels of a display monitor.

True Color Composite (TCC): Formed by mapping the Red band to the Red channel, Green band to the Green channel, and Blue band to the Blue channel. This emulates natural human vision. Because the IRS-LISS-3 sensor lacks a native Blue band, a TCC must be simulated by combining the Green, Red, and SWIR bands through mathematical interpolation.
False Color Composite (FCC): Formed by mapping the Near-Infrared (NIR) band to the Red channel, the Red band to the Green channel, and the Green band to the Blue channel. On a standard FCC:
Vegetation appears in shades of bright red due to its high reflectance in the NIR region and absorption in the Red.
Water Bodies appear dark blue or black because water absorbs almost all NIR radiation.
Built-up / Urban areas appear cyan or light gray.
Bare soil and sand appear bright white or light yellow.
2.4 Image Classification Techniques
Image classification sorts pixels into thematic land-cover classes based on their spectral values across multiple bands.

A. Unsupervised Classification (Clustering)
Unsupervised classification requires no training data. An algorithm groups pixels with similar spectral characteristics into statistical clusters. The most common algorithm is K-Means Clustering.

Methodology: The user defines the number of output clusters (
K
K). The algorithm randomly initializes 
K
K cluster centers, assigns each pixel to the nearest center based on Euclidean distance, recalculates the cluster centers as the mean of all assigned pixels, and repeats the process until the centers stabilize.
Post-processing: The analyst must manually inspect the spatial distribution of the resulting clusters and assign them thematic class labels (e.g., mapping Cluster 1 to 'Water Body' and Cluster 2 to 'Vegetation').
Equation: The objective function minimized is: 
J
=
∑
j
=
1
K
∑
i
=
1
n
∣
∣
x
i
(
j
)
−
c
j
∣
∣
2
J=∑ 
j=1
K
​
 ∑ 
i=1
n
​
 ∣∣x 
i
(j)
​
 −c 
j
​
 ∣∣ 
2
  where 
x
i
x 
i
​
  is a pixel vector and 
c
j
c 
j
​
  is the centroid of cluster 
j
j.
B. Supervised Classification
Supervised classification requires the user to identify representative samples of known land-cover categories, called Training Sites or Regions of Interest (ROIs). The algorithm calculates the statistical profiles of these classes and classifies the remaining pixels.

Random Forest (RF): An ensemble machine learning classifier that constructs multiple decision trees during training. Each tree is trained on a bootstrap sample of the data. For classification, each tree casts a vote, and the pixel is assigned to the class with the most votes. RF is highly accurate and resistant to overfitting.
Support Vector Machine (SVM): A non-parametric supervised classifier that finds the optimal boundary (hyperplane) that separates classes with the maximum margin. Using kernel functions (like the Radial Basis Function - RBF), SVM can handle non-linear separations in high-dimensional spectral spaces.
C. Comparison Table
Feature	Supervised Classification	Unsupervised Classification
User Input	High. Requires collecting training samples (ROIs).	Low. Requires specifying only the number of clusters (
K
K).
Class Labeling	Completed before classification (ROIs are pre-labeled).	Completed after classification (user maps clusters to classes).
Accuracy	Generally high, dependent on the quality of training samples.	Variable, as spectral clusters may combine different land covers.
Computational Time	Fast training and classification.	Slow. Iterative clustering requires multiple passes.
Chapter 3: Image Classification Result
3.1 Study Areas Geographic Profile
This study analyzes two districts in Rajasthan, India, which present distinct environmental profiles:

Jodhpur District (The Sun City): Located on the eastern edge of the Thar Desert. The terrain is sandy with rocky volcanic ridges (such as the Mehrangarh ridge). It has an arid climate with low rainfall, sparse natural vegetation, and notable urban expansion. The major water resource is the historic Kaylana Lake.
Jalore District (The Granite City): Located in south-western Rajasthan. It features rugged granite hills (part of the Aravalli range outliers) and the seasonal Jawai River. The riverbed is sandy and dry for much of the year, but the surrounding basin supports active seasonal agriculture.
3.2 Data Source and Processing
Multi-band satellite data from the IRS-LISS-3 sensor was sourced from ISRO's Bhuvan and Bhunidhi portals. The datasets analyzed correspond to two temporal stages: March 2024 (baseline) and March 2025 (change monitoring).

3.3 Land Use Land Cover (LULC) Classification Scheme
Pixels were classified into five categories based on their spectral characteristics:

Water Body (Blue): Rivers, lakes, and reservoirs. Spectral profile: absorption in NIR (Band 4) and SWIR (Band 5).
Vegetation Area (Green): Agricultural fields, urban parks, and orchards. Spectral profile: reflection peak in NIR (Band 4).
Building Area (Red): Residential, commercial, and industrial settlements. Spectral profile: medium-high flat reflectance across all bands.
Sandy Area (Yellow): Sand dunes, desert soil, and dry river sand beds. Spectral profile: high reflectance across all bands, especially Red (Band 3) and SWIR (Band 5).
Other Area / Rocky (Grey): Granite rock outcrops, hills, and barren gravel plains. Spectral profile: medium flat reflectance.
3.4 Spatiotemporal Analysis and Change Detection (2024 vs. 2025)
By comparing the classified LULC maps from March 2024 and March 2025, we observe several clear geographic trends:

Urban Expansion in Jodhpur: The Building Area class increases in Jodhpur. This urban growth occurs primarily at the city outskirts, converting Sandy Area and Other Area (barren/rocky soil) into built-up structures.
River Hydrology in Jalore: The seasonal dynamics of the Jawai River are visible. A decrease in Water Body area from 2024 to 2025 exposes more of the dry sand bed, which is classified as Sandy Area. In addition, the agricultural fields show changes in Vegetation cover based on the crop cycles of the winter (Rabi) harvest.
QGIS Integration & Workflow Tutorial
To perform this classification in QGIS using real IRS-LISS-3 data, use the following workflow:

Download Data: Search the ISRO Bhunidhi catalog for Resourcesat-2 LISS-3 datasets over your study area. Download the product, which contains four TIF band files:
band2.tif (Green)
band3.tif (Red)
band4.tif (NIR)
band5.tif (SWIR)
Install SCP Plugin: Open QGIS, go to Plugins > Manage and Install Plugins, search for the Semi-Automatic Classification Plugin (SCP), and install it.
Configure Band Set: Open the SCP panel. In the Band Set tab, load the four TIF bands. Arrange them in order (Band 2, 3, 4, 5). Under "Quick wavelengths", select LISS-3 to automatically assign the correct wavelengths. Check the box to generate a virtual raster composite.
Visualize Composite:
For a False Color Composite (FCC), set the band rendering to RGB = 3, 2, 1 (NIR, Red, Green).
For a True Color Composite (TCC), set RGB to 2, 1, 4 (Red, Green, SWIR/synthesized) and adjust the contrast stretch.
Create Training Samples: Open the SCP Training Input tab and create a new training input file. Use the polygon creation tool to draw training ROIs for your classes: Water Body (MC_ID=1), Vegetation (MC_ID=2), Builtup (MC_ID=3), Sandy (MC_ID=4), and Other/Rocky (MC_ID=5). Collect at least 15 polygons per class.
Execute Classification: Go to SCP > Band Processing > Classification. Select your input band set and choose the Random Forest algorithm. Set the number of trees to 50. Click Run and select an output raster path.
Generate Report: In the SCP panel, use the Land Cover Change or Report tools to output the pixel counts, percentages, and total area in hectares for each class.
Conclusion
This project demonstrates how machine learning algorithms (such as K-Means, Random Forest, and Support Vector Machines) can be applied to multi-band satellite data (such as IRS-LISS-3) to automate land-use and land-cover classification.

Supervised classifiers like Random Forest and SVM show high performance in separating spectrally similar classes, such as sandy riverbeds and urban built-up areas. Integrating remote sensing datasets with GIS software like QGIS provides a powerful framework for tracking environmental changes, monitoring urban growth, and managing water resources.