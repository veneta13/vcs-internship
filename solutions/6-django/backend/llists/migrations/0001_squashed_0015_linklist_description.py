# Generated by Django 4.0 on 2022-03-25 12:02

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    replaces = [('llists', '0001_initial'), ('llists', '0002_rename_name_contact_link_list_remove_contact_email_and_more'), ('llists', '0003_rename_contact_linklist'), ('llists', '0004_link_rename_link_list_linklist_name_enlister_and_more'), ('llists', '0005_linklist_date'), ('llists', '0006_alter_linklist_user'), ('llists', '0007_alter_linklist_user'), ('llists', '0008_rename_user_linklist_owner'), ('llists', '0009_alter_linklist_links_delete_enlister'), ('llists', '0010_alter_linklist_links_alter_linklist_owner'), ('llists', '0011_delete_enlister'), ('llists', '0012_delete_link_alter_linklist_links'), ('llists', '0013_linklist_public'), ('llists', '0014_remove_linklist_date'), ('llists', '0015_linklist_description')]

    initial = True

    dependencies = [
        ('links', '0001_initial'),
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='LinkList',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='lists', to='auth.user')),
                ('links', models.ManyToManyField(related_name='linklists', to='links.Link')),
                ('public', models.BooleanField(default=False)),
                ('description', models.CharField(default='This is a list description.', max_length=250)),
            ],
        ),
    ]
