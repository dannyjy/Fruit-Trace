from ultralytics import YOLO
from PIL import Image
import cv2
import numpy as np
import os
from .utils import preprocess_image
from .classification import FruitClassifier

class FruitDetector:
    def __init__(self, model_path='yolov8n.pt', classifier_model='fruit_model.h5'):

        self.classifier_model_path = self.resolve_path(classifier_model)
        self.classifier = FruitClassifier(model_path=self.classifier_model_path)
        self.model = YOLO(model_path)

    def resolve_path(self, path):

        script_dir = os.path.dirname(os.path.abspath(__file__))

        return os.path.join(script_dir, path)

    def detect_fruits(self, image_path):

        fruit_type = self.classifier.classify_fruit(image_path)
        return {"classification": fruit_type}

    def draw_boxes(self, image_path, boxes):
        img = cv2.imread(image_path)

        for box in boxes:
            x1, y1, x2, y2, conf, label = box
            cv2.rectangle(img, (int(x1), int(y1)), (int(x2), int(y2)), (255, 0, 0), 2)
            cv2.putText(img, f'Class {label} {conf:.2f}', (int(x1), int(y1) - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255), 2)

        output_path = os.path.join(os.path.dirname(image_path), 'detected_fruit.jpg')
        cv2.imwrite(output_path, img)
        print(f"Image with bounding boxes saved at: {output_path}")

if __name__ == "__main__":
    image_path = r'000001.jpg'
    detector = FruitDetector(model_path='yolov8n.pt')

    result = detector.detect_fruits(image_path)
    print("Detection result:", result)