from .permissions import IsAdmin, IsSuperAdmin

class SomeAdminView(APIView):
    permission_classes = [IsAdmin]
    # ...
