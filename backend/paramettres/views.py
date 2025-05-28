from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Paramettres

@api_view(['GET'])
def get_hospital_hours(request):
    try:
        horaires = Paramettres.objects.get(name='horaires_hopital').value
        return Response({"horaires": horaires})
    except Paramettres.DoesNotExist:
        return Response({"horaires": "Horaires non renseignés."}, status=404)
