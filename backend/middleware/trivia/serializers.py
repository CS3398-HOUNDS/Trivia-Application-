from django.contrib.auth.models import User
from rest_framework import serializers
from . import models
from . import serializers as serializer


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'username', 'password', 'id']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User(
            email=validated_data['email'],
            username=validated_data['username']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Question
        fields = '__all__'

class TriviaSerializer(serializers.HyperlinkedModelSerializer):
    questions = serializer.QuestionSerializer(many=True, read_only=True)
    class Meta:
        model = models.Trivia
        fields = ['url', 'id', 'created', 'title', 'genre', 'type', 'questions']
