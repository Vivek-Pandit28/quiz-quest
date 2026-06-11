from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Attempt
from .serializers import SubmitAttemptSerializer, AttemptResultSerializer


class SubmitAttemptView(APIView):
    def post(self, request):
        serializer = SubmitAttemptSerializer(data=request.data)

        if serializer.is_valid():
            attempt = serializer.save()
            result_serializer = AttemptResultSerializer(attempt)
            return Response(
                result_serializer.data,
                status=status.HTTP_201_CREATED,
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class RecentAttemptsView(APIView):
    def get(self, request):
        attempts = Attempt.objects.order_by("-created_at")[:20]

        serializer = AttemptResultSerializer(
            attempts,
            many=True
        )

        return Response(serializer.data)


class LeaderboardView(APIView):
    def get(self, request):
        attempts = Attempt.objects.order_by("-score", "created_at")[:10]
        serializer = AttemptResultSerializer(attempts, many=True)
        return Response(serializer.data)
