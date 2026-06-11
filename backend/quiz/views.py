from django.shortcuts import render
import random

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Category, Question
from .serializers import CategorySerializer, QuestionSerializer


class CategoryListView(APIView):
    def get(self, request):
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)



class RandomQuestionListView(APIView):
    def get(self, request):
        category_id = request.query_params.get("category")
        difficulty = request.query_params.get("difficulty")

        if not category_id or not difficulty:
            return Response(
                {"error": "category and difficulty are required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        questions = list(
            Question.objects.filter(
                category_id=category_id,
                difficulty=difficulty,
                is_active=True,
            )
        )

        if len(questions) < 10:
            return Response(
                {"error": "Not enough questions available."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        selected_questions = random.sample(questions, 10)

        serializer = QuestionSerializer(selected_questions, many=True)
        return Response(serializer.data)