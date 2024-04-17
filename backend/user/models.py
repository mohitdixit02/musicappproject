from django.db import models

# Create your models here.

class UserInfo(models.Model):
    user_id=models.CharField(max_length=80, primary_key=True)
    first_name = models.CharField(max_length=15)
    last_name = models.CharField(max_length=15)
    dob = models.CharField(max_length=12)
    address = models.CharField(max_length=150)
    number = models.CharField(max_length=10,default=0)

    def __str__(self):
        return self.user_id