# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
#

services = [
  { name: '1st Clearwater Service', category: 'Sunday Service', weekday: 'Sunday' },
  { name: '2nd Clearwater Service', category: 'Sunday Service', weekday: 'Sunday' },
  { name: 'Sunday Service', category: 'Sunday Service', weekday: 'Sunday' },
  { name: 'Digging Deep', category: 'Midweek Service', weekday: 'Tuesday' },
  { name: 'Faith Clinic', category: 'Midweek Service', weekday: 'Thursday' },
  { name: 'Thanksgiving Service', category: 'Monthly Program', weekday: 'Sunday' },
  { name: 'Anointing Service', category: 'Monthly Program', weekday: 'Sunday' },
  { name: 'Prayer Clinic', category: 'Monthly Program', weekday: 'Tuesday' },
  { name: 'Congregational Vigil', category: 'Monthly Program', weekday: 'Friday' },
  { name: "Holy Communion", category: 'Monthly Program', weekday: 'Thursday' },
  { name: 'Holy Ghost service', category: 'Monthly Program', weekday: 'Friday' },
  { name: 'Special Service', category: 'Special Service', weekday: 'any' }
]

Service.create! services
puts 'Successfully created service types!'


roles = [
  { name: 'admin' },
  { name: 'usher' },
  { name: 'it' },
  { name: 'counsellor' },
  { name: 'teenage_church' },
  { name: 'junior_church' }
]

Role.create! roles
puts 'Successfully created roles'
