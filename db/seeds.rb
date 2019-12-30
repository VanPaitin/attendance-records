# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
#

services = [
  { name: 'Thanksgiving Service', category: 'Sunday Service' },
  { name: '1st Clearwater Service', category: 'Sunday Service' },
  { name: '2nd Clearwater Service', category: 'Sunday Service' },
  { name: 'Sunday Service', category: 'Sunday Service' },
  { name: 'Digging Deep', category: 'Midweek Service' },
  { name: 'Faith Clinic', category: 'Midweek Service' },
  { name: 'Anointing Service', category: 'Monthly Program' },
  { name: 'Prayer Clinic', category: 'Monthly Program' },
  { name: 'Congregational Vigil', category: 'Monthly Program' },
  { name: "Holy Communion", category: 'Monthly Program' },
  { name: 'Holy Ghost service', category: 'Monthly Program' },
  { name: 'Special Service', category: 'Special Service' }
]

Service.create!(services)

puts 'Successfully created service types!'
