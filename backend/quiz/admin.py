from django.contrib import admin
from .models import Category, Question


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("id", "name")
    search_fields = ("name",)


@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "category",
        "difficulty",
        "question_text",
        "correct_option",
        "is_active",
        "created_at",
    )
    list_filter = ("category", "difficulty", "is_active")
    search_fields = ("question_text",)
