from django.contrib import admin
from .models import Attempt, UserAnswer


class UserAnswerInline(admin.TabularInline):
    model = UserAnswer
    extra = 0
    readonly_fields = (
        "question",
        "selected_option",
        "correct_option",
        "is_correct",
    )
    can_delete = False


@admin.register(Attempt)
class AttemptAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "name",
        "category",
        "difficulty",
        "score",
        "total_questions",
        "percentage",
        "created_at",
    )
    list_filter = ("category", "difficulty", "created_at")
    search_fields = ("name",)
    inlines = [UserAnswerInline]


@admin.register(UserAnswer)
class UserAnswerAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "attempt",
        "question",
        "selected_option",
        "correct_option",
        "is_correct",
    )
    list_filter = ("is_correct",)