from django.urls import path
from .views import SubmitAttemptView, RecentAttemptsView, LeaderboardView

urlpatterns = [
    path("attempts/submit/", SubmitAttemptView.as_view(), name="submit-attempt"),
        path("recent-results/", RecentAttemptsView.as_view(), name="recent-results"),
    path("leaderboard/", LeaderboardView.as_view(), name="leaderboard"),
]