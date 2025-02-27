from rest_framework import serializers
from .models import Fruit
class FruitsSerializer(serializers.Serializer):
    class Meta:
        model = Fruit
        fields = '__all__'
