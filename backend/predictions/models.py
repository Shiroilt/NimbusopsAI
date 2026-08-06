# pyrefly: ignore [missing-import]
from django.db import models
# pyrefly: ignore [missing-import]
from django.conf import settings
from common.models import BaseModel
from cloud.models import Cluster

class Prediction(BaseModel):
    cluster = models.ForeignKey(Cluster, on_delete=models.CASCADE, related_name='predictions')
    predicted_cpu = models.DecimalField(max_digits=5, decimal_places=2, help_text="Predicted CPU usage percentage")
    predicted_memory = models.DecimalField(max_digits=5, decimal_places=2, help_text="Predicted Memory usage percentage")
    confidence_score = models.DecimalField(max_digits=5, decimal_places=2, help_text="AI confidence score (0-100)")
    target_time = models.DateTimeField(help_text="The future time this prediction applies to", db_index=True)
    model_version = models.CharField(max_length=100, default='LSTM', help_text="AI model version used for this prediction (e.g., LSTM, Transformer)")
    execution_time_ms = models.IntegerField(help_text="Time taken to generate the prediction in milliseconds", null=True, blank=True)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name='%(class)s_created')
    updated_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name='%(class)s_updated')

    class Meta:
        indexes = [
            models.Index(fields=['cluster', 'target_time']),
        ]

    def __str__(self):
        return f"Prediction for {self.cluster.name} at {self.target_time} (Model: {self.model_version})"

class ScalingRecommendation(BaseModel):
    ACTION_CHOICES = (
        ('NO_ACTION', 'No Action'),
        ('SCALE_OUT', 'Scale Out'),
        ('SCALE_IN', 'Scale In'),
        ('RESTART', 'Restart'),
        ('INVESTIGATE', 'Investigate'),
        ('OPTIMIZE', 'Optimize'),
    )

    prediction = models.ForeignKey(Prediction, on_delete=models.CASCADE, related_name='recommendations')
    recommended_action = models.CharField(max_length=20, choices=ACTION_CHOICES)
    resource_type = models.CharField(max_length=100, help_text="e.g. EC2 Instance, ECS Task")
    is_applied = models.BooleanField(default=False, db_index=True)

    def __str__(self):
        return f"{self.recommended_action} on {self.resource_type} (Applied: {self.is_applied})"
