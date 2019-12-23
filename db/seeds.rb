# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
#

services = [
  "Thanksgiving Service", "1st Clearwater Service", "2nd Clearwater Service",
  "Anointing Service", "Prayer Clinic", "Holy Communion", "Congregational Vigil",
  "Digging Deep", "Faith Clinic", "Special Service"
]

services.map! do |service|
  { name: service }
end

Service.create!(services)

puts 'Successfully created service types!'
