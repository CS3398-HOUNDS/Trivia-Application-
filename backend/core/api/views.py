from django.shortcuts import render
from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework_extensions.mixins import NestedViewSetMixin
from . import models
from . import serializers
from . import permissions
# from trivia.permissions import IsOwnerOrReadOnly
# from trivia.permissions import IsStaffOrTargetUser

"""
This viewset automatically provides `list`, `create`, `retrieve`,
`update` and `destroy` actions for the User model.
"""
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = serializers.User

"""
This viewset automatically provides `list`, `create`, `retrieve`,
`update` and `destroy` actions for the Profile model.
"""
class ProfileViewSet(viewsets.ModelViewSet):
    queryset = models.Profile.objects.all()
    serializer_class = serializers.ProfileSerializer

"""
This viewset automatically provides `list`, `create`, `retrieve`,
`update` and `destroy` actions for the Trivia Game model.
"""
class TriviaViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = models.Trivia.objects.all()
    serializer_class = serializers.TriviaSerializer

"""
This viewset automatically provides `list`, `create`, `retrieve`,
`update` and `destroy` actions for the Question model.
"""
class QuestionViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = models.Question.objects.all()
    serializer_class = serializers.QuestionSerializer
