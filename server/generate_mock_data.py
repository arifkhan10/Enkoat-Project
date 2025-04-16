from faker import Faker
import random, csv
faker = Faker()
roof_types = ["TPO", "Metal", "Foam", "Asphalt"]

with open('mock_data.csv', 'w') as file:
    writer = csv.writer(file)
    writer.writerow(["Contractor", "Company", "RoofSize", "RoofType", "City", "State", "Date"])
    for _ in range(1000):
        writer.writerow([
            faker.name(),
            faker.company(),
            random.randint(1000, 50000),
            random.choice(roof_types),
            faker.city(),
            faker.state_abbr(),
            faker.date_between(start_date="-2y", end_date="today")
        ])