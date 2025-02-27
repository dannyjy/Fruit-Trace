from ultralytics import YOLO
import cv2

model= YOLO("ml_model/Yolo_weights.pt")

def detect_fruits(image_path):
    image=cv2.imread(image_path)
    results=model.predict(img)
    
    detections=[]
    for r in results:
        for box in r.boxes.xyxy:
            x1, y1, x2, y2 = map(int, box.tolist())
            
            detections.append({"x1": x1, "y1":y1, "x2":x2, "y2":y2})
            
    return detections        