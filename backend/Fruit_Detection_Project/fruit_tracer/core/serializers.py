from rest_framework import serializers
from .models import Fruit, UploadedImage

class FruitsSerializer(serializers.Serializer):
    class Meta:
        model = Fruit
        fields = '__all__'

class UploadedImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = UploadedImage
        fields = ['id', 'image', 'uploaded_at']