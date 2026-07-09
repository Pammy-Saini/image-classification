import os
import numpy as np
from PIL import Image
# Directory setup
OUTPUT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'static', 'data')
os.makedirs(OUTPUT_DIR, exist_ok=True)
# Grid size
SIZE = 256
# Spectral Signatures (Green, Red, NIR, SWIR)
# Normal remote sensing ranges mapped to 0-255 for simplicity
SIGNATURES = {
    'water':      np.array([ 60,  50,  20,   5]), # Low in NIR/SWIR
    'vegetation': np.array([ 90,  45, 220,  80]), # High in NIR
    'builtup':    np.array([140, 150, 160, 170]), # Flat, medium-high spectrum
    'sandy':      np.array([170, 200, 215, 245]), # High in all, especially Red/SWIR
    'other':      np.array([105, 120, 130, 145])  # Medium, rocky/barren
}
def create_jodhpur_map(year):
    """
    Creates a simulated land cover class map for Jodhpur.
    Jodhpur has a central urban built-up area (which expands in 2025),
    a water reservoir (Kaylana Lake) in the west/northwest,
    large sandy desert patches in the outskirts,
    scattered vegetation (gardens/parks), and rocky hills (other).
    """
    grid = np.zeros((SIZE, SIZE), dtype=object)
    
    # Coordinates of center
    cx, cy = SIZE // 2, SIZE // 2
    
    # 1. Fill default background as 'other' (rocky/barren soil typical of Jodhpur ridge)
    grid[:] = 'other'
    
    # 2. Add Sandy Desert in the east and north-east
    for r in range(SIZE):
        for c in range(SIZE):
            # Distance from top-right corner
            dist = np.sqrt(r**2 + (SIZE-1-c)**2)
            if dist < SIZE * 0.7:
                grid[r, c] = 'sandy'
            # Add some dunes patches in the south-west
            dune_dist = np.sqrt((SIZE-1-r)**2 + c**2)
            if dune_dist < SIZE * 0.25:
                grid[r, c] = 'sandy'
                
    # 3. Add Kaylana Lake (water body) in the northwest corner
    for r in range(SIZE):
        for c in range(SIZE):
            dist = np.sqrt(r**2 + c**2)
            # A wavy lake outline
            lake_boundary = 50 + 10 * np.sin(r / 10.0) + 5 * np.cos(c / 8.0)
            if dist < lake_boundary:
                grid[r, c] = 'water'
                
    # 4. Add Central Urban Built-up area (Jodhpur city)
    # Built-up radius is larger in 2025 than 2024
    builtup_radius = 65 if year == 2025 else 50
    for r in range(SIZE):
        for c in range(SIZE):
            # Urban center is slightly offset from the exact center
            dist = np.sqrt((r - cx + 10)**2 + (c - cy - 10)**2)
            # Add some irregularity to urban boundaries
            urban_boundary = builtup_radius + 12 * np.sin(r / 6.0) * np.cos(c / 6.0)
            if dist < urban_boundary:
                if grid[r, c] != 'water': # Don't overwrite lake
                    grid[r, c] = 'builtup'
                    
    # 5. Add Vegetation (parks, agriculture in sub-urban areas)
    # Vegetation around the lake and scattered gardens
    for r in range(SIZE):
        for c in range(SIZE):
            if grid[r, c] == 'water':
                continue
            
            # Vegetation buffer around water
            dist_to_water = np.sqrt(r**2 + c**2)
            lake_boundary = 50 + 10 * np.sin(r / 10.0) + 5 * np.cos(c / 8.0)
            if dist_to_water >= lake_boundary and dist_to_water < lake_boundary + 20:
                grid[r, c] = 'vegetation'
            
            # Scattered gardens in the city
            # Garden 1: Mandore Garden representation (north-east of city)
            g1_dist = np.sqrt((r - 60)**2 + (c - 180)**2)
            if g1_dist < 15:
                grid[r, c] = 'vegetation'
            
            # Garden 2: Shastri Nagar park representation (south-west of city center)
            g2_dist = np.sqrt((r - 180)**2 + (c - 80)**2)
            if g2_dist < 12:
                grid[r, c] = 'vegetation'
                
            # Agricultural patch near outskirts (south-east)
            agri_dist = np.sqrt((SIZE-1-r)**2 + (SIZE-1-c)**2)
            if agri_dist < 40:
                grid[r, c] = 'vegetation'
                
    return grid
