from PIL import Image
import numpy as np

def preprocess_image(image_path, target_size=(150, 150), grayscale=False):

    try:
        img = Image.open(image_path)
        if grayscale:
            img = img.convert('L')
        img = img.resize(target_size)
        img_array = np.array(img) / 255.0 

        if grayscale:
            img_array = np.expand_dims(img_array, axis=-1)

        return img_array
    except Exception as e:
        print(f"Error preprocessing {image_path}: {e}")
        return None

from PIL import Image

def crop_fruit_from_image(img, box):
    try:
        x1, y1, x2, y2 = map(int, box)  # Convert coordinates to integers
        cropped_image = img.crop((x1, y1, x2, y2))
        return cropped_image
    except Exception as e:
        print(f"Error cropping image: {str(e)}")
        return None
