from PIL import Image
import numpy as np

def preprocess_image(image_path, target_size=(150, 150), grayscale=False):
    """
    Preprocess the image for detection or classification.
    Args:
        image_path (str): Path to the image file.
        target_size (tuple): Target size for resizing the image.
        grayscale (bool): Whether to convert the image to grayscale.
    Returns:
        np.array: Preprocessed image as a numpy array.
    """
    try:
        img = Image.open(image_path)
        if grayscale:
            img = img.convert('L')  # Convert to grayscale
        img = img.resize(target_size)  # Resize to target size
        img_array = np.array(img) / 255.0  # Normalize pixel values to [0, 1]

        # Add channel dimension if grayscale
        if grayscale:
            img_array = np.expand_dims(img_array, axis=-1)

        return img_array
    except Exception as e:
        print(f"Error preprocessing {image_path}: {e}")
        return None