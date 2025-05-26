import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import ChatRequestSerializer
from logs.utils import log_action  # Pour historiser l’échange

# L'URL de ton serveur Rasa
RASA_SERVER_URL = "http://localhost:5005/model/parse"

class RasaChatbotView(APIView):
    def post(self, request):
        serializer = ChatRequestSerializer(data=request.data)
        if serializer.is_valid():
            message = serializer.validated_data['message']
            sender = serializer.validated_data['sender']
            language = serializer.validated_data.get('language', 'fr')

            # Appel à l’API Rasa (format Rasa HTTP API)
            payload = {
                "text": message,
                "message_id": sender
            }
            try:
                response = requests.post(RASA_SERVER_URL, json=payload, timeout=5)
                response.raise_for_status()
            except Exception as e:
                return Response({"error": f"Erreur de communication avec Rasa: {str(e)}"}, status=500)

            rasa_data = response.json()

            # Log de l'échange question/réponse
            log_action(
                action_type='question',
                user=sender,
                details=f"Message: {message} | Réponse: {rasa_data.get('text', str(rasa_data))}"
            )
            return Response({
                "rasa_response": rasa_data
            })
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
