from ultralytics import YOLO

# Load YOLO model once
Yolo_model = YOLO(r"yolov8n.pt")

def detect_fruits(image_path):
    results = Yolo_model.predict(image_path)

    detected_boxes = []
    for r in results:
        for box in r.boxes.xyxy:
            detected_boxes.append(box)

    return detected_boxes  # Returns list of (x1, y1, x2, y2)
