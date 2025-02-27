import cv2
import argparse
from ultralytics import YOLO
from classification import classify_fruit
from utils import crop_fruit_from_image

Yolo_model=YOLO("C:\work\CodeXtremeHackathon\backend\FRUIT_DETECTION_PROJECT\ml_model\yolov8n.pt")


def detect_and_classify(image_path):
    
    img=cv2.imread(image_path)
    
    results=Yolo_model.predict(image_path)
    
    for r in results:
        for box in r.boxes.xyxy:
            
            cropped_fruit=crop_fruit_from_image(img, (x1, y1, x2, y2))
            
            fruit_type=classify_fruit(cropped_fruit)
            
            cv2.rectangle(img, (x1, y1), (x2, y2), (0,255,0), 2)
            cv2.putText(img, fruit_type, (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.6,(0,255,0), 2)
            
            cv2.imshow("Fruit Detection and Classification", img)
            cv2.waitkey(0)
            cv2.destroyAllWindows()
            
if __name__=="__main__":
    parser=argparse.ArgumentParser()         
    parser.add_argument("--image", required= True, help="Path to input image")
    args=parser.parse_args()
    
    detect_and_classify_image(args.image)
            
            