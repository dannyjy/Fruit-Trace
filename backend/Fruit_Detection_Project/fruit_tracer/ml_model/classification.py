from tensorflow.keras.preprpcessing import image 
import numpy as np 

model=tf.keras.modes.load_model(fruit_model.h5)

def classify_fruit(image_path):
    img=image.load_image(image_path, target_size(64,64))
    img_array=image.img_to_array(img)
    img_array=np.expand_dims(img_array, axis=0)
    img_array/=255.0

    prediction=model.predict(img_array)
    class_idx=np.argmax(prediction, axis=1)

    class_names=[]
    fruit_type=class_names[class_idx[0]]

    return fruit_type
