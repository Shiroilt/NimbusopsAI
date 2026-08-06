# pyrefly: ignore [missing-import]
from django.db import models
# pyrefly: ignore [missing-import]
from django.conf import settings
from common.models import BaseModel
from monitoring.models import Alert

class Notification(BaseModel):
    CHANNEL_CHOICES = (
        ('EMAIL', 'Email'),
        ('SMS', 'SMS'),
        ('WEBHOOK', 'Webhook'),
        ('IN_APP', 'In-App'),
    )

    alert = models.ForeignKey(Alert, on_delete=models.SET_NULL, null=True, blank=True, related_name='notifications')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='notifications')
    title = models.CharField(max_length=255, default='New Notification', help_text="Short title for dashboard or push notification display")
    message = models.TextField()
    channel = models.CharField(max_length=20, choices=CHANNEL_CHOICES, db_index=True)
    is_read = models.BooleanField(default=False, db_index=True)
    read_at = models.DateTimeField(null=True, blank=True)
    sent_at = models.DateTimeField(auto_now_add=True, db_index=True)

    def __str__(self):
        return f"{self.title} for {self.user.email} via {self.channel}"
