import cv2

def crop_fruit_from_image(img_path, box):

    img=cv2.imread(img_path)
    if img is None:
        raise FileNotFoundError(f"Image not found: {img_path}")

    x1,y1,x2,y2 = box["x1"], box["y1"], box["x2"], box["y2"]

    height, width = img.shape[:2]
    x1 = max(0, min(x1, width))
    y1 = max(0, min(y1, height))
    x2 = max(0, min(x2, width))
    y2 = max(0, min(y2, height))
    cropped_image=img[y1:y2, x1:x2]
    if not os.path.exists("temp"):
        os.makedirs("temp")

    cropped_img_path=f"temp/cropped_{x1}_{y1}.jpg"
    cv2.imwrite(cropped_img_path, cropped_image)

    return cropped_img_path