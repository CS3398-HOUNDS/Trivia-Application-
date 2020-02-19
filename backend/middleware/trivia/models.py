from django.db import models


GENRE_CHOICES = (
    ('1', 'Sports'),
    ('2', 'Music'),
    ('3', 'Movies'),
    ('4', 'Pop Culture')
)

TYPE_CHOICES = (
    ('1', 'Multiple Choice'),
    ('2', 'True/False')
)

class User(models.Model):
    id = models.AutoField(primary_key=True)
    username = models.CharField(blank=True, max_length=50)
    email = models.EmailField(default='') 

class Trivia(models.Model):
    id = models.AutoField(primary_key=True)
    host = models.ForeignKey(User, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    title = models.CharField(default="Title of Game", max_length=200)
    genre = models.CharField(default="Pick one", max_length=50, choices=GENRE_CHOICES)
    type = models.CharField(default="Pick one", max_length=50, choices=TYPE_CHOICES)

class Question(models.Model):
    content = models.CharField(blank=True, max_length=200, default='empty')
    answer = models.CharField(default="Emtpy", max_length=200)
    genre = models.CharField(default="Pick one", max_length=50, choices=GENRE_CHOICES)
    type = models.CharField(default="Pick one", max_length=50, choices=TYPE_CHOICES)


#    Add if needed
#    difficulty = models.CharField(max_length=20)
