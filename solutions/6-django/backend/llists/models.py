from django.db import models
from users.models import User
from links.models import Link


class LinkList(models.Model):
    owner = models.ForeignKey(
        User,
        related_name="lists",
        on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=250)
    public = models.BooleanField(default=False)
    links = models.ManyToManyField(
        Link,
        related_name="linklists")

    def __str__(self):
        return "%s - %s" % (self.owner, self.name)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
