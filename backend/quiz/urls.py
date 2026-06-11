from django.urls import path
from .views import CategoryListView, RandomQuestionListView

urlpatterns = [
    path("categories/", CategoryListView.as_view(), name="categories"),
    path("questions/", RandomQuestionListView.as_view(), name="questions"),
]