from django.shortcuts import render
from rest_framework.exceptions import APIException
from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from . import models
from . import serializers


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = serializers.UserSerializer

class TriviaViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.

    Additionally we also provide an extra `highlight` action.
    """
    queryset = models.Trivia.objects.all()
    serializer_class = serializers.TriviaSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class QuestionViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = models.Question.objects.all()
    serializer_class = serializers.QuestionSerializer

class ForbiddenAccess(APIException):
    status_code = 403
    default_detail = 'Action Forbidden'
