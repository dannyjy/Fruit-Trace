import cv2

def crop_fruit_from_image(img_path, box):
    
    img=cv2.imread(img_path)
    x1,y1,x2,y2 = box["x1"], box["y1"], box["x2"], box["y2"]
    cropped_image=img[y1:y2, x1:x2]
    
    cropped_img_path=f"temp/cropped_{x1}_{y1}.jpg"
    cv2.imwrite(cropped_img_path, cropped_image)
    
    return cropped_img_path