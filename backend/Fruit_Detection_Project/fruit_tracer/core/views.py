from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import joblib
import os
from django.conf import settings

model_path = os.path.join(settings.BASE_DIR, 'my_ml_app', 'ml_model', 'model.pkl')
model = joblib.load(model_path)

@csrf_exempt
def predict(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            prediction = model.predict([data['features']])
            return JsonResponse({'prediction': prediction.tolist()})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    return JsonResponse({'error': 'Invalid request method'}, status=405)