def create_jalore_map(year):
    """
    Creates a simulated land cover class map for Jalore.
    Jalore features a prominent granite hill range (other/rocky),
    a dry riverbed (Jawai River) running diagonally (water/sandy),
    agricultural vegetation along the river basin, and a smaller builtup town.
    In 2025, the river water levels are lower, exposing more sand.
    """
    grid = np.zeros((SIZE, SIZE), dtype=object)
    
    # 1. Default background is 'sandy' / dry soil
    grid[:] = 'sandy'
    
    # 2. Add Granite Hills (rocky/other) - Jalore Granite Hills in the center/south
    for r in range(SIZE):
        for c in range(SIZE):
            # Hill range 1 (elliptical shape in the lower middle)
            val1 = ((r - 170)/50)**2 + ((c - 120)/80)**2
            # Hill range 2 (upper right)
            val2 = ((r - 60)/40)**2 + ((c - 200)/40)**2
            if val1 < 1.0 or val2 < 1.0:
                grid[r, c] = 'other'
                
    # 3. Add Jawai River running from top-right to bottom-left
    # Water width is smaller in 2025
    water_width = 8 if year == 2025 else 16
    sand_buffer = 24
    
    for r in range(SIZE):
        for c in range(SIZE):
            # River center line: c = r + 20 + sine wave
            river_center = r + 20 + 25 * np.sin(r / 30.0)
            dist_to_river = np.abs(c - river_center)
            
            if dist_to_river < water_width:
                grid[r, c] = 'water'
            elif dist_to_river < sand_buffer:
                # Riverbed sand
                if grid[r, c] != 'other': # Hills stay hills
                    grid[r, c] = 'sandy'
                    
    # 4. Add Agricultural Vegetation along the river basin
    for r in range(SIZE):
        for c in range(SIZE):
            if grid[r, c] in ['water', 'other']:
                continue
                
            river_center = r + 20 + 25 * np.sin(r / 30.0)
            dist_to_river = np.abs(c - river_center)
            
            # Vegetation thrives between 24 and 65 pixels away from the river
            if dist_to_river >= sand_buffer and dist_to_river < 65:
                # Add some patchiness using noise
                if np.sin(r/5.0) * np.cos(c/5.0) > -0.3:
                    grid[r, c] = 'vegetation'
                    
    # 5. Add Jalore Town (built-up) on the bank of the river (middle left)
    cx, cy = 130, 80
    builtup_radius = 32 if year == 2025 else 26 # Growth in 2025
    for r in range(SIZE):
        for c in range(SIZE):
            dist = np.sqrt((r - cx)**2 + (c - cy)**2)
            town_boundary = builtup_radius + 6 * np.sin(r / 4.0)
            if dist < town_boundary:
                if grid[r, c] != 'water': # Don't overwrite flowing river water
                    grid[r, c] = 'builtup'
                    
    return grid
def generate_spectral_data(class_map):
    """
    Converts a class name map into 4-band spectral data (Green, Red, NIR, SWIR)
    with added Gaussian noise.
    """
    data = np.zeros((SIZE, SIZE, 4), dtype=np.float32)
    
    for label, sig in SIGNATURES.items():
        mask = (class_map == label)
        # Assign base spectral signature
        data[mask] = sig
        
    # Add Gaussian noise
    noise = np.random.normal(0, 8.0, size=(SIZE, SIZE, 4))
    data += noise
    
    # Clip to valid 0-255 range
    data = np.clip(data, 0, 255).astype(np.uint8)
    return data
def save_composites(data, prefix):
    """
    Saves spectral data composites:
    1. Raw Band data (as npy)
    2. False Color Composite (FCC): RGB = (NIR, Red, Green)
    3. True Color Composite (TCC): RGB = (Red, Green, Blue)
       Since IRS-LISS-3 has no Blue band, we synthesize Blue from Green and Red.
    4. Grayscale individual bands (Green, Red, NIR, SWIR)
    """
    # 1. Save raw spectral bands
    np.save(os.path.join(OUTPUT_DIR, f"{prefix}_bands.npy"), data)
    
    # Extract bands
    green = data[:, :, 0]
    red = data[:, :, 1]
    nir = data[:, :, 2]
    swir = data[:, :, 3]
    
    # Save individual bands as grayscale PNGs
    Image.fromarray(green).save(os.path.join(OUTPUT_DIR, f"{prefix}_band_green.png"))
    Image.fromarray(red).save(os.path.join(OUTPUT_DIR, f"{prefix}_band_red.png"))
    Image.fromarray(nir).save(os.path.join(OUTPUT_DIR, f"{prefix}_band_nir.png"))
    Image.fromarray(swir).save(os.path.join(OUTPUT_DIR, f"{prefix}_band_swir.png"))
    
    # 2. Save FCC (NIR, Red, Green)
    fcc = np.stack([nir, red, green], axis=-1)
    Image.fromarray(fcc).save(os.path.join(OUTPUT_DIR, f"{prefix}_fcc.png"))
    
    # 3. Save TCC (Red, Green, Blue)
    # Synthesize Blue band: Blue = 1.1 * Green - 0.2 * Red - 0.1 * SWIR (clamped)
    # This creates a visually pleasing green vegetation and dark water.
    blue = 1.1 * green.astype(np.float32) - 0.2 * red.astype(np.float32) - 0.1 * swir.astype(np.float32)
    blue = np.clip(blue, 0, 255).astype(np.uint8)
    
    tcc = np.stack([red, green, blue], axis=-1)
    # Apply minor contrast enhancement to make it look gorgeous
    tcc = (tcc.astype(np.float32) * 1.1)
    tcc = np.clip(tcc, 0, 255).astype(np.uint8)
    Image.fromarray(tcc).save(os.path.join(OUTPUT_DIR, f"{prefix}_tcc.png"))
def main():
    print("Generating simulated IRS-LISS-3 satellite data...")
    
    regions = {
        'jodhpur_2024': create_jodhpur_map(2024),
        'jodhpur_2025': create_jodhpur_map(2025),
        'jalore_2024': create_jalore_map(2024),
        'jalore_2025': create_jalore_map(2025)
    }
    
    for name, class_map in regions.items():
        print(f"Generating data for {name}...")
        
        # Save ground truth class map for validation/reference
        gt_colors = {
            'water': [0, 0, 255],        # Blue
            'vegetation': [0, 200, 0],   # Green
            'builtup': [200, 50, 50],    # Red/Brown
            'sandy': [240, 220, 130],    # Sandy/Yellow
            'other': [150, 150, 150]     # Grey
        }
        
        gt_img = np.zeros((SIZE, SIZE, 3), dtype=np.uint8)
        for label, color in gt_colors.items():
            gt_img[class_map == label] = color
            
        Image.fromarray(gt_img).save(os.path.join(OUTPUT_DIR, f"{name}_gt.png"))
        
        # Generate 4-band spectral data
        spectral_data = generate_spectral_data(class_map)
        
        # Save composites
        save_composites(spectral_data, name)
        
    print("Data generation complete! Saved in static/data/")
if __name__ == '__main__':
    main()