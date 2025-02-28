import tensorflow as tf
from tensorflow.keras.preprocessing import image
import numpy as np
from PIL import Image

class FruitClassifier:
    def __init__(self, model_path='fruit_model.h5', target_size=(128, 128)):

        self.model = tf.keras.models.load_model(model_path)
        self.target_size = target_size

    def resize_image(self, image_path):

        img = Image.open(image_path)
        img = img.resize(self.target_size) 
        resized_path = "resized_image.jpg"
        img.save(resized_path)
        return resized_path

    def classify_fruit(self, image_path):

        resized_path = self.resize_image(image_path)

        img = image.load_img(resized_path, target_size=self.target_size)
        img_array = image.img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0)
        img_array /= 255.0 

        print("Image array shape:", img_array.shape)

        if img_array.shape[1:] != self.model.input_shape[1:]:
            raise ValueError(f"Input shape mismatch. Expected {self.model.input_shape[1:]}, but got {img_array.shape[1:]}")

        prediction = self.model.predict(img_array)
        confidence = prediction[0][0] 

        if confidence > 0.5:
            return "Rotten"
        else:
            return "Ripe"