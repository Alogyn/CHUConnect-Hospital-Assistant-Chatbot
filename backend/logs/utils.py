from .models import Log

def log_action(action_type, user=None, details=""):
    username = user.username if hasattr(user, "username") else str(user) if user else "anonymous"
    Log.objects.create(
        action=action_type,
        user=username,
        details=details
    )
