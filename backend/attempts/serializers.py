from rest_framework import serializers
from quiz.models import Question, Category
from .models import Attempt, UserAnswer


class SubmitAnswerSerializer(serializers.Serializer):
    question_id = serializers.IntegerField()
    selected_option = serializers.ChoiceField(
        choices=["A", "B", "C", "D"]
    )


class SubmitAttemptSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=100)
    category_id = serializers.IntegerField()
    difficulty = serializers.ChoiceField(
        choices=["easy", "medium", "hard"]
    )
    answers = SubmitAnswerSerializer(many=True)

    def validate_name(self, value):
        value = value.strip()
        if len(value) < 2:
            raise serializers.ValidationError(
                "Name must be at least 2 characters long."
            )
        return value

    def validate_category_id(self, value):
        if not Category.objects.filter(id=value).exists():
            raise serializers.ValidationError("Invalid category.")
        return value

    def validate_answers(self, value):
        if len(value) != 10:
            raise serializers.ValidationError(
                "Exactly 10 answers are required."
            )
        return value

    def create(self, validated_data):
        name = validated_data["name"]
        category_id = validated_data["category_id"]
        difficulty = validated_data["difficulty"]
        answers = validated_data["answers"]

        category = Category.objects.get(id=category_id)

        correct_count = 0
        user_answers = []

        question_ids = [item["question_id"] for item in answers]

        questions = Question.objects.filter(
            id__in=question_ids,
            category=category,
            difficulty=difficulty,
            is_active=True,
        )

        question_map = {question.id: question for question in questions}

        if len(question_map) != len(question_ids):
            raise serializers.ValidationError(
                "Some questions are invalid for selected category or difficulty."
            )

        attempt = Attempt.objects.create(
            name=name,
            category=category,
            difficulty=difficulty,
            total_questions=10,
        )

        for item in answers:
            question = question_map[item["question_id"]]
            selected_option = item["selected_option"]

            is_correct = selected_option == question.correct_option

            if is_correct:
                correct_count += 1

            user_answers.append(
                UserAnswer(
                    attempt=attempt,
                    question=question,
                    selected_option=selected_option,
                    correct_option=question.correct_option,
                    is_correct=is_correct,
                )
            )

        UserAnswer.objects.bulk_create(user_answers)

        wrong_count = 10 - correct_count
        percentage = (correct_count / 10) * 100

        attempt.correct_answers = correct_count
        attempt.wrong_answers = wrong_count
        attempt.score = correct_count
        attempt.percentage = percentage
        attempt.save()

        return attempt


class AttemptResultSerializer(serializers.ModelSerializer):
    category = serializers.StringRelatedField()

    class Meta:
        model = Attempt
        fields = [
            "id",
            "name",
            "category",
            "difficulty",
            "total_questions",
            "correct_answers",
            "wrong_answers",
            "score",
            "percentage",
            "created_at",
        ]