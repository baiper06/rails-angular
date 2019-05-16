# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


10.times do
  author = Author.create(name: Faker::Name.name, email: Faker::Internet.email, birth_date: Faker::Date.birthday(18, 65) )
  20.times do
	  author.publications.create(title: Faker::Lorem.sentence(3, true, 4), body: Faker::Lorem.paragraph(3, true, 5), date: Faker::Date.backward(30), time: Faker::Time.backward(14, :evening) )
	end
end
