from ultralytics import YOLO
import cv2
from PIL import Image

class FruitDetector:
    def __init__(self, model_path='yolov8n.pt'):
        self.model = YOLO(model_path)
        self.fruit_names = {
            0: "apple",
            47:"apple" 
        }

    def detect_fruits(self, image_path):
        img = Image.open(image_path)
        results = self.model(img)
        boxes = []
        for result in results:
            for box in result.boxes:
                x1, y1, x2, y2 = box.xyxy[0].tolist()
                conf = box.conf.item()
                label = int(box.cls.item())
                fruit_name = self.fruit_names.get(label, "Unknown")
                boxes.append([x1, y1, x2, y2, conf, label, fruit_name])
        return boxes

    def draw_boxes(self, image_path, boxes):
        img = cv2.imread(image_path)
        for box in boxes:
            x1, y1, x2, y2, conf, label, fruit_name = box
            cv2.rectangle(img, (int(x1), int(y1)), (int(x2), int(y2)), (255, 0, 0), 2)
            cv2.putText(img, f'{fruit_name} {conf:.2f}', (int(x1), int(y1) - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255), 2)
        cv2.imwrite('detected_fruit.jpg', img)