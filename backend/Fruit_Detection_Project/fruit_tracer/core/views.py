import os
from django.conf import settings
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from PIL import Image
from .ml_model.Fruit import FruitDetector

class ImageUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        if 'image' not in request.FILES:
            return Response({"error": "No image provided"}, status=400)

        image_file = request.FILES['image']

        try:
            Image.open(image_file).verify()
            image_file.seek(0)
        except Exception as e:
            return Response({"error": "Invalid image file"}, status=400)

        image_path = os.path.join(settings.MEDIA_ROOT, image_file.name)

        try:
            with open(image_path, 'wb+') as destination:
                for chunk in image_file.chunks():
                    destination.write(chunk)

            print(f"Image saved at: {image_path}")

            detector = FruitDetector(model_path='yolov8n.pt', classifier_model='fruit_model.h5')

            print("FruitDetector initialized successfully")

            detection_result = detector.detect_fruits(image_path)

            print(f"Detection result: {detection_result}")

            return Response({
                "message": "Image successfully uploaded and saved.",
                "image_url": request.build_absolute_uri(settings.MEDIA_URL + image_file.name),
                "detection_result": detection_result
            })

        except Exception as e:
            import traceback
            traceback.print_exc()

            return Response({"error": f"Failed to process image: {str(e)}"}, status=500)