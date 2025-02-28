import tensorflow as tf
from tensorflow.keras.preprocessing import image
import numpy as np
from PIL import Image

class FruitClassifier:
    def __init__(self, model_path='fruit_model.h5', target_size=(128, 128)):
        """
        Initializes the FruitClassifier.
        
        Args:
            model_path (str): Path to the pre-trained model file.
            target_size (tuple): Target size for resizing the input image (height, width).
        """
        # Load the pre-trained model
        self.model = tf.keras.models.load_model(model_path)
        self.target_size = target_size

    def resize_image(self, image_path):
        """
        Resizes the image to the target size.

        Args:
            image_path (str): Path to the input image.

        Returns:
            str: Path to the resized image.
        """
        img = Image.open(image_path)
        img = img.resize(self.target_size)  # Resize the image to (128, 128)
        resized_path = "resized_image.jpg"  # Save the resized image
        img.save(resized_path)
        return resized_path

    def classify_fruit(self, image_path):
        """
        Classifies the fruit in the given image as "Rotten" or "Ripe".

        Args:
            image_path (str): Path to the input image.

        Returns:
            str: "Rotten" or "Ripe".
        """
        # Resize the image to match the model's input shape
        resized_path = self.resize_image(image_path)
        
        # Load the resized image
        img = image.load_img(resized_path, target_size=self.target_size)
        img_array = image.img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension
        img_array /= 255.0  # Normalize pixel values

        # Debugging: Print the image array shape
        print("Image array shape:", img_array.shape)

        # Ensure the image array shape matches the model's input shape
        if img_array.shape[1:] != self.model.input_shape[1:]:
            raise ValueError(f"Input shape mismatch. Expected {self.model.input_shape[1:]}, but got {img_array.shape[1:]}")

        # Make prediction
        prediction = self.model.predict(img_array)
        confidence = prediction[0][0]  # Confidence score

        # Determine if the fruit is rotten or ripe
        if confidence > 0.5:
            return "Rotten"
        else:
            return "Ripe"