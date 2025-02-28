from ultralytics import YOLO
from PIL import Image
import cv2
import numpy as np
from utils import preprocess_image  # Import the preprocess_image function
from classification import FruitClassifier  # Import the FruitClassifier class
from utils import preprocess_image

class FruitDetector:
    def __init__(self, model_path='yolov8n.pt'):
        # Load the YOLOv8 model
        self.model = YOLO(model_path)

    def detect_fruits(self, image_path):
        # Load the image
        img = Image.open(image_path)
        
        # Perform detection
        results = self.model(img)
        
        # Show results (optional)
        for result in results:
            result.show()  # Display each result
        
        # Get bounding boxes, labels, and confidences
        boxes = []
        for result in results:
            for box in result.boxes:
                x1, y1, x2, y2 = box.xyxy[0].tolist()  # Bounding box coordinates
                conf = box.conf.item()  # Confidence score
                label = int(box.cls.item())  # Class label
                boxes.append([x1, y1, x2, y2, conf, label])
        
        return boxes

    def draw_boxes(self, image_path, boxes):
        # Read image
        img = cv2.imread(image_path)
        
        # Loop through each detection and draw a bounding box
        for box in boxes:
            x1, y1, x2, y2, conf, label = box
            cv2.rectangle(img, (int(x1), int(y1)), (int(x2), int(y2)), (255, 0, 0), 2)
            cv2.putText(img, f'Class {label} {conf:.2f}', (int(x1), int(y1) - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255), 2)
        
        # Save the image with boxes
        cv2.imwrite('detected_fruit.jpg', img)

# Example usage
if __name__ == "__main__":
    # Provide the correct path to the image
    image_path = r'000001.jpg'
    
    # Initialize the detector
    detector = FruitDetector(model_path='yolov8n.pt')
    
    # Detect fruits in the image
    boxes = detector.detect_fruits(image_path)
    
    # Print detection results
    print("Detection Results:")
    for i, box in enumerate(boxes):
        x1, y1, x2, y2, conf, label = box
        print(f"Fruit {i + 1}: Class {label}, Confidence {conf:.2f}, Bounding Box [{x1}, {y1}, {x2}, {y2}]")
    print("\nClassification Results:---------------------------done1 ---------------------------------------------------------")
    # Draw bounding boxes on the image
    detector.draw_boxes(image_path, boxes)
    print("\nClassification Results:---------------------------done2 ---------------------------------------------------------")
    # Preprocess the image for classification
    cropped_image = preprocess_image(image_path)
    print("\nClassification Results:---------------------------done3 ---------------------------------------------------------")
    # Initialize the classifier
    classifier = FruitClassifier(model_path='fruit_model.h5')
    
    print("\nClassification Results:---------------------------done 4---------------------------------------------------------")
    # Classify the fruit
    
    print(classifier.classify_fruit(image_path))
    # Print classification results
    print("\nClassification Results:------------------------------------------------------------------------------------")
    