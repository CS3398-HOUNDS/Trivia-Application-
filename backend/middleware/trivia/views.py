from django.shortcuts import render
from rest_framework.exceptions import APIException
from django.contrib.auth.models import User, Group
from rest_framework import viewsets, permissions
from . import models
from . import serializers
# from trivia.permissions import IsOwnerOrReadOnly
# from trivia.permissions import IsStaffOrTargetUser


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-id')
    serializer_class = serializers.User

class TriviaViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.

    Additionally we also provide an extra `highlight` action.
    """
    queryset = models.Trivia.objects.all()
    serializer_class = serializers.TriviaSerializer


class QuestionViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = models.Question.objects.all()
    serializer_class = serializers.QuestionSerializer
