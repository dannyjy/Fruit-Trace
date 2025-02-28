import cv2
import numpy as np
import tensorflow as tf
import os

# BASE_DIR = os.path.dirname(os.path.abspath(__file__)) 
# MODEL_PATH = os.path.join(BASE_DIR, "fruit_model.h5")
# take the command when the model is ready 

model = tf.keras.models.load_model("fruit_model.h5")
class_names = ["Not Edible", "Edible"]

def classify_fruit(img_array):
    """Predicts if a given fruit is edible or not"""

    img_array = cv2.resize(img_array, (64, 64))
    img_array = np.expand_dims(img_array, axis=0)
    img_array = img_array / 255.0

    prediction = model.predict(img_array)
    class_idx = np.argmax(prediction, axis=1)[0]

    return class_names[class_idx]
