# pyrefly: ignore [missing-import]
from django.db import models
# pyrefly: ignore [missing-import]
from django.conf import settings
from common.models import BaseModel
from cloud.models import Cluster

class InfrastructureMetric(BaseModel):
    cluster = models.ForeignKey(Cluster, on_delete=models.CASCADE, related_name='metrics')
    timestamp = models.DateTimeField(db_index=True)
    cpu_usage = models.DecimalField(max_digits=5, decimal_places=2, help_text="Percentage CPU usage")
    memory_usage = models.DecimalField(max_digits=5, decimal_places=2, help_text="Percentage Memory usage")

    class Meta:
        indexes = [
            models.Index(fields=['cluster', 'timestamp']),
        ]

    def __str__(self):
        return f"{self.cluster.name} - {self.timestamp}"

class Alert(BaseModel):
    SEVERITY_CHOICES = (
        ('INFO', 'Info'),
        ('WARNING', 'Warning'),
        ('CRITICAL', 'Critical'),
    )
    STATUS_CHOICES = (
        ('OPEN', 'Open'),
        ('ACKNOWLEDGED', 'Acknowledged'),
        ('RESOLVED', 'Resolved'),
    )

    cluster = models.ForeignKey(Cluster, on_delete=models.CASCADE, related_name='alerts')
    severity = models.CharField(max_length=20, choices=SEVERITY_CHOICES, db_index=True)
    message = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='OPEN', db_index=True)
    triggered_at = models.DateTimeField(auto_now_add=True, db_index=True)
    resolved_at = models.DateTimeField(blank=True, null=True)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name='%(class)s_created')
    updated_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name='%(class)s_updated')

    def __str__(self):
        return f"[{self.severity}] {self.cluster.name} - {self.status}"
