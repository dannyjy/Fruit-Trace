from django.db import models

# Create your models here.
class Fruit (models.Model):
    title = models.CharField(max_length=128)
    imag = models.ImageField(upload_to="fruit_images/")
    body = models.TextField()
    edible = models.BooleanField(default=True)

class UploadedImage(models.Model):
    image = models.ImageField(upload_to='uploads/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.image.name