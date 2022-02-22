from django.db import models


class Link(models.Model):
    link = models.URLField(max_length=200)
    title = models.TextField(max_length=200)
    description = models.TextField(max_length=1000)
    image = models.URLField(max_length=200)

    def __str__(self):
        return "%s" % (self.link)
