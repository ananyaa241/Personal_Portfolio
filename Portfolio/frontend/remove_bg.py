import sys
from PIL import Image

def remove_white_bg(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    datas = img.getdata()

    newData = []
    # Cursor has black/purple outline, pink shadow, white fill inside outline.
    # The outside is white. We want to make the outside transparent.
    # Since it's a simple image, it's better to do a flood fill from 0,0 to find the outside white
    # and make it transparent.
    
    # Or just replace pure white and near-white.
    # But wait, the inner part of the cursor is ALSO light colored (almost white).
    # If we replace ALL white, we might make the inside of the cursor transparent!
    # Let's use floodfill to make only the OUTSIDE white transparent.
    
    # Actually, PIL.ImageDraw.floodfill doesn't work easily with alpha channel replacement directly.
    # We can just do a BFS from the border pixels (0,0) which are white, and replace them with (255, 255, 255, 0).
    
    width, height = img.size
    pixels = img.load()
    
    # Tolerance for "white"
    def is_white(c):
        return c[0] > 230 and c[1] > 230 and c[2] > 230
        
    visited = set()
    queue = [(0, 0), (width-1, 0), (0, height-1), (width-1, height-1)]
    
    for q in queue:
        visited.add(q)
        
    while queue:
        x, y = queue.pop(0)
        current_color = pixels[x, y]
        
        if is_white(current_color):
            pixels[x, y] = (255, 255, 255, 0)
            
            # Add neighbors
            for dx, dy in [(0, 1), (1, 0), (0, -1), (-1, 0)]:
                nx, ny = x + dx, y + dy
                if 0 <= nx < width and 0 <= ny < height and (nx, ny) not in visited:
                    visited.add((nx, ny))
                    queue.append((nx, ny))
                    
    # The image is quite large for a cursor. Let's crop it tightly to its bounding box.
    bbox = img.getbbox()
    if bbox:
        img = img.crop(bbox)
        
    # Resize to a typical cursor size, e.g., 32x32 or keep aspect ratio. Let's make the max dimension 32.
    img.thumbnail((32, 32), Image.Resampling.LANCZOS)
    
    img.save(output_path, "PNG")

if __name__ == "__main__":
    remove_white_bg(sys.argv[1], sys.argv[2])
