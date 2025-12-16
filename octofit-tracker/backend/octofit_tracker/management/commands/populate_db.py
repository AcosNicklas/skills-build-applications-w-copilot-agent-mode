from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        # Delete existing data in child-to-parent order to avoid unhashable errors
        # Skipping deletion due to Djongo ObjectIdField issues
        # for obj in Activity.objects.all():
        #     obj.delete()
        # for obj in Leaderboard.objects.all():
        #     obj.delete()
        # for obj in Workout.objects.all():
        #     obj.delete()
        # for obj in User.objects.all():
        #     obj.delete()
        # for obj in Team.objects.all():
        #     obj.delete()

        # Create Teams
        marvel = Team.objects.create(name='Marvel')
        dc = Team.objects.create(name='DC')

        # Create Users (super heroes)
        users = [
            User(name='Tony Stark', email='tony@marvel.com', team=marvel),
            User(name='Steve Rogers', email='steve@marvel.com', team=marvel),
            User(name='Bruce Wayne', email='bruce@dc.com', team=dc),
            User(name='Clark Kent', email='clark@dc.com', team=dc),
        ]
        for user in users:
            user.save()

        # Create Activities
        activities = [
            Activity(user=users[0], type='Run', duration=30, calories=300),
            Activity(user=users[1], type='Swim', duration=45, calories=400),
            Activity(user=users[2], type='Bike', duration=60, calories=500),
            Activity(user=users[3], type='Yoga', duration=50, calories=200),
        ]
        for activity in activities:
            activity.save()

        # Create Workouts
        workouts = [
            Workout(name='Morning Cardio', description='Cardio for all heroes'),
            Workout(name='Strength Training', description='Strength for all heroes'),
        ]
        for workout in workouts:
            workout.save()

        # Create Leaderboard
        Leaderboard.objects.create(team=marvel, points=700)
        Leaderboard.objects.create(team=dc, points=700)

        self.stdout.write(self.style.SUCCESS('octofit_db populated with test data!'))
