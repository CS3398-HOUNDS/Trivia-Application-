from django.contrib.auth.models import User, Group
from rest_framework import serializers
from . import models
from . import serializers as serializer


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'id', 'username', 'email']

class QuestionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.Question
        fields = ['url', 'content', 'answer', 'genre', 'type']

class TriviaSerializer(serializers.HyperlinkedModelSerializer):
    questions = serializer.QuestionSerializer(many=True, read_only=True)
    class Meta:
        model = models.Trivia
        fields = ['url', 'id', 'host', 'created', 'title', 'genre', 'type', 'questions']
