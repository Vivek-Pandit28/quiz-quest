from django.db import models

# Create your models here.

from django.db import models
from quiz.models import Category, Question


class Attempt(models.Model):
    DIFFICULTY_CHOICES = (
        ("easy", "Easy"),
        ("medium", "Medium"),
        ("hard", "Hard"),
    )

    name = models.CharField(max_length=100)

    category = models.ForeignKey(
        Category,
        on_delete=models.SET_NULL,
        null=True,
        related_name="attempts"
    )

    difficulty = models.CharField(max_length=10, choices=DIFFICULTY_CHOICES)

    total_questions = models.PositiveIntegerField(default=10)
    correct_answers = models.PositiveIntegerField(default=0)
    wrong_answers = models.PositiveIntegerField(default=0)
    score = models.PositiveIntegerField(default=0)
    percentage = models.FloatField(default=0)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.name} - {self.category} - {self.score}/{self.total_questions}"


class UserAnswer(models.Model):
    OPTION_CHOICES = (
        ("A", "A"),
        ("B", "B"),
        ("C", "C"),
        ("D", "D"),
    )

    attempt = models.ForeignKey(
        Attempt,
        on_delete=models.CASCADE,
        related_name="answers"
    )

    question = models.ForeignKey(
        Question,
        on_delete=models.CASCADE
    )

    selected_option = models.CharField(max_length=1, choices=OPTION_CHOICES)
    correct_option = models.CharField(max_length=1, choices=OPTION_CHOICES)
    is_correct = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.question.id} - {self.selected_option}"
