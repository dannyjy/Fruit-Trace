from ultralytics import YOLO
from PIL import Image
import cv2
import numpy as np
from utils import preprocess_image
from classification import FruitClassifier
from utils import preprocess_image

class FruitDetector:
    def __init__(self, model_path='yolov8n.pt'):

        self.model = YOLO(model_path)

    def detect_fruits(self, image_path):

        img = Image.open(image_path)

        results = self.model(img)

        for result in results:
            result.show() 

        boxes = []
        for result in results:
            for box in result.boxes:
                x1, y1, x2, y2 = box.xyxy[0].tolist()
                conf = box.conf.item()
                label = int(box.cls.item())
                boxes.append([x1, y1, x2, y2, conf, label])

        return boxes

    def draw_boxes(self, image_path, boxes):

        img = cv2.imread(image_path)

        for box in boxes:
            x1, y1, x2, y2, conf, label = box
            cv2.rectangle(img, (int(x1), int(y1)), (int(x2), int(y2)), (255, 0, 0), 2)
            cv2.putText(img, f'Class {label} {conf:.2f}', (int(x1), int(y1) - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255), 2)

        cv2.imwrite('detected_fruit.jpg', img)

if __name__ == "__main__":
    image_path = r'000001.jpg'
    
    detector = FruitDetector(model_path='yolov8n.pt')
    
    boxes = detector.detect_fruits(image_path)
    
    print("Detection Results:")
    for i, box in enumerate(boxes):
        x1, y1, x2, y2, conf, label = box
        print(f"Fruit {i + 1}: Class {label}, Confidence {conf:.2f}, Bounding Box [{x1}, {y1}, {x2}, {y2}]")

    detector.draw_boxes(image_path, boxes)

    cropped_image = preprocess_image(image_path)

    classifier = FruitClassifier(model_path='fruit_model.h5')
    
    print(classifier.classify_fruit(image_path))
