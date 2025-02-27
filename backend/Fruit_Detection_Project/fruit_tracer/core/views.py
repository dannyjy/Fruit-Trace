import os
import cv2
import numpy as np
from django.conf import settings
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from .ml_model.fruit import detect_and_classify


class ImageUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        if 'image' not in request.FILES:
            return Response({"error": "No image provided"}, status=400)

        image_file = request.FILES['image']
        image_path = os.path.join(settings.MEDIA_ROOT, "uploaded_image.jpg")

        with open(image_path, 'wb+') as destination:
            for chunk in image_file.chunks():
                destination.write(chunk)

        img = cv2.imread(image_path)
        if img is None:
            return Response({"error": "Invalid image file"}, status=400)

        result = classify_fruit(img)

        return Response({"message": result})
