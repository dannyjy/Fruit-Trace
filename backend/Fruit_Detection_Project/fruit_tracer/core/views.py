import cv2
from django.conf import settings
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from .models import UploadedImage
from .ml_model.fruit import detect_and_classify, classify_fruit
from .ml_model.object_detection import detect_fruits 
from .ml_model.utils import crop_fruit_from_image


class ImageUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        if 'image' not in request.FILES:
            return Response({"error": "No image provided"}, status=400)

        image_file = request.FILES['image']
        uploaded_image = UploadedImage.objects.create(image=image_file)

        image_path = uploaded_image.image.path
        img = cv2.imread(image_path)
        if img is None:
            return Response({"error": "Invalid image file"}, status=400)

        results = detect_fruits(image_path)

        classification_results = []
        for box in results:
            x1, y1, x2, y2 = map(int, box)
            cropped_fruit = crop_fruit_from_image(img, (x1, y1, x2, y2))

            if cropped_fruit is None:
                continue

            fruit_type = classify_fruit(cropped_fruit)
            classification_results.append(fruit_type)

        final_result = "Edible" if "Not Edible" not in classification_results else "Not Edible"

        return Response({
            "message": final_result, 
            "image_url": uploaded_image.image.url 
        })