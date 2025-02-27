import cv2

def crop_fruit_from_image(img, box):
    x1, y1, x2, y2 = box
    cropped_image = img[y1:y2, x1:x2]

    if cropped_image.size == 0:
        return None 

    return cropped_image  
