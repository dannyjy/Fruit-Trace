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