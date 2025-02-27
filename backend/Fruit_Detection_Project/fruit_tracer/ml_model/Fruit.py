import cv2
from object_detection import detect_fruits
from classification import classify_fruit
from utils import crop_fruit_from_image

# Image path
image_path = r"D:\hackathon\CodeXtremeHackathon\backend\Fruit_Detection_Project\fruit_tracer\media\fruit_images\test.jpg"

def detect_and_classify(image_path):

    img = cv2.imread(image_path)
    results = detect_fruits(image_path)

    for box in results:
        x1, y1, x2, y2 = map(int, box)
        cropped_fruit = crop_fruit_from_image(img, (x1, y1, x2, y2)) 

        if cropped_fruit is None:
            continue

        fruit_type = classify_fruit(cropped_fruit)

        cv2.rectangle(img, (x1, y1), (x2, y2), (0, 255, 0), 2)
        cv2.putText(img, fruit_type, (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 255, 0), 2)

    cv2.imshow("Fruit Detection and Classification", img)
    cv2.waitKey(0)
    cv2.destroyAllWindows()

if __name__ == "__main__":
    detect_and_classify(image_path)
