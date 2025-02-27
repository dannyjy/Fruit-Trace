from django.db import models

# Create your models here.
class Fruit (models.Model):
    title = models.TextField()
    imag = models.ImageField(upload_to="media/fruit_images")
    body = models.TextField()
    edible = models.BooleanField(default=True)