from django.contrib import admin
from . models import Question, Trivia

# Register your models here.

admin.site.register(Question)
admin.site.register(Trivia)
