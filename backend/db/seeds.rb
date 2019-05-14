# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Author.create!([
  { name: 'Author 001', email: 'Author@001'  },
  { name: 'Author 002', email: 'Author@002'  },
  { name: 'Author 003', email: 'Author@003'  },
  { name: 'Author 004', email: 'Author@004'  }
])


Publication.create!([
  { title: 'title 001', body: 'body@001', author_id: 1  },
  { title: 'title 002', body: 'body@002', author_id: 1   },
  { title: 'title 003', body: 'body@003', author_id: 1   },
  { title: 'title 004', body: 'body@004', author_id: 2   }
])
