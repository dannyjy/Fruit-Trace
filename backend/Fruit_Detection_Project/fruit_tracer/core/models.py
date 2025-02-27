from django.db import models

# Create your models here.
class Fruit (models.Model):
    title = models.CharField(max_length=128)
    imag = models.ImageField(upload_to="fruit_images/")
    body = models.TextField()
    edible = models.BooleanField(default=True)