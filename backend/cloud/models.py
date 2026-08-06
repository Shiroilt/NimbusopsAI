# pyrefly: ignore [missing-import]
from django.db import models
from common.models import BaseModel
from organizations.models import Organization
# pyrefly: ignore [missing-import]
from django.conf import settings

class CloudProvider(BaseModel):
    class ProviderChoices(models.TextChoices):
        AWS = 'AWS', 'Amazon Web Services'
        GCP = 'GCP', 'Google Cloud Platform'
        AZURE = 'AZURE', 'Microsoft Azure'

    name = models.CharField(max_length=100, choices=ProviderChoices.choices)
    slug = models.SlugField(max_length=100, unique=True, db_index=True)

    def __str__(self):
        return self.name

class CloudAccount(BaseModel):
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE, related_name='cloud_accounts')
    provider = models.ForeignKey(CloudProvider, on_delete=models.PROTECT, related_name='accounts')
    display_name = models.CharField(max_length=255, help_text="Human-friendly name, e.g. 'Production AWS'")
    account_identifier = models.CharField(max_length=255, help_text="AWS Account ID, GCP Project ID, etc.")
    identity_reference = models.CharField(max_length=512, blank=True, null=True, help_text="IAM Role ARN, Service Account, or Identity reference")
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name='%(class)s_created')
    updated_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name='%(class)s_updated')

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['organization', 'account_identifier'], name='unique_cloud_account_per_org')
        ]

    def __str__(self):
        return f"{self.display_name} ({self.provider.name})"

class Region(BaseModel):
    provider = models.ForeignKey(CloudProvider, on_delete=models.CASCADE, related_name='regions')
    name = models.CharField(max_length=100, help_text="e.g. us-east-1")

    class Meta:
        unique_together = ('provider', 'name')

    def __str__(self):
        return f"{self.provider.name} - {self.name}"

class Cluster(BaseModel):
    TYPE_CHOICES = (
        ('ECS', 'ECS'),
        ('EKS', 'EKS'),
        ('KUBERNETES', 'Kubernetes'),
        ('EC2', 'EC2'),
        ('LAMBDA', 'Lambda'),
        ('CONTAINER', 'Container'),
        ('VM', 'VM'),
        ('OTHER', 'Other'),
    )

    cloud_account = models.ForeignKey(CloudAccount, on_delete=models.CASCADE, related_name='clusters')
    region = models.ForeignKey(Region, on_delete=models.PROTECT, related_name='clusters')
    name = models.CharField(max_length=255)
    cluster_identifier = models.CharField(max_length=512, help_text="Cluster ARN or unique ID")
    cluster_type = models.CharField(max_length=20, choices=TYPE_CHOICES, default='OTHER')
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name='%(class)s_created')
    updated_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name='%(class)s_updated')

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['cloud_account', 'cluster_identifier'], name='unique_cluster_per_account')
        ]

    def __str__(self):
        return f"{self.name} ({self.cluster_type})"